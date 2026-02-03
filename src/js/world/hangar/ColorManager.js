import { IColorManager } from "./IColorManager.js";

export class ColorManager extends IColorManager {
  setColor(obj, color) {
    obj.material.color.set(color);
  }
}