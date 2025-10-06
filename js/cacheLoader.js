import { loaders, models, fakeEquipad } from "./models.js";

export default class CacheLoader {
  constructor() {
   this.cache={}
    this.addModels();
    
  }
  addModels() {
    models.forEach(model => {
      if (model.name == fakeEquipad) {
        console.log(loaders[model.type]);
        new loaders[model.type].cls(model[fakeEquipad], (glft)=>{
         console.log(glft)
         this.cache[fakeEquipad] = glft
        });
      }
    });
  }
}
