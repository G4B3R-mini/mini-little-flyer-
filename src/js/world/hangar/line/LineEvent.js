
export class LineEvent {
  constructor() {
    this.lines = [];
  }
  register(line) {
    this.lines.push(line);
  }
  notify(delta) {;
    for (const line of this.lines) {
      line.update(delta);
    }
  }
}