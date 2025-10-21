import { Base } from "../core/base.js";

export default class Physic extends Base {
  constructor() {
    super("Physic");
    this.AmmoLib = null;
    /**
     * 10 = máx. subpassos (maior precisão)
     */
    this.physicsWorld = null;
    this.rigidBodies = [];
    this.tmpTrans = null;
  }
  static async create() {
    const instance = new Physic();
    await instance.#init();
    if (!instance.AmmoLib) throw new Error("Ammo.js not loaded yet");
    return instance;
  }
  async #init() {
    await this.__addAmmoLib();
    this.__addWorld();
    this.__addGravity();
  }
  async __addAmmoLib() {
    if (this.AmmoLib) return this.AmmoLib; // só ignora se já carregou
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
  __addWorld() {
    this.log("__addWorld");
    // ==========================================================
    // 🔹 3. Cria o mundo físico do Ammo.js
    // ==========================================================
    const collisionConfig = new this.AmmoLib.btDefaultCollisionConfiguration(); // define como colisões são tratadas
    const dispatcher = new this.AmmoLib.btCollisionDispatcher(collisionConfig); // gerencia eventos de colisão
    const broadphase = new this.AmmoLib.btDbvtBroadphase(); // otimiza detecção de colisões
    const solver = new this.AmmoLib.btSequentialImpulseConstraintSolver(); // resolve as forças e colisões

    // O mundo físico: une tudo acima
    this.physicsWorld = new this.AmmoLib.btDiscreteDynamicsWorld(
      dispatcher,
      broadphase,
      solver,
      collisionConfig
    );
  }
  __addGravity(y = -9.81) {
    this.log("__addGravity");
    // Define a gravidade (em m/s² no eixo Y negativo)
    this.physicsWorld.setGravity(new this.AmmoLib.btVector3(0, y, 0));
    // Lista de corpos móveis (para atualizar posições)
    //this.rigidBodies = [];
    this.tmpTrans = new this.AmmoLib.btTransform(); // usado pra ler posições físicas
  }
  /**
   * massa 0 = imóvel
   * massa 1 = cai com gravidade
   */
  createRigidBody(mesh, shape, mass = 0) {
    if (!this.AmmoLib || !this.physicsWorld)
      throw new Error("Ammo.js ou mundo físico não inicializado");
    // Transformação inicial (posição e rotação)
    const transform = new this.AmmoLib.btTransform();
    transform.setIdentity();
    transform.setOrigin(
      new this.AmmoLib.btVector3(
        mesh.position.x,
        mesh.position.y,
        mesh.position.z
      )
    );

    // Motion state conecta o mundo físico com o gráfico (Three.js)
    const motionState = new this.AmmoLib.btDefaultMotionState(transform);

    // Inércia local (necessária para objetos com massa)
    const localInertia = new this.AmmoLib.btVector3(0, 0, 0);
    if (mass > 0) shape.calculateLocalInertia(mass, localInertia);

    // Junta tudo: massa, forma, inércia, movimento
    const rbInfo = new this.AmmoLib.btRigidBodyConstructionInfo(
      mass,
      motionState,
      shape,
      localInertia
    );

    // Cria o corpo físico
    const body = new this.AmmoLib.btRigidBody(rbInfo);

    // Adiciona ao mundo físico
    this.physicsWorld.addRigidBody(body);

    // Se tiver massa, guardamos para atualizar depois
    if (mass > 0) this.rigidBodies.push({ mesh, body });

    return body;
  }
  /**
   * O shape físico tem metade das dimensões do mesh
   */
  createShape(x = 5, y = 0.5, z = 5) {
    return new this.AmmoLib.btBoxShape(new this.AmmoLib.btVector3(x, y, z));
  }
  update(delta) {
    // Tempo entre frames (deltaTime)
    //  const delta = clock.getDelta();

    // Avança a simulação física
    // 10 = máx. subpassos (maior precisão)
    this.physicsWorld.stepSimulation(delta, 10);

    // Atualiza posição e rotação dos objetos dinâmicos

    for (const { mesh, body } of this.rigidBodies) {
      const motionState = body.getMotionState();
      if (motionState) {
        motionState.getWorldTransform(this.tmpTrans); // pega transformação física
        const origin = this.tmpTrans.getOrigin();
        const rot = this.tmpTrans.getRotation();

        // Aplica ao objeto Three.js
        mesh.position.set(origin.x(), origin.y(), origin.z());
        mesh.quaternion.set(rot.x(), rot.y(), rot.z(), rot.w());
      }
    }
  }
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
      // <- evita resposta física
      ghost.getCollisionFlags() | this.AmmoLib.CF_NO_CONTACT_RESPONSE
    );

    this.physicsWorld.addCollisionObject(
      ghost,
      1, // collision group
      -1 // collide with all
    );

    return ghost;
  }
  checkCollisions() {
    //&&&
  }
  checkGhostCollisions(ghost) {
    const num = ghost.getNumOverlappingObjects();
    for (let i = 0; i < num; i++) {
      const obj = ghost.getOverlappingObject(i);
      console.log("Colidiu com", obj);
    }
  }
}
