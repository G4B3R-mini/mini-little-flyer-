import { LineColor } from "./LineColor.js";
import { LineTimeManager } from "./LineTimeManager.js";

export class LineAnimation {
  constructor(
    colorManager = new LineColor(),
    timeManager = new LineTimeManager()
  ) {
    this.colorManager = colorManager;
    this.timeManager = timeManager;
  }
  update(setColorfn, delta = 0.025) {
    this.timeManager.update(delta);
    if (!this.timeManager.verify()) return;
    this.timeManager.reset();
    this.colorManager.update(setColorfn);
  }
}
