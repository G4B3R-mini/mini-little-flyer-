import {Line} from './Line.js';


export class LinesFactory {
  create(settings, group, lineEventManager) {
    for (let i = 0; i < settings.lines; i++) {
      const line = new Line(settings).setPosition(
        settings.PositionX,
        settings.PositionY,
        -settings.PositionZ + i * settings.Spacing
      );
      group.add(line.get());
      lineEventManager.register(line);
    }
  }
}
