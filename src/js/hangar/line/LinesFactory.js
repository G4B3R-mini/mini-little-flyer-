import {Line} from './Line.js';


export class LinesFactory {
  create(settings, group, lineEventManager) {
    for (let i = 0; i < 8; i++) {
      const line = new Line(settings).setPosition(
        0,
        -1.9,
        -10 + i * settings.Spacing
      );
      group.add(line.get());
      lineEventManager.register(line);
    }
  }
}
