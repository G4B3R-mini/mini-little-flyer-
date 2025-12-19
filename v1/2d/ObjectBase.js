export class ObjectBase {
  constructor() {
    this.pos = { x: 0, y: 0 };
  }
  create() {
    throw new Error("Method Not Implemented");
  }

  draw(color) {
    const x = this.pos.x;
    const y = this.pos.y;
    this.ctx.fillStyle = color
    this.ctx.fillRect(x, y, 1, 1);
  }
  update() {
     throw new Error("Method Not Implemented");
  }
  setPosition(x,y) {
    this.pos = {x:x, y:y}
  }
}
