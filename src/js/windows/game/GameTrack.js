import { ColorManager } from "../../world/hangar/ColorManager.js";
import { LineEvent } from "../../world/hangar/line/LineEvent.js";
import { LinesFactory } from "../../world/hangar/line/LinesFactory.js";
import { RunwayFactory } from "../../world/hangar/runway/RunwayFactory.js";
import { TrackPlugin } from "../../world/hangar/Track.js";
import { TrackController } from "../../world/hangar/TrackController.js";
import { TrackGroup } from "../../world/hangar/TrackGroup.js";
import { TrackManager } from "../../world/hangar/TrackManager.js";
import { Position, PositionManager } from "../../threejs/position.js";
import * as THREE from "three";

export class GameTrackPlugin extends TrackPlugin {
  constructor(manager = new GameTrackManager()) {
    super(manager);
    this.manager = manager;
  }
}

export class GameTrackManager extends TrackManager {
  constructor(
    controler = new GameTrackController(),
    lineEventManager = new LineEvent(),
    columnEventManager = new LineEvent(),
    columnFactory = new ColumnFactory(),
    group = new TrackGroup(),
    runwayFactory = new RunwayFactory(),
    linesFactory = new LinesFactory()
  ) {
    super(controler, lineEventManager, group, runwayFactory, linesFactory);
    this.columnEventManager = columnEventManager;
    this.columnFactory = columnFactory;
  }

  create() {
    super.create();
    const settings = this.controler.getColumnSettings();
    this.columnFactory.create(settings, this.group, this.columnEventManager);
  }
}

export class ColumnTrack {
  /**
   *
   * @param {object} settings
   * @param {PositionManager} positionManager
   * @param {GameLineAnimation} animationManager
   * @param {ColorManager} colorManager
   */
  constructor(
    settings = {},
    positionManager = new PositionManager(),
    animationmanager = new GameLineAnimation(),
    colorManager = new ColorManager()
  ) {
    this.lineManager = new Column3D(settings);
    this.positionManager = positionManager;

    this.animationmanager = animationmanager;
    this.colorManager = colorManager;
  }
  get() {
    return this.lineManager.get();
  }
  setPosition(pos = new Position(x, y, z)) {
    this.positionManager.setPosition(this.lineManager, pos);
    return this;
  }
  setColor(color) {
    this.colorManager.setColor(this.lineManager, color);
    return this;
  }

  update(delta) {}
}

export class GameLineAnimation {
  constructor() {}
  update(delta = 0.025) {}
}

export class ColumnFactory {
  /**
   *
   * @param {object} settings
   * @param {TrackGroup} group
   * @param {LineEvent} lineEventManager
   */
  create(settings, group, lineEventManager) {
    for (let i = 0; i < settings.lines; i++) {
      const line = new ColumnTrack(settings).setPosition(
        new Position(settings.PositionX, settings.PositionY, -settings.PositionZ + i * settings.Spacing)
      );
      group.add(line.get());
      lineEventManager.register(line);
    }
  }
}
/**
 * @extends TrackController
 */
export class GameTrackController extends TrackController {
  /**
   *
   * @param {object} settings
   */
  constructor(settings = {}) {
    const column = {
      Width: 0.3,
      Height: 1.5,
      Length: 1.5,
      Spacing: 2.8,
      color: 0xffff00,
      PositionX: 0,
      PositionY: 0.1,
      PositionZ: 21.5,
      lines: 10,
      transparent: true,
      opacity: 0.05,
    };

    settings = Object.assign({ column }, settings);
    super(settings);
  }

  /**
   *
   * @returns {object} column settings
   */
  getColumnSettings() {
    return this.settings.column;
  }
}

export class Column3D {
  constructor(settings = {}) {
    const lineGeometry = new THREE.BoxGeometry(
      settings.Width,
      settings.Height,
      settings.Length
    );
    const lineMaterial = new THREE.MeshStandardMaterial({
      color: settings.color,
      transparent: settings.transparent,
      opacity: settings.opacity,
    });
    this.line = new THREE.Mesh(lineGeometry, lineMaterial);
  }
  get() {
    return this.line;
  }
}
