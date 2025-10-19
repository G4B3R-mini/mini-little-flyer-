export class RotationObject {
  constructor(element, callback = (x, y) => {}, sensitivity = 0.1) {
    // elemento caso queira um elemento especifico
    this.element = element;
    // senssibilidade do touch ou mouse
    this.sensitivity = sensitivity;
    // funcao callback que recebe
    this.callback = callback;
    // =========================
    // Controle de toque
    // =========================
    this.isTouching = false; // true: toque iniciado, false: toque terminado ou nunca iniciado
    this.lastTouchX = 0; // x position init
    this.lastTouchY = 0; // y position init

    // =========================
    // Adicionando eventos de toque
    // =========================
    if (element) {
      element.addEventListener("touchstart", event => {
        this.onTouchStart(event);
      });
      element.addEventListener("touchmove", event => {
        this.onTouchMove(event);
      });
      element.addEventListener("touchend", this.onTouchEnd);

      element.addEventListener("mousedown", event => {
        this.onTouchStart(event);
      });
      element.addEventListener("mousemove", event => {
        this.onTouchMove(event);
      });
      element.addEventListener("mouseup", this.onTouchEnd);
    } else {
      window.addEventListener("touchstart", event => {
        this.onTouchStart(event);
      });
      window.addEventListener("touchmove", event => {
        this.onTouchMove(event);
      });
      window.addEventListener("touchend", this.onTouchEnd);
      window.addEventListener("mousedown", event => {
        this.onTouchStart(event);
      });
      window.addEventListener("mousemove", event => {
        this.onTouchMove(event);
      });
      window.addEventListener("mouseup", this.onTouchEnd);
    }
  }
  onTouchStart(event) {
    if (event.touches.length === 1) {
      this.isTouching = true;
      this.lastTouchX = event.touches[0].clientX;
      this.lastTouchY = event.touches[0].clientY;
    }
  }
  onTouchMove(event) {
    if (!this.isTouching) return;
    if (!event.touches) return; // Evita erro
    if (event.touches.length === 0) return
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;

    // Diferença de movimento
    const deltaX = touchX - this.lastTouchX;
    const deltaY = touchY - this.lastTouchY;

    // Aplica rotação baseada no movimento
    //  cube.rotation.y += deltaX * 0.01; // rotaciona no eixo Y
    //  cube.rotation.x += deltaY * 0.01; // rotaciona no eixo X
    this.callback(deltaY * 0.01, deltaX * 0.01);

    // Atualiza posição anterior
    this.lastTouchX = touchX;
    this.lastTouchY = touchY;
  }
  onTouchEnd() {
    this.isTouching = false;
  }
}
