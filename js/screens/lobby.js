import { ScreenThreejs } from "./screen_fron_trheejs.js";
import * as THREE from "three";

export class Lobby extends ScreenThreejs {
  constructor(father, track, tag = "div", styleDisplay = "block") {
    super("lobby", father, tag, styleDisplay);

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

    // Inicialização
    this.__init();
  }

  __init() {
    this.__addCanvas();
    this.__createEnvironment();
    this.__createAirplane();
    this.__addControls();
    this.__setupResizeHandler();
  //  console.log(this.renderer.info.render, this.renderer.info.memory);
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

  __createEnvironment() {
    // Criar nuvens
    for (let i = 0; i < 15; i++) {
      const cloud = this.__createCloud();
      cloud.position.set(
        Math.random() * 40 - 20,
        Math.random() * 8 - 2,
        Math.random() * 40 - 30
      );
      cloud.userData.speed = Math.random() * 0.01 + 0.005;
      this.clouds.push(cloud);
      this.scene.add(cloud);
    }

    // Criar estrelas/partículas de fundo
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = [];

    for (let i = 0; i < 200; i++) {
      starPositions.push(
        Math.random() * 100 - 50,
        Math.random() * 50,
        Math.random() * 100 - 80
      );
    }

    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starPositions, 3)
    );

    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.6
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    this.scene.add(starField);
    this.stars.push(starField);

    // Criar pista/plataforma
    // const runwayGeometry = new THREE.BoxGeometry(3, 0.2, 20);
    // const runwayMaterial = new THREE.MeshStandardMaterial({
    //   color: 0x404040,
    //   roughness: 0.8
    // });
    // const runway = new THREE.Mesh(runwayGeometry, runwayMaterial);
    // runway.position.set(0, -2, -5);
    // runway.receiveShadow = true;
    // this.scene.add(runway);

    // // Linhas da pista
    // for (let i = 0; i < 8; i++) {
    //   const lineGeometry = new THREE.BoxGeometry(0.3, 0.21, 1.5);
    //   const lineMaterial = new THREE.MeshStandardMaterial({
    //     color: 0xffff00
    //   });
    //   const line = new THREE.Mesh(lineGeometry, lineMaterial);
    //   line.position.set(0, -1.9, -10 + i * 2.5);
    //   this.scene.add(line);
    // }

    this.scene.add(this.track.scene);
  }

  __createCloud() {
    const cloud = new THREE.Group();
    const cloudMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 1,
      transparent: true,
      opacity: 0.8
    });

    // Criar nuvem com várias esferas
    for (let i = 0; i < 5; i++) {
      const sphereGeometry = new THREE.SphereGeometry(
        Math.random() * 0.5 + 0.3,
        16,
        16
      );
      const sphere = new THREE.Mesh(sphereGeometry, cloudMaterial);
      sphere.position.set(
        Math.random() * 2 - 1,
        Math.random() * 0.5,
        Math.random() * 2 - 1
      );
      cloud.add(sphere);
    }

    return cloud;
  }

  __createAirplane() {
    this.airplane = new THREE.Group();

    // Fuselagem
    const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.3, 3, 16);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xff4444,
      metalness: 0.5,
      roughness: 0.3
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.rotation.z = Math.PI / 2;
    body.castShadow = true;
    this.airplane.add(body);

    // Nariz do avião
    const noseGeometry = new THREE.ConeGeometry(0.3, 0.8, 16);
    const noseMaterial = new THREE.MeshStandardMaterial({
      color: 0xffff00,
      metalness: 0.6,
      roughness: 0.2
    });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.rotation.z = -Math.PI / 2;
    nose.position.x = 1.9;
    nose.castShadow = true;
    this.airplane.add(nose);

    // Asa principal
    const wingGeometry = new THREE.BoxGeometry(1.5, 0.1, 4);
    const wingMaterial = new THREE.MeshStandardMaterial({
      color: 0x3366ff,
      metalness: 0.4,
      roughness: 0.4
    });
    const wing = new THREE.Mesh(wingGeometry, wingMaterial);
    wing.position.x = -0.2;
    wing.castShadow = true;
    this.airplane.add(wing);

    // Cauda vertical
    const tailGeometry = new THREE.BoxGeometry(0.1, 1, 0.8);
    const tailMaterial = new THREE.MeshStandardMaterial({
      color: 0x3366ff,
      metalness: 0.4,
      roughness: 0.4
    });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.position.set(-1.3, 0.5, 0);
    tail.castShadow = true;
    this.airplane.add(tail);

    // Cauda horizontal
    const hTailGeometry = new THREE.BoxGeometry(0.8, 0.1, 1.5);
    const hTail = new THREE.Mesh(hTailGeometry, tailMaterial);
    hTail.position.set(-1.3, 0.5, 0);
    hTail.castShadow = true;
    this.airplane.add(hTail);

    // Janelas (cockpit)
    const windowGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const windowMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x0088ff,
      emissiveIntensity: 0.3
    });
    const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
    window1.position.set(1.2, 0.15, 0);
    this.airplane.add(window1);

    // Hélice
    const propellerGroup = new THREE.Group();
    const propellerGeometry = new THREE.BoxGeometry(0.1, 1.5, 0.1);
    const propellerMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      metalness: 0.7,
      roughness: 0.3
    });

    for (let i = 0; i < 3; i++) {
      const blade = new THREE.Mesh(propellerGeometry, propellerMaterial);
      blade.rotation.z = (i * Math.PI * 2) / 3;
      propellerGroup.add(blade);
    }

    propellerGroup.position.x = 2.3;
    propellerGroup.userData.isActive = true;
    this.airplane.add(propellerGroup);
    this.airplane.userData.propeller = propellerGroup;

    // Posicionar avião
    this.airplane.position.set(0, 0, 0);
    this.airplane.rotation.y = Math.PI / 6;
    this.airplane.castShadow = true;

    this.scene.add(this.airplane);
  }

  __startAnimation() {
    const animate = () => {
      this.time += 0.016;

      // Animar avião (movimento suave de voo)
      if (this.airplane) {
        this.airplane.position.y = Math.sin(this.time * 2) * 0.2;
        this.airplane.rotation.z = Math.sin(this.time * 1.5) * 0.05;
        this.airplane.rotation.x = Math.sin(this.time * 1.2) * 0.03;

        // Girar hélice
        const propeller = this.airplane.userData.propeller;
        if (propeller && propeller.userData.isActive) {
          propeller.rotation.x += 0.5;
        }
      }

      // Animar nuvens
      this.clouds.forEach(cloud => {
        cloud.position.x += cloud.userData.speed;
        if (cloud.position.x > 25) {
          cloud.position.x = -25;
        }
      });

      // Movimento sutil da câmera
      this.camera.position.y = 2 + Math.sin(this.time * 0.5) * 0.3;
      this.camera.lookAt(0, 0, 0);
    };
    super.__startAnimation(animate);

    // Renderiza a cena
  }

  __addControls() {
    // Container para UI
    const uiContainer = document.createElement("div");
    Object.assign(uiContainer.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: "10"
    });

    // Título do jogo
    const title = document.createElement("h1");
    title.textContent = "SKY RIDERS";
    Object.assign(title.style, {
      position: "absolute",
      top: "40px",
      left: "50%",
      transform: "translateX(-50%)",
      color: "#ffffff",
      fontSize: "64px",
      fontWeight: "bold",
      textShadow: "0 4px 8px rgba(0,0,0,0.5), 0 0 20px rgba(255,100,100,0.5)",
      fontFamily: "Arial Black, sans-serif",
      letterSpacing: "8px",
      margin: "0",
      pointerEvents: "none"
    });
    uiContainer.appendChild(title);

    // Subtítulo
    const subtitle = document.createElement("p");
    subtitle.textContent = "Prepare for Takeoff";
    Object.assign(subtitle.style, {
      position: "absolute",
      top: "120px",
      left: "50%",
      transform: "translateX(-50%)",
      color: "#ffff00",
      fontSize: "24px",
      textShadow: "0 2px 4px rgba(0,0,0,0.7)",
      fontFamily: "Arial, sans-serif",
      margin: "0",
      pointerEvents: "none"
    });
    uiContainer.appendChild(subtitle);

    // Botão Start
    const btnStart = document.createElement("button");
    btnStart.id = "start";
    btnStart.className = "lobby-btn";
    btnStart.textContent = "START FLIGHT";

    Object.assign(btnStart.style, {
      position: "fixed",
      "-webkit-touch-callout": "none",
      "-webkit-user-select": "none",
      "-khtml-user-select": "none",
      "-moz-user-select": "none",
      "-ms-user-select": "none",
      "user-select": "none",
      bottom: "80px",
      left: "80%",
      transform: "translateX(-50%)",
      padding: "20px 60px",
      fontSize: "28px",
      fontWeight: "bold",
      cursor: "pointer",
      background: "linear-gradient(135deg, #ff4444 0%, #cc0000 100%)",
      color: "#ffffff",
      border: "4px solid #ffff00",
      borderRadius: "50px",
      boxShadow: "0 8px 16px rgba(0,0,0,0.4), 0 0 30px rgba(255,68,68,0.6)",
      fontFamily: "Arial Black, sans-serif",
      letterSpacing: "2px",
      transition: "all 0.3s ease",
      pointerEvents: "auto",
      textShadow: "0 2px 4px rgba(0,0,0,0.5)"
    });

    btnStart.addEventListener("mouseenter", () => {
      btnStart.style.transform = "translateX(-50%) scale(1.1)";
      btnStart.style.boxShadow =
        "0 12px 24px rgba(0,0,0,0.5), 0 0 40px rgba(255,68,68,0.8)";
    });

    btnStart.addEventListener("mouseleave", () => {
      btnStart.style.transform = "translateX(-50%) scale(1)";
      btnStart.style.boxShadow =
        "0 8px 16px rgba(0,0,0,0.4), 0 0 30px rgba(255,68,68,0.6)";
    });

    uiContainer.appendChild(btnStart);

    // Info do jogador
    const playerInfo = document.createElement("div");
    playerInfo.textContent = "Ready to Fly";
    Object.assign(playerInfo.style, {
      position: "absolute",
      bottom: "20px",
      left: "20px",
      color: "#ffffff",
      fontSize: "18px",
      textShadow: "0 2px 4px rgba(0,0,0,0.7)",
      fontFamily: "Arial, sans-serif",
      padding: "10px 20px",
      background: "rgba(0,0,0,0.5)",
      borderRadius: "10px",
      border: "2px solid rgba(255,255,255,0.3)",
      pointerEvents: "none"
    });
    uiContainer.appendChild(playerInfo);

    this.getElement().appendChild(uiContainer);
    this.setButton(btnStart);
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

  setStartGame(callback) {
    this.startGame = callback;
  }
}
