import { Loading, Lobby, Game, ScreenManager } from "./screens/main.js";

export class SetupScreensCreate {
  constructor(conteiner, track, physic) {
   this.initializeScreens(conteiner, track, physic)
  }
  initializeScreens(conteiner, track, physic) {
    try {
      const mainScreen = conteiner;

      if (!mainScreen) {
        throw new Error("Sistema de telas não configurado corretamente");
      }
      this.manager = new ScreenManager()
        .addScreen(new Loading(mainScreen))
        .addScreen(new Lobby(mainScreen,track.clone()))
        .addScreen(
          new Game(mainScreen, track.clone()).setPhysic(
            physic
          )
        );
     // this.manager.nextScreen("Loading", {});
    } catch (error) {
      console.error("Erro ao inicializar telas:", error);
      throw error;
    }
  }
}
