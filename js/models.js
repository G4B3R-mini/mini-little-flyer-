import { LoadGltf } from "./modules/LoadGltf.js";

export const loaders = {
  glb: {
    name: "glb",
    cls: LoadGltf
  }
};
export class Model {
  constructor(
    model = {
      name: "model",
      path: "./path/filr",
      mash: "object loaded",
      type: loaders.glb.name
    },
    settings = {}
  ) {
    this.name = model.name;
    this.path = model.path;
    this.mash = model.mash;
    this.type = model.type;
    this.settings = settings
  }
}
export const models = [
  {
    cartoon: "../models/cartoon_plane.glb",
    type: loaders.glb.name,
    name: "cartoon"
  }
];

export const fakeEquipad = "cartoon";
