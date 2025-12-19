import { AirplanePlugin } from "./Airplane/Airplane.js";
import { CubePlugin } from "./cube.js";
import { TrackPlugin } from "./hangar/Track.js";
import { Loading } from "./loading/Loading.js";
import { Lobby } from "./Lobby/Lobby.js";

import { GameCamera } from "./ScreenThrejs/GameCamera .js";

import { GameScene } from "./ScreenThrejs/GameScene.js";
import { AnimationManagerParmClock, GameRendererParmClock } from "./ScreenThrejs/ParmClock.js";
import {
  GameScreen,
  ScreenThreejsGame,
} from "./ScreenThrejs/ScreenThreejsGame.js";

const father = "screens";
const loading = new Loading(father);
await loading.create(1000);
const gameScreenBase = new Lobby(
  new GameScreen("base", father),
  new GameScene(),
  new GameRendererParmClock(),
 new GameCamera(),
 new AnimationManagerParmClock()
);

gameScreenBase.create();
gameScreenBase.appendTo();
gameScreenBase.animate();
gameScreenBase.appendPlugin(new CubePlugin());
gameScreenBase.appendPlugin(new TrackPlugin());
gameScreenBase.appendPlugin(new AirplanePlugin())
window.addEventListener(
  "resize",
  (v) => {
    gameScreenBase.resizeHandler();
  },
  false
);
