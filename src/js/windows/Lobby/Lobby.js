import { GameCamera } from "../ScreenThrejs/GameCamera.js";
import { GameRenderer } from "../ScreenThrejs/GameRenderer.js";
import { GameScene } from "../ScreenThrejs/GameScene.js";
import {
  IPlugin,
  PluginManager,
  PluginObserver,
} from "../ScreenThrejs/IPlugin.js";
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
import { LobbyUIOrchestrator, UIOrchestrator } from "./ui/manager.js";

export class Lobby extends ScreenThreejsGame {
  constructor(
    screen = new GameScreen("lobby-screen"),
    sceneManager = new GameScene(),
    renderManager = new GameRendererParmClock(),
    cameramanager = new GameCamera(),
    animationManager = new AnimationManagerParmClock(),
    resizeManager = new ResizeManager(),
    pluginManager = new LobbyPluginManager(),
    uiOrchestrator = new LobbyUIOrchestrator()
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
  
    this.uiOrchestrator = uiOrchestrator;
  }

  create() {
    super.create();
    this.uiOrchestrator.setupUIElements(this.getId());
  }
  getId() {
    return this.screen.getId();
  }
}
