import { EventsManager } from "../../events/eventsManager";
import { LobbyPluginManager } from "../Lobby/LobbyPluginManager";
import { SmoothAnimationPlugin } from "../Lobby/SmoothAnimationPlugin";
import { GameCamera } from "../ScreenThrejs/GameCamera";
import { GameRenderer } from "../ScreenThrejs/GameRenderer";
import { GameScene } from "../ScreenThrejs/GameScene";
import { IPlugin } from "../ScreenThrejs/IPlugin";
import {
  AnimationManagerParmClock,
  GameRendererParmClock,
} from "../ScreenThrejs/ParmClock";
import {
  GameScreen,
  ResizeManager,
  ScreenThreejsGame,
} from "../ScreenThrejs/ScreenThreejsGame";

export class Game extends ScreenThreejsGame {
  /**
   * @param {GameScreen} screen
   * @param {GameScene} sceneManager
   * @param {GameRendererParmClock} renderManager
   * @param {GameCamera} cameramanager
   * @param {AnimationManagerGame} animationManager
   * @param {ResizeManager} resizeManager
   * @param {LobbyPluginManager} pluginManager
   * @param {SmoothAnimationPlugin} smoothAnimation
   */
  constructor(
    screen = new GameScreen("game-screen"),
    sceneManager = new GameScene(),
    renderManager = new GameRendererParmClock(),
    cameramanager = new GameCamera(),
    animationManager = new AnimationManagerGame(),
    resizeManager = new ResizeManager(),
    pluginManager = new LobbyPluginManager(),
    smoothAnimation = new SmoothAnimationPlugin(),
    eventpluginManager = new PluginGameEventsManager()
  ) {
    super(
      screen,
      sceneManager,
      renderManager,
      cameramanager,
      animationManager,
      resizeManager,
      pluginManager,
    );
    this.eventpluginManager = eventpluginManager;
    this.appendPluginEvent({update: ()=>{this.resizeHandler()}, name: "resize"});
    
  }
  loadingScreen() {}

  /**
   * 
   * @param {IPlugin} plugin 
   */
  appendPlugin(plugin) {
    this.pluginManager.register(plugin, this.sceneManager);
  }
  appendPluginEvent(plugin) {
    this.eventpluginManager.register(plugin);
  }
}

export class AnimationManagerGame extends AnimationManagerParmClock {
  animate(renderManager, camera, scene, pluginManager) {
    renderManager.animate(scene, camera, (delta) => {
      pluginManager.notify(delta, camera);
    });
  }
}


const TYPE_PLUGIN_GAME = {
  IS_PLUGIN_GAME: "is_plugin_game",
  IS_PLUGIN_GAME_EVENTS: "is_plugin_game_events",
};







export class PluginGameEventsManager {
  constructor(observer = new EventsManager()) {
    this.observer = observer.create();
  }
  register(plugin) {
    this.observer.subscribe(plugin);
  }
}

export class PluginGameEventsObserver {
  notify(...p) {
    for (const plugin of this.plugins) {
      plugin.update(...p);
    }
  }
  register(plugin, sceneManager) {
    super.register(plugin, sceneManager);
  }
}

