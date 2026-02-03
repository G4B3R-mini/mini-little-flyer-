import { ITrackManager } from "./ITrackManager.js";
import { LineEvent } from "./line/LineEvent.js";
import { LinesFactory } from "./line/LinesFactory.js";
import { RunwayFactory } from "./runway/RunwayFactory.js";
import { TrackController } from "./TrackController.js";
import { TrackGroup } from "./TrackGroup.js";

// refatorar , muita respon, acoplamento de class concreta
export class TrackManager extends ITrackManager {
  constructor(
    controler = new TrackController(),
    lineEventManager = new LineEvent(),
    group = new TrackGroup(),
    runwayFactory=new RunwayFactory(),
    linesFactory = new LinesFactory()
  ) {
    super()
    this.controler = controler;
    
    this.lineEventManager = lineEventManager;
    this.group = group;
    this.linesFactory = linesFactory;
    this.runwayFactory = runwayFactory
  }
  create() {
    const settings =this. controler.get();
    this.linesFactory.create(settings.line, this.group, this.lineEventManager);
    const runway = this.runwayFactory.create(settings.runway)
    this.group.add(runway)
  }
  update(delta) {
    this.lineEventManager.notify(delta);
  }
  get() {
    return this.group.get();
  }
}