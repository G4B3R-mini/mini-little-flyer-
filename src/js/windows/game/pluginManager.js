import { PluginManager, PluginObserver } from "../ScreenThrejs/IPlugin.js";

export class GamePluginManager extends PluginManager {
  constructor(observer = new PluginObserver()) {
    super(observer);
  }

  notify(...p) {
    super.notify(...p);
  }
  register(plugin, sceneManager) {
    super.register(plugin, sceneManager);
  }
}


export class GamePluginObserverEvents extends PluginObserver {
  notify(...p) {
    for (const plugin of this.plugins) {
      plugin.update(...p);
    }
  }
  register(plugin, sceneManager) {
    super.register(plugin, sceneManager);
  }
}


export class GamePluginObserver extends PluginObserver {
  notify(...p) {
    for (const plugin of this.plugins) {
      plugin.update(...p);
    }
  }
  register(plugin, sceneManager) {
    super.register(plugin, sceneManager);
  }
}

export class IsPluginGame {
  constructor() {}
  /**
   *
   * @param {number} delta
   * @param {THREE.Camera} camera
   */
  update(delta, camera) {
    //
  }
}



