import Setup from "./setup.js";
import CacheLoader from "./cacheLoader.js";
import { fakeEquipad } from "./models.js";
import Phisic from "./core/physical-core.js";

const libs = {
  physic: 
  await Phisic.create()
};

const system = {
  conteiner: "screens",
  libs: libs
};
console.log("init");
let cls_cache = null;
const setup = new Setup(
  system,
  () => {
    cls_cache = new CacheLoader();
    console.log("loading", cls_cache[fakeEquipad]);
    // lobby.addToScene(cls_cache[fakeEquipad].scene);
  },
  (lobby, game) => {
    console.log(cls_cache.cache["cartoon"]);
    const airplane = cls_cache.cache[fakeEquipad].scene;
    airplane.position.z = 3;
    lobby.setAirplane(airplane.clone());
    game.setAirplane(airplane.clone());
  }
);
