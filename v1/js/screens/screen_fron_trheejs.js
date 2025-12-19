import { Screen } from "./screen-02.js";
import * as THREE from "three";

export class ScreenThreejs extends Screen {
  constructor(
    nameId,
    father,
    callback = () => {},
    tag = "div",
    styleDisplay = "block"
  ) {
    super(nameId,
    father,
    tag,
    styleDisplay);
    
    this.animationCallback = callback;
    
  }
  __addCanvas() {
    // Configuração da cena com céu azul
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb);
    this.scene.fog = new THREE.Fog(0x87ceeb, 10, 50);

    // Configuração da câmera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 2, 8.1);
    this.camera.lookAt(0, 0, 0);

    // Configuração do renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.screen.appendChild(this.renderer.domElement);

    // Iluminação
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    this.scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xffa500, 0.3);
    fillLight.position.set(-5, 5, -5);
    this.scene.add(fillLight);

    // Inicia o loop de animação
    this.__startAnimation();
  }
  __setupResizeHandler() {
    const handleResize = () => {
      if (!this.camera || !this.renderer) return;

      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);
    this._resizeHandler = handleResize;
  }
  getScene() {
    return this.scene;
  }

  getCamera() {
    return this.camera;
  }

  getRenderer() {
    return this.renderer;
  }

  addToScene(object) {
    if (this.scene && object instanceof THREE.Object3D) {
      this.scene.add(object);
    }
  }

  removeFromScene(object) {
    if (this.scene && object instanceof THREE.Object3D) {
      this.scene.remove(object);
    }
  }

  dispose() {
    if (this.renderer) {
      this.renderer.setAnimationLoop(null);
    }

    if (this._resizeHandler) {
      window.removeEventListener("resize", this._resizeHandler);
    }

    if (this.renderer) {
      this.renderer.dispose();
    }

    if (this.scene) {
      this.scene.traverse(object => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    }

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.animCallback = null;
    this.airplane = null;
    this.clouds = [];
    this.stars = [];
  }
  setAirplane(object) {
    this.removeFromScene(this.airplane);
    this.addToScene(object);
    this.airplane = object;
  }

  __createAirplane(position = [0, 0, 0], rotation = Math.PI / 6) {
    this.airplane = new THREE.Group();
    // Posicionar avião
    this.airplane.position.set(position);
    this.airplane.rotation.y = rotation;
    this.airplane.castShadow = true;
    this.scene.add(this.airplane);
  }
  __startAnimation(animCallback) {
    // Animar avião (movimento suave de voo)
    const animate = () => {
      // Executa callback customizado se existir
      if (animCallback) {
        animCallback();
      }

      this.renderer.render(this.scene, this.camera);
    };
    this.renderer.setAnimationLoop(animate);
  }
  destroy(){
   super.destroy()
   this.dispose()
  }
}
