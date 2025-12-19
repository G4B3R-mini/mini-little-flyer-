class GameCore {
  constructor(track, Move) {
     this.move = new Move(0.1);
    this.track = track;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.airplane = null;
  }
    __init() {
    this.__addCanvas();
    this.__createEnvironment();
    this.__createAirplane();
  }
  __startAnimation() {
    const animate = () => {
      //this.time += 0.016;

      // Animar avião (movimento suave de voo)
      if (this.airplane) {
        this.move.updateZ(this.airplane);
      }

      this.camera.lookAt(0, 0, 0);
    };
    super.__startAnimation(animate);
  }
  __createEnvironment() {
    this.track.scene.position.z -= 10;
    this.scene.add(this.track.scene);
  }
}
