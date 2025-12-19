
export class LineEvent {
  constructor() {
    this.lines = [];
  }
  register(line) {
    this.lines.push(line);
  }
  notify(delta) {
    this.lines.forEach((line) => line.update(delta));
  }
}