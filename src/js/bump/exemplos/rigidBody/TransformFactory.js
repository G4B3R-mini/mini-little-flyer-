export class TransformFactory {
  /**
   *
   * @param {IBumpTransform} instance
   */
  constructor(instance) {
    this.instance = instance;
  }
  create(mesh, physicLib) {
    this.instance.create(physicLib);
    this.instance.setIdentity();
    this.instance.setOrigin(mesh.position, physicLib);
  }
}
