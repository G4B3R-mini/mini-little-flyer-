import { AirplanePlugin } from "./world/Airplane/Airplane.js";
import { CubePlugin } from "./cube.js";
import {
  EventClick,
  EventObservers,
  EventResize,
  EventsManager,
} from "./events/eventsManager.js";
import { Game } from "./windows/game/Game.js";
import { TrackPlugin } from "./world/hangar/Track.js";
import { Loading } from "./windows/loading/Loading.js";
import { CloudPlugin } from "./windows/Lobby/cloud.js";
import { Lobby } from "./windows/Lobby/Lobby.js";
import { LobbyAirplanePlugin } from "./windows/Lobby/LobbyAirplane.js";
import { StarsPlugin } from "./windows/Lobby/StarPositions.js";

import { GameCamera } from "./windows/ScreenThrejs/GameCamera.js";

import { GameScene } from "./windows/ScreenThrejs/GameScene.js";
import {
  AnimationManagerParmClock,
  GameRendererParmClock,
} from "./windows/ScreenThrejs/ParmClock.js";
import {
  GameScreen,
  ScreenThreejsGame,
} from "./windows/ScreenThrejs/ScreenThreejsGame.js";
const father = "screens";

const eventsManager = new EventsManager();
eventsManager.create();

const loading = new Loading(father);
await loading.create(1000);
const lobby_Screen = new Lobby(
  new GameScreen("lobby-screen", father),
  new GameScene(),
  new GameRendererParmClock(),
  new GameCamera(),
  new AnimationManagerParmClock()
);
const game_Screen = new Game(new GameScreen("game-screen", father));

lobby_Screen.create();
lobby_Screen.appendTo();
lobby_Screen.animate();
//lobby_Screen.appendPlugin(new CubePlugin());
lobby_Screen.appendPlugin(new TrackPlugin());
lobby_Screen.appendPlugin(new LobbyAirplanePlugin());
lobby_Screen.appendPlugin(new CloudPlugin());
lobby_Screen.appendPlugin(new StarsPlugin());


eventsManager.subscribe(
  new EventClick(lobby_Screen.uiOrchestrator.getStartButton(), (v) => {
   lobby_Screen.destroy();
eventsManager.subscribe(
  new EventResize((v) => {
    game_Screen.resizeHandler();
  })
);
game_Screen.create();
game_Screen.appendTo();
game_Screen.animate();
game_Screen.appendPlugin(new AirplanePlugin());
game_Screen.appendPlugin(new TrackPlugin());
  })
);

eventsManager.subscribe(
  new EventResize((v) => {
    lobby_Screen.resizeHandler();
  })
);
