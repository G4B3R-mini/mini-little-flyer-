import * as THREE from "three";
import { BumpPhysicLib } from "../../AmmoInstance/BumpAmmoLib";
import {  BumpAmmoFacade } from "../../AmmoInstance/BumpAmmoFacade";
import { BumpAmmoTypes } from "../../AmmoInstance/BumpAmmoTypes";
import { BumpWorld } from "../../main/world/BumpWorld";
document.body.style.backgroundColor = "black";

const AmmoLib = new BumpPhysicLib();
await AmmoLib.load();
const BumpLib = new BumpAmmoFacade(AmmoLib);
const bumpWorld = new BumpWorld(BumpLib);
const bumpTypes = new BumpAmmoTypes(AmmoLib);

// Configuração Básica Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light, new THREE.AmbientLight(0x404040));

// Configuração Ammo.js

let sensorBody = null;

// --- CRIAÇÃO DO CHÃO ---
createBox(
  new THREE.Vector3(0, -1, 0),
  new THREE.Vector3(40, 1, 40),
  0,
  0x333333
);

// --- CRIAÇÃO DO SENSOR (O OBJETO ATRAVESSÁVEL) ---
function createSensor() {
  const pos = new THREE.Vector3(0, 3, 0);
  const size = new THREE.Vector3(6, 4, 1);

  // Mesh Visual
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(size.x, size.y, size.z),
    new THREE.MeshStandardMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.3,
    })
  );
  mesh.position.copy(pos);
  scene.add(mesh);

  // Física
  const transform = BumpLib.math.transform();
  transform.setIdentity();
  transform.setOrigin(BumpLib.math.vector3(pos.x, pos.y, pos.z));
  const motionState = BumpLib.body.motionState(transform);
  const colShape = BumpLib.shape.boxShape(
    BumpLib.math.vector3(size.x / 2, size.y / 2, size.z / 2)
  );
  const rbInfo = BumpLib.body.rigidBodyConstructionInfo(
    0,
    motionState,
    colShape,
    BumpLib.math.vector3(0, 0, 0)
  );
  const body = BumpLib.body.rigidBody(rbInfo);

  // FLAG MÁGICA: CF_NO_CONTACT_RESPONSE = 4
  // Isso faz o objeto ser um "fantasma" que detecta colisão mas não impede movimento
  body.setCollisionFlags(body.getCollisionFlags() | 4);

  bumpWorld.addRigidBody(body, mesh, 0);
  sensorBody = body; // Referência para checagem posterior
}

// Função genérica para criar caixas/esferas
function createBox(pos, size, mass, color) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(size.x, size.y, size.z),
    new THREE.MeshStandardMaterial({ color })
  );
  mesh.position.copy(pos);
  scene.add(mesh);

  const transform = BumpLib.math.transform();
  transform.setIdentity();
  transform.setOrigin(BumpLib.math.vector3(pos.x, pos.y, pos.z));
  const motionState = BumpLib.body.motionState(transform);
  const colShape = BumpLib.shape.boxShape(
    BumpLib.math.vector3(size.x / 2, size.y / 2, size.z / 2)
  );
  const localInertia = BumpLib.math.vector3(0, 0, 0);
  if (mass > 0) colShape.calculateLocalInertia(mass, localInertia);
  const rbInfo = BumpLib.body.rigidBodyConstructionInfo(
    mass,
    motionState,
    colShape,
    localInertia
  );
  const body = BumpLib.body.rigidBody(rbInfo);
bumpWorld.addRigidBody(body, mesh, mass);
}

function spawnSphere() {
  const radius = 0.5;
  const pos = { x: (Math.random() - 0.5) * 4, y: 10, z: 0 };
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(radius),
    new THREE.MeshStandardMaterial({ color: 0x339af0 })
  );
  scene.add(mesh);

  const transform = BumpLib.math.transform();
  transform.setIdentity();
  transform.setOrigin(BumpLib.math.vector3(pos.x, pos.y, pos.z));
  const colShape = BumpLib.shape.sphereShape(radius);
  const localInertia = BumpLib.math.vector3(0, 0, 0);
  colShape.calculateLocalInertia(1, localInertia);
  const rbInfo = BumpLib.body.rigidBodyConstructionInfo(
    1,
    BumpLib.body.motionState(transform),
    colShape,
    localInertia
  );
  const body = BumpLib.body.rigidBody(rbInfo);
  bumpWorld.addRigidBody(body, mesh, 1);
}

// --- DETECÇÃO DE ATRAVESSAMENTO ---
function updatePhysics(deltaTime) {
  bumpWorld.update(deltaTime);


  // Checa se algo atravessou o sensor
  let numManifolds = bumpWorld.dispatcher.getNumManifolds();
  for (let i = 0; i < numManifolds; i++) {
    let manifold = bumpWorld.dispatcher.getManifoldByIndexInternal(i);
    let rb0 = BumpLib.utils.castObject(manifold.getBody0(), bumpTypes.RigidBody);
    let rb1 = BumpLib.utils.castObject(manifold.getBody1(), bumpTypes.RigidBody);

    if (rb0 === sensorBody || rb1 === sensorBody) {
      if (manifold.getNumContacts() > 0) {
        console.log("LOG: Objeto atravessando o sensor verde!");
      }
    }
  }
  }

// Loop de Animação
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  updatePhysics(clock.getDelta());
  renderer.render(scene, camera);
}

camera.position.set(0, 5, 15);
createSensor();
animate();

window.addEventListener("mousedown", spawnSphere);
