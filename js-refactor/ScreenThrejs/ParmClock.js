import { AnimationManager } from "./ScreenThreejsGame.js";

import * as THREE from "three";
import { GameRenderer } from "./GameRenderer.js";


export class GameRendererParmClock extends GameRenderer {
  constructor(
    clock = new Clock()
  ) {
    super()
    this.clock =clock

  }
  animate(scene, camera, animCallback) {
    // Animar avião (movimento suave de voo)
    const animate = () => {
        const delta = this.clock.get()
  
      // Executa callback customizado se existir
      if (animCallback) {
        animCallback(delta);
      }

      this.renderer.render(scene, camera);
    };
    this.renderer.setAnimationLoop(animate);
  }

}

export class Clock {
  constructor() {
    this.threeClock = new THREE.Clock(); // Renomeado para evitar confusão interna
  }
  
  // O método 'get()' retorna o delta de tempo em segundos
  get() {
    return this.threeClock.getDelta();
  }
}


export class AnimationManagerParmClock extends AnimationManager{

  animate(renderManager, camera, scene, pluginManager) {
    renderManager.animate(scene, camera, (delta) => {
            
        pluginManager.notify(delta)});
  }
}