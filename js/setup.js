import { Loading } from "./screens/loading.js";
import { Lobby } from "./screens/lobby.js";

export default class Setup {
  constructor(
    system,
    cacheLoadingCallback = lobby => {},
    cacheLoadedCallback = () => {}
  ) {
    this.system = system;

    this.cacheLoadedCallback = cacheLoadedCallback;
    this.cacheLoadingCallback = cacheLoadingCallback;
    this.minLoadingTime = 2000;
    this.isLoaded = false;

    this.initializeScreens();
    setTimeout(() => {
      console.log("carregando dados...");
      this.loadCache(cacheLoadedCallback);
    }, 1000);
    
  }

  initializeScreens() {
    try {
      const [mainScreen, loadingId, lobbyId] = this.system.screens;

      if (!mainScreen || !loadingId || !lobbyId) {
        throw new Error("Sistema de telas não configurado corretamente");
      }

      this.loading = new Loading(loadingId, mainScreen);
      this.lobby = new Lobby(lobbyId, mainScreen);
    } catch (error) {
      console.error("Erro ao inicializar telas:", error);
      throw error;
    }
  }

  async loadCache(callbak = () => {}) {
    try {
      // Cria a tela de loading
      this.loading.create();

      // Executa o callback de carregamento
      const startTime = performance.now();
      await this.executeCacheLoading();
      const loadTime = performance.now() - startTime;

      // Garante tempo mínimo de exibição do loading
      const remainingTime = Math.max(0, this.minLoadingTime - loadTime);

      await this.delay(remainingTime);
      await this.transitionToLobby();
      if (callback) this.callback();
      this.isLoaded = true;
    } catch (error) {
      console.error("Erro durante o carregamento:", error);
      this.handleLoadError(error);
    }
  }

  async executeCacheLoading() {
    try {
      // Se o callback retornar uma Promise, aguarda
      const result = this.cacheLoadingCallback(this.lobby);
      if (result instanceof Promise) {
        await result;
      }
    } catch (error) {
      console.error("Erro no callback de carregamento:", error);
      throw error;
    }
  }

  async transitionToLobby() {
    // Cria o lobby antes de destruir o loading para transição suave
    this.lobby.create();

    // Pequeno delay para garantir que o lobby seja renderizado
    await this.delay(100);

    // Remove o loading
    this.loading.destroy();
  }

  handleLoadError(error) {
    // Remove o loading em caso de erro
    if (this.loading) {
      this.loading.destroy();
    }

    // Aqui você pode mostrar uma tela de erro ou tentar novamente
    console.error(
      "Falha no carregamento. Verifique a conexão e tente novamente."
    );

    // Opcional: criar uma tela de erro personalizada
    // this.showErrorScreen(error);
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Método para recarregar manualmente
  async reload() {
    if (this.isLoaded) {
      this.lobby.destroy();
      this.isLoaded = false;
      await this.loadCache();
    }
  }

  // Método para configurar o tempo mínimo de loading
  setMinLoadingTime(ms) {
    this.minLoadingTime = Math.max(0, ms);
    return this;
  }

  // Getter para verificar estado
  getLoadingState() {
    return this.isLoaded;
  }
}
