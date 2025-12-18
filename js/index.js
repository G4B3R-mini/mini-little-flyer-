import Setup from "./setup.js";
import CacheLoader from "./cacheLoader.js";
import { fakeEquipad } from "./models.js";
import Phisic from "./core/physical-core.js";
import { SetupCache } from "./Setup/SetupCache.js";

let cls_cache = null;
const libs = {
  physic: await Phisic.create(),
};

const system = {
  conteiner: "screens",
  libs: libs,
};
console.log("init");

const setupCache = new SetupCache(
  2000,
  () => {
    cls_cache = new CacheLoader();
    console.log("loading", cls_cache.cache.length + 1);
    // lobby.addToScene(cls_cache[fakeEquipad].scene);
  },
  (lobby, game) => {
  
for (const [key, value] of Object.entries(cls_cache.cache)) {
  console.log(key, value);
}

    const airplane = cls_cache.cache[fakeEquipad].scene;
    airplane.position.z = 3;
    lobby.setAirplane(airplane.clone());
    game.setAirplane(airplane.clone());
  }
);


const setup = new Setup(setupCache, system);
