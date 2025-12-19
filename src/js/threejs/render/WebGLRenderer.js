import * as THREE from "three";

import { WebGLRendererElement } from "./WebGLRendererElement.js";
import { WebGLRendererCleaner } from "./WebGLRendererCleaner.js";

export class WebGLRenderer {
  constructor(antalias = true, alpha = false) {
    this.renderer = new THREE.WebGLRenderer({
      antialias: antalias,
      alpha: alpha,
    });

    this.cleaner = new WebGLRendererCleaner()
    this.rendererElement = new WebGLRendererElement();
    this.controler =new  WebGLRendererControler()
  }


  appendTo( fatherId) {
    this.rendererElement.appendTo(this.renderer, fatherId)
  } 
    dispose() {
    this.cleaner.dispose(this.renderer);
  }
  get() {
    return this.renderer;
  }

  render( scene, camera){
    this.controler.render(this.renderer,scene, camera)
  }

setAnimationLoop( animate){
     this.controler.setAnimationLoop(this.renderer,animate);
}
  setShadowMapEnabled(v = true) {
    this.rendererElement.setShadowMapEnabled(this.renderer, v)
  }
  setShadowMapType( type = THREE.PCFSoftShadowMap) {
    this.rendererElement.setShadowMapType(this.renderer,type)
  }
  setSize(width = window.innerWidth, height = window.innerHeight) {
    this.rendererElement.setSize(this.renderer,width, height);
  }
  setPixelRatio( pixelRatio = Math.min(window.devicePixelRatio, 2)) {
    this.rendererElement.setPixelRatio(this.renderer,pixelRatio);
  }

}




class WebGLRendererControler {
  render(render, scene, camera){
    render.render(scene, camera)
  }

setAnimationLoop(renderer, animate){
     renderer.setAnimationLoop(animate);
}
}
