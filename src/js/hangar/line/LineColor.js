export class LineColor {
  constructor(colors = [0xf05202, 0xffff00]) {
    this.colors = colors;
    this.indx = 0;
  }
  updateColor(setColorfn) {
    const color = this.colors[this.indx];

    setColorfn(color);
  }
  updateIndx() {
    this.indx = this.indx === 0 ? 1 : 0;
  }
  update(setColorfn) {
    this.updateColor(setColorfn);
    this.updateIndx();
  }
}