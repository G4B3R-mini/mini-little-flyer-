import Setup from "./setup.js";
import CacheLoader from "./cacheLoader.js";
import { fakeEquipad } from "./models.js";

const system = {
  screens: ["screens", "loading", "lobby", "and_game"]
};
console.log("int");
let cls_cache = null;
const setup = new Setup(
  system,
  lobby => {
    cls_cache = new CacheLoader();
    console.log("loading", cls_cache[fakeEquipad]);

    lobby.addToScene(cls_cache[fakeEquipad].scene);
  },
  () => {
    console.log(cls_cache[fakeEquipad].scene);
    //  this.lobby.addToScene(cls_cache[fakeEquipad].scene);
  }
);
