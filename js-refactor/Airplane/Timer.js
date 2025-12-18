export class Timer {
  constructor() {
    this.time = 0;
  }
  update(delta) {
    this.time += delta;
  }
  get() {
    return this.time;
  }
}
