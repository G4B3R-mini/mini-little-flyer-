import { delay } from "../utils/Delay.js";

export class SetupCache {
  constructor(
    minLoadingTime,
    cacheLoadingCallback = () => {},
    cacheLoadedCallback = (lobby, game) => {}
  ) {
    this.minLoadingTime = minLoadingTime;

    this.cacheLoadedCallback = cacheLoadedCallback;
    this.cacheLoadingCallback = cacheLoadingCallback;
  }
  async loadCache() {
    try {
      // dá um frame pro browser renderizar o loader antes de bloquear
      //  await new Promise(requestAnimationFrame);

      // Executa o callback de carregamento
      const startTime = performance.now();
      await this.executeCacheLoading();
      const loadTime = performance.now() - startTime;

      // Garante tempo mínimo de exibição do loading
      const remainingTime = Math.max(0, this.minLoadingTime - loadTime);

      await delay(remainingTime);
      //  await this.transitionToLobby();

      //  if (callback) this.callback();
     /* if (this.cacheLoadedCallback)
        this.cacheLoadedCallback(
          this.manager.screens.Lobby,
          this.manager.screens.Game
        );*/
      this.isLoaded = true;
    } catch (error) {
      console.error("Erro durante o carregamento:", error);
      this.handleLoadError(error);
    }
  }

  async executeCacheLoading() {
    try {
      // Se o callback retornar uma Promise, aguarda
      const result = this.cacheLoadingCallback();
      if (result instanceof Promise) {
        await result;
      }
    } catch (error) {
      console.error("Erro no callback de carregamento:", error);
      throw error;
    }
  }
}
