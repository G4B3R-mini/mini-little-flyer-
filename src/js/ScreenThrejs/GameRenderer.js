
import { WebGLRenderer } from "../threejs/render/WebGLRenderer.js";
import * as THREE from "three";


export class GameRenderer {
  constructor(
  ) {
    this.renderer = new WebGLRenderer(true, false);

  }

  RendererResizeAdapter() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
  update() {
    this.RendererResizeAdapter();
  }
  create() {
   this.RendererResizeAdapter()
   this.renderer.setShadowMapEnabled(true)
   this.renderer.setShadowMapType(THREE.PCFSoftShadowMap)
  }
  animate(scene, camera, animCallback) {
    // Animar avião (movimento suave de voo)
    const animate = () => {
      // Executa callback customizado se existir
      if (animCallback) {
        animCallback();
      }

      this.renderer.render(scene, camera);
    };
    this.renderer.setAnimationLoop(animate);
  }
  destroy() {
    this.renderer.dispose();
  }
  resizeHandler() {
    if (!this.renderer.get()) return;
    this.update();
  }

    appendTo( fatherId) {
   this.renderer.appendTo(fatherId)
  } 
}


