import { Screen } from "./screen-02.js";
import * as THREE from "three";

export class Lobby extends Screen {
  constructor(nameId, father, tag = "div", styleDisplay = "block") {
    super(nameId, father, tag, styleDisplay);
    
    // Propriedades da classe
    this.animCallback = null;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.animationId = null;
    
    // Inicialização
    this.__init();
  }

  __init() {
    this.__addCanvas();
    this.__addControls();
    this.__setupResizeHandler();
  }

  __addCanvas() {
    // Configuração da cena
    this.scene = new THREE.Scene();
    
    // Configuração da câmera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;
    
    // Configuração do renderer
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: false 
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.screen.appendChild(this.renderer.domElement);
    
    // Iluminação
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);
    
    // Inicia o loop de animação
    this.__startAnimation();
  }

  __startAnimation() {
    const animate = () => {
      // Executa callback customizado se existir
      if (this.animCallback) {
        this.animCallback();
      }
      
      // Renderiza a cena
      this.renderer.render(this.scene, this.camera);
    };
    
    this.renderer.setAnimationLoop(animate);
  }

  __setupResizeHandler() {
    const handleResize = () => {
      if (!this.camera || !this.renderer) return;
      
      // Atualiza câmera
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      
      // Atualiza renderer
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    window.addEventListener("resize", handleResize);
    
    // Guarda referência para cleanup posterior se necessário
    this._resizeHandler = handleResize;
  }

  __addControls() {
    const btnStart = document.createElement("button");
    btnStart.id = "start";
    btnStart.className = "lobby-btn";
    btnStart.textContent = "Start";
    
    // Adiciona estilo inline básico (considere usar CSS externo)
    Object.assign(btnStart.style, {
      position: "absolute",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "12px 24px",
      fontSize: "18px",
      cursor: "pointer",
      zIndex: "10"
    });
    
    this.getElement().appendChild(btnStart);
    
    // Retorna o botão para permitir adicionar eventos externamente
    return btnStart;
  }

  // Métodos públicos
  setAnimCallback(callback) {
    if (typeof callback !== "function") {
      console.warn("setAnimCallback expects a function");
      return;
    }
    this.animCallback = callback;
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

  // Adiciona objeto à cena
  addToScene(object) {
    if (this.scene && object instanceof THREE.Object3D) {
      this.scene.add(object);
    }
  }

  // Remove objeto da cena
  removeFromScene(object) {
    if (this.scene && object instanceof THREE.Object3D) {
      this.scene.remove(object);
    }
  }

  // Cleanup para evitar memory leaks
  dispose() {
    // Para o loop de animação
    if (this.renderer) {
      this.renderer.setAnimationLoop(null);
    }
    
    // Remove event listener
    if (this._resizeHandler) {
      window.removeEventListener("resize", this._resizeHandler);
    }
    
    // Limpa recursos do Three.js
    if (this.renderer) {
      this.renderer.dispose();
    }
    
    if (this.scene) {
      this.scene.traverse((object) => {
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
    
    // Limpa referências
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.animCallback = null;
  }
}