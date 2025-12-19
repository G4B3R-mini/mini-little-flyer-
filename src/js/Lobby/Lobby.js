import { GameCamera } from "../ScreenThrejs/GameCamera .js";
import { GameRenderer } from "../ScreenThrejs/GameRenderer.js";
import { GameScene } from "../ScreenThrejs/GameScene.js";
import { IPlugin, PluginManager, PluginObserver } from "../ScreenThrejs/IPlugin.js";
import {
  AnimationManagerParmClock,
  GameRendererParmClock,
} from "../ScreenThrejs/ParmClock.js";
import {
  GameScreen,
  ResizeManager,
  ScreenThreejsGame,
} from "../ScreenThrejs/ScreenThreejsGame.js";
import { LobbyPluginManager } from "./LobbyPluginManager.js";
import { SmoothAnimationPlugin } from "./SmoothAnimationPlugin.js";

export class Lobby extends ScreenThreejsGame {
  constructor(
    screen = new GameScreen(),
    sceneManager = new GameScene(),
    renderManager = new GameRendererParmClock(),
    cameramanager = new GameCamera(),
    animationManager = new AnimationManagerParmClock(),
    resizeManager = new ResizeManager(),
    pluginManager = new LobbyPluginManager(),
    smoothAnimation = new SmoothAnimationPlugin()
  ) {
    super(
      screen,
      sceneManager,
      renderManager,
      cameramanager,
      animationManager,
      resizeManager,
      pluginManager
    );
    this.smoothAnimation = smoothAnimation;
  }

  create() {
    super.create();
  //  this.pluginManager.register(this.smoothAnimation, this.sceneManager);

  }
  update(time) {
    super.update(time);
    this.smoothAnimation.SmoothAnimation(this.cameraManager.camera, time);
  }
}








