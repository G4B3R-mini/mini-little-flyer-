export class BumpMass {
  constructor(mass = 0) {
    this.mass = mass;
  }
  calculateLocalInertia(shape, localInertia) {
    if (this.mass > 0)
      shape.calculateLocalInertia(this.mass, localInertia.get());
  }
  get() {
    return this.mass;
  }
  isGreaterThanZero() {
    return this.mass > 0;
  }
}
