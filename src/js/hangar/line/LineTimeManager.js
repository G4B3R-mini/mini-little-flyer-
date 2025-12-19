export class LineTimeManager {
  constructor() {
    this.timeAccumulator = 0; // Armazena o tempo decorrido
    this.intervalDuration = 1; // 5000 milissegundos = 5 segundos
  }
  update(delta) {
    this.timeAccumulator += delta;
  }
  verify() {
    if (this.timeAccumulator < this.intervalDuration) return false;
    return true;
  }
  reset() {
    this.timeAccumulator -= this.intervalDuration;
  }
}