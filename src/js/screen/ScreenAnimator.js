/** SRP: classe responsável SOMENTE por animações */
export class ScreenAnimator {
  constructor(elememt, duration = 500) {
    this.el = elememt;
    this.duration = duration;

    this.el.style.transition = `opacity ${duration}ms ease-in-out`;
    this.el.style.opacity = 0;
  }
  show(display) {
    this.el.style.display = display;
    void this.el.offsetHeight;
    this.el.style.opacity = 1;
  }

  hide() {
    this.el.style.opacity = 0;
    return new Promise((resolve) =>
      setTimeout(() => {
        this.el.style.display = "none";
        resolve();
      }, this.duration)
    );
  }
}
