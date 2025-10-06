import { LoadGltf } from "./modules/LoadGltf.js";

export const loaders = {
  glb: {
    name: "glb",
    cls: LoadGltf
  }
};

export const models = [
  {
    cartoon: "../cartoon_plane.glb",
    type: loaders.glb.name,
    name: "cartoon"
  }
];

export const fakeEquipad = "cartoon";
