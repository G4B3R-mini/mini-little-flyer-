import { Element } from "../../ScreenThrejs/Element.js";
import * as THREE from "three";

export class WebGLRendererElement extends Element {
  appendTo(render, fatherId) {
    this.el = render.domElement;
    super.appendTo(fatherId);
  }
  setShadowMapEnabled(renderer, v = true) {
    renderer.shadowMap.enabled = v;
  }
  setShadowMapType(renderer, type = THREE.PCFSoftShadowMap) {
    renderer.shadowMap.type = type;
  }
  setSize(render, width = window.innerWidth, height = window.innerHeight) {
    render.setSize(width, height);
  }
  setPixelRatio(renderer, pixelRatio = Math.min(window.devicePixelRatio, 2)) {
    renderer.setPixelRatio(pixelRatio);
  }
}
