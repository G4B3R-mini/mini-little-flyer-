// Importa a classe base
import { Screen } from "./screen-02.js";

export class Game extends Screen {
    constructor(nameId, father, track, tag = "div", styleDisplay = "block") {
    super("game", father, tag, styleDisplay);

    // Propriedades da classe
    this.track = track;
    this.animCallback = null;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.airplane = null;
    this.clouds = [];
    this.stars = [];
    this.time = 0;
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
    this.camera.position.set(0, 2, 8);
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
}
