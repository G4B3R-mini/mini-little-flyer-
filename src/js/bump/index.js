/*
bump/
│
├── index.js              # Ponto de entrada do módulo
├── bumpManager.js        # Lógica principal do bump
├── utils.js              # Funções auxiliares para bump
├── constants.js          # Constantes relacionadas ao bump
├── README.md             # Documentação do módulo bump
├── test/
│   └── bumpManager.test.js   # Testes automatizados
└── examples/
    └── exemploBump.js    # Exemplos de uso do bump
*/

export { BumpPhysicLib } from "./AmmoInstance/BumpAmmoLib";
export { BumpVector3 } from "./main/";
export { BumpTransform } from "./BumpTransform";
export { BumpWorld } from "./world/BumpWorld";

export { BumpShape, BumpShapeManager } from "./BumpShape";
export { BumpPhysicVector3 } from "./main/object/BumpPhysicVector3.1";
export {
  DefaultMotionState,
  MotionFactory,
} from "./main/object/DefaultMotionState.1";
export { BumpMass } from "./exemplos/rigidBody/BumpMass";
export {
  BumpObjectRigidBody,
  IBumpObjectRigidBody,
} from "./exemplos/rigidBody/BumpObjectRigidBody";
export { BumpRigidBodyConstructionInfo } from "./exemplos/rigidBody/BumpRigidBodyConstructionInfo.1";
export { BumpRigidBodyFactory } from "./exemplos/rigidBody/BumpRigidBodyFactory";
export { BumpRigidBodyInfoFactory } from "./exemplos/rigidBody/BumpRigidBodyInfoFactory";
export { IBumpRigidBodyColisionFlags } from "./exemplos/rigidBody/flags/IBumpRigidBodyColisionFlags";
export { BumpRigidBodyColisionFlagManager } from "./exemplos/rigidBody/flags/BumpRigidBodyColisionFlagManager";
export { BumpRigidBodyColisionFlags } from "./exemplos/rigidBody/flags/BumpRigidBodyColisionFlags";
export { TransformFactory } from "./exemplos/rigidBody/TransformFactory";
export {
  BumpRigidBody,
  BumpBodyManager,
} from "./exemplos/rigidBody/BumpRigidBody";
export { BumpAmmoFacade } from "./AmmoInstance/BumpAmmoLib";
