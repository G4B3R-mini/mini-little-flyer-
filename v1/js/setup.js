import { Loading, Lobby, Game, ScreenManager } from "./screens/main.js";
import { Track } from "./airport/Track.js";
import { delay } from "./utils/Delay.js";

export default class Setup {
  constructor(
    setupCache,
    system,
  ) {
    this.setupCache = setupCache
    this.system = system;
    this.airport = { track: new Track({ runwayLength: 40 }) };
    this.initializeScreens();

    this.isLoaded = false;

    setTimeout(() => {
      console.log("carregando dados...");
      this.loadCache();
    }, 300);
  }

  initializeScreens() {
    try {
      const mainScreen = this.system.conteiner;

      if (!mainScreen) {
        throw new Error("Sistema de telas não configurado corretamente");
      }
      this.manager = new ScreenManager()
        .addScreen(new Loading(mainScreen))
        .addScreen(new Lobby(mainScreen, this.airport.track.clone()))
        .addScreen(new Game(mainScreen, this.airport.track.clone()).setPhysic(this.system.libs.physic));
      this.manager.nextScreen(Loading, {});

    } catch (error) {
      console.error("Erro ao inicializar telas:", error);
      throw error;
    }
  }

  async loadCache() {
    this.setupCache.loadCache()
    if (this.setupCache.cacheLoadedCallback)
        this.setupCache.cacheLoadedCallback(
          this.manager.screens.Lobby,
          this.manager.screens.Game
        );
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

  async transitionToLobby() {
    // Cria o lobby antes de destruir o loading para transição suave
    this.manager.nextScreen(Lobby, {}).screenButtonClickEvent(() => {
      console.log("starting game");
      this.manager.nextScreen(Loading, { delay: 300 });
      this.transitionToGame();
    });
    // this.manager.screens.Lobby.create();

    // Pequeno delay para garantir que o lobby seja renderizado
    await delay(100);

    // // Remove o loading
    // this.manager.nextScreen("Loading")
    // this.manager.screens.Loading.destroy();
  }

  async transitionToGame() {
    // Cria o lobby antes de destruir o loading para transição suave
    this.manager.nextScreen(Game,{});

    // Pequeno delay para garantir que o lobby seja renderizado
    await delay(100);

    // Remove o loading
    // this.manager.screens.Lobby.destroy();
  }

  handleLoadError(error) {
    // Remove o loading em caso de erro
    this.manager.destroy();
    // Aqui você pode mostrar uma tela de erro ou tentar novamente
    console.error(
      "Falha no carregamento. Verifique a conexão e tente novamente."
    );

    // Opcional: criar uma tela de erro personalizada
    // this.showErrorScreen(error);
  }

  // Método para recarregar manualmente
  async reload() {
    if (this.isLoaded) {
      this.manager.screens.Lobby.destroy();
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
