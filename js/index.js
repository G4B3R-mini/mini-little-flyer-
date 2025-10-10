import Setup from "./setup.js";
import CacheLoader from "./cacheLoader.js";
import { fakeEquipad } from "./models.js";

const system = {
  conteiner: "screens"
};
console.log("int");
let cls_cache = null;
const setup = new Setup(
  system,
  () => {
     cls_cache = new CacheLoader();
       console.log("loading", cls_cache[fakeEquipad]);
    // lobby.addToScene(cls_cache[fakeEquipad].scene);
  },
  lobby => {
      console.log(cls_cache.cache["cartoon"]);
       const airplane = cls_cache.cache[fakeEquipad].scene;
       airplane.position.z = 3;
     lobby.setAirplane(airplane);
  }
);
