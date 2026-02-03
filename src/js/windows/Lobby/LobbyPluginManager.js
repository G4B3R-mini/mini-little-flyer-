import { PluginManager, PluginObserver } from "../ScreenThrejs/IPlugin.js";

export class LobbyPluginManager extends PluginManager {
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
