import { Base } from "../core/base.js";

/**
 * Gerenciador do mundo físico baseado em Ammo.js.
 * Responsável por carregar a biblioteca, criar o mundo,
 * definir gravidade, atualizar corpos rígidos e lidar
 * com ghosts (objetos de detecção de colisão sem física).
 */
export default class Physic extends Base {

  constructor() {
    super("Physic");

    /** @type {any} Instância carregada da Ammo.js */
    this.AmmoLib = null;

    /** @type {any} Mundo físico principal do Ammo.js */
    this.physicsWorld = null;

    /** @type {Array<{mesh: any, body: any}>} Lista de corpos dinâmicos */
    this.rigidBodies = [];

    /** @type {any} Transform temporário usado para leitura de posições */
    this.tmpTrans = null;
  }

  /**
   * Cria e inicializa o módulo de física.
   * @returns {Promise<Physic>}
   */
  static async create() {
    const instance = new Physic();
    console.log(instance);
    await instance.#init();
    if (!instance.AmmoLib) throw new Error("Ammo.js não carregado");
    return instance;
  }

  /**
   * Processo de inicialização interno:
   * - Carrega Ammo.js
   * - Cria o mundo físico
   * - Define a gravidade
   * @private
   */
  async #init() {
    await this.__addAmmoLib();
    this.__addWorld();
    this.__addGravity();
  }

  /**
   * Carrega a biblioteca Ammo.js dinamicamente.
   * Retorna imediatamente se já carregada.
   * @returns {Promise<any>}
   * @private
   */
  async __addAmmoLib() {
    if (this.AmmoLib) return this.AmmoLib;

    this.log("__addAmmoLib");

    this.AmmoLib = await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "../js/modules/r153/examples/jsm/libs/ammo.wasm.js";

      script.onload = () => {
        if (typeof Ammo === "undefined") {
          reject(new Error("Ammo não definido após carregar o script"));
          return;
        }
        Ammo().then(resolve).catch(reject);
      };

      script.onerror = () =>
        reject(new Error("Falha ao carregar ammo.wasm.js"));

      document.body.appendChild(script);
    });

    return this.AmmoLib;
  }

  /**
   * Inicializa o mundo físico (broadphase, dispatcher, solver, etc.)
   * @private
   */
  __addWorld() {
    this.log("__addWorld");

    const collisionConfig = new this.AmmoLib.btDefaultCollisionConfiguration();
    const dispatcher = new this.AmmoLib.btCollisionDispatcher(collisionConfig);
    const broadphase = new this.AmmoLib.btDbvtBroadphase();
    const solver = new this.AmmoLib.btSequentialImpulseConstraintSolver();

    this.physicsWorld = new this.AmmoLib.btDiscreteDynamicsWorld(
      dispatcher,
      broadphase,
      solver,
      collisionConfig
    );
  }

  /**
   * Define a gravidade do mundo físico.
   * @param {number} y Valor da gravidade no eixo Y.
   * @private
   */
  __addGravity(y = -9.81) {
    this.log("__addGravity");

    this.physicsWorld.setGravity(new this.AmmoLib.btVector3(0, y, 0));
    this.tmpTrans = new this.AmmoLib.btTransform();
  }

  /**
   * Cria um corpo rígido físico para um mesh.
   * @param {any} mesh Objeto Three.js com posição e rotação
   * @param {any} shape Forma de colisão (btShape)
   * @param {number} mass Massa (0 = imóvel, >0 = dinâmico)
   * @returns {any} Corpo físico Ammo.js
   */
  createRigidBody(mesh, shape, mass = 0) {
    if (!this.AmmoLib || !this.physicsWorld)
      throw new Error("Ammo.js ou mundo físico não inicializado");

    const transform = new this.AmmoLib.btTransform();
    transform.setIdentity();
    transform.setOrigin(
      new this.AmmoLib.btVector3(
        mesh.position.x,
        mesh.position.y,
        mesh.position.z
      )
    );

    const motionState = new this.AmmoLib.btDefaultMotionState(transform);

    const localInertia = new this.AmmoLib.btVector3(0, 0, 0);
    if (mass > 0) shape.calculateLocalInertia(mass, localInertia);

    const rbInfo = new this.AmmoLib.btRigidBodyConstructionInfo(
      mass,
      motionState,
      shape,
      localInertia
    );

    const body = new this.AmmoLib.btRigidBody(rbInfo);
    this.physicsWorld.addRigidBody(body);

    if (mass > 0) this.rigidBodies.push({ mesh, body });

    return body;
  }

  /**
   * Cria uma forma de colisão box (metade das dimensões informadas).
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {any} btBoxShape
   */
  createShape(x = 5, y = 0.5, z = 5) {
    return new this.AmmoLib.btBoxShape(new this.AmmoLib.btVector3(x, y, z));
  }

  /**
   * Atualiza o mundo físico e sincroniza as posições dos meshes.
   * @param {number} delta Tempo entre frames
   */
  update(delta) {
    this.physicsWorld.stepSimulation(delta, 10);

    for (const { mesh, body } of this.rigidBodies) {
      const motionState = body.getMotionState();
      if (motionState) {
        motionState.getWorldTransform(this.tmpTrans);
        const origin = this.tmpTrans.getOrigin();
        const rot = this.tmpTrans.getRotation();

        mesh.position.set(origin.x(), origin.y(), origin.z());
        mesh.quaternion.set(rot.x(), rot.y(), rot.z(), rot.w());
      }
    }
  }

  /**
   * Cria um “ghost object" usado para detectar colisões,
   * mas sem interação física (sem empurrar ou sofrer força).
   * @param {any} mesh Mesh associado
   * @param {any} shape Forma do ghost
   * @returns {any} btPairCachingGhostObject
   */
  createGhost(mesh, shape) {
    const transform = new this.AmmoLib.btTransform();
    transform.setIdentity();
    transform.setOrigin(
      new this.AmmoLib.btVector3(
        mesh.position.x,
        mesh.position.y,
        mesh.position.z
      )
    );

    const ghost = new this.AmmoLib.btPairCachingGhostObject();
    ghost.setWorldTransform(transform);
    ghost.setCollisionShape(shape);
    ghost.setCollisionFlags(
      ghost.getCollisionFlags() | this.AmmoLib.CF_NO_CONTACT_RESPONSE
    );

    this.physicsWorld.addCollisionObject(ghost, 1, -1);

    return ghost;
  }

  /**
   * Verifica colisões gerais — ainda não implementado.
   */
  checkCollisions() {
    // TODO
  }

  /**
   * Retorna todos os objetos que estão sobrepostos ao ghost.
   * @param {any} ghost Ghost criado via createGhost()
   */
  checkGhostCollisions(ghost) {
    const num = ghost.getNumOverlappingObjects();
    for (let i = 0; i < num; i++) {
      const obj = ghost.getOverlappingObject(i);
      console.log("Colidiu com", obj);
    }
  }
}
