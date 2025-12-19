import { ITrackManager } from "./ITrackManager.js";
import { LineEvent } from "./line/LineEvent.js";
import { LinesFactory } from "./line/LinesFactory.js";
import { RubwayFactory } from "./rubway/RubwayFactory.js";
import { TrackControler } from "./TrackControler.js";
import { TrackGroup } from "./TrackGroup.js";

// refatorar , muita respon, acoplamento de class concreta
export class TrackManager extends ITrackManager {
  constructor(
    controler = new TrackControler(),
    lineEventManager = new LineEvent(),
    group = new TrackGroup(),
    runwayFactory=new RubwayFactory(),
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