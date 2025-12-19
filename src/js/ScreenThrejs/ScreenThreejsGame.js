import { Screen } from "../screen/screen.js";
import * as THREE from "three";
import { GameScene } from "./GameScene.js";
import { GameRenderer } from "./GameRenderer.js";
import { GameCamera } from "./GameCamera .js";
import { GameListener } from "./GameListener.js";
import { PluginManager } from "./IPlugin.js";


/**
 * @example
 * 
 * const gameScreenBase = new ScreenThreejsGame(
  new GameScreen("base",father )
 );
 
 gameScreenBase.create();
 gameScreenBase.appendTo();
 gameScreenBase.animate();
 gameScreenBase.appendPlugin(new CubePlugin())
  window.addEventListener('resize', (v)=> {gameScreenBase.resizeHandler()}, false);
 */
export class ScreenThreejsGame extends Screen {
  constructor(
    screen = new GameScreen(),
    sceneManager = new GameScene(),
    renderManager = new GameRenderer(),
    cameramanager = new GameCamera(),
    animationManager = new AnimationManager(),
    resizeManager = new ResizeManager(),
    pluginManager = new PluginManager()
    // listenerManager = new GameListener()
  ) {
    super({
      id: screen.id,
      father: screen.father,
      tag: screen.tag,
      styleDisplay: screen.styleDisplay,
    });
    this.screen = screen;
    this.sceneManager = sceneManager;
    this.renderManager = renderManager;
    this.cameraManager = cameramanager;
    this.animationManager = animationManager;
    this.resizeManager = resizeManager;
    this.pluginManager = pluginManager;
    this.RendererResizeAdapter();
  }

  appendPlugin(plugin) {
    this.pluginManager.register(plugin, this.sceneManager);
  }
  animate() {
    this.animationManager.animate(
      this.renderManager,
      this.cameraManager.get(),
      this.sceneManager.get(),
      this.pluginManager
    );
  }
  appendTo() {
    this.renderManager.appendTo(this.screen.id);
  }
  create() {
    super.create();
    this.sceneManager.create();
    this.renderManager.create();
  }
  dispose() {}
  destroy() {
    super.destroy();
  }

  RendererResizeAdapter() {
    this.resizeHandler();
  }

  resizeHandler() {
    if (!this.cameraManager || !this.renderManager) return;
    this.resizeManager.resizeHandler(this.cameraManager, this.renderManager);
  }
}

export class GameScreen {
  constructor(
    id = "base",
    father = "canvas",
    tag = "div",
    styleDisplay = "block"
  ) {
    this.id = id;
    this.father = father;
    this.tag = tag;
    this.styleDisplay = styleDisplay;
  }
}

export class AnimationManager {
  constructor() {}
  animate(renderManager, camera, scene, pluginManager) {
    renderManager.animate(scene, camera, () => {pluginManager.notify()});
  }
}

export class ResizeManager {
  resizeHandler(...managers) {
    managers.forEach((m) => m.resizeHandler());
  }
}
