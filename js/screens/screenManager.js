export class ScreenManager {
  constructor() {
    this.screen = null;
    this.screens = {};
  }
  addScreen(screen) {
    this.screens[screen.name] = screen;
    return this;
  }
  nextScreen(name, getScreen = screen => {}) {
    if (!this.existis(name)) return this;
    if (this.screen) this.screen.destroy();
    this.screen = this.screens[name].create();

    getScreen(this.screen);
    return this;
  }
  existis(name) {
    if (!name in this.screens) {
      return false;
    }
    return true;
  }
  getScreen(name) {
    if (!this.existis(name)) return;
    return this.screens[name];
  }
  destroy() {
    if (this.screen) this.screen.destroy();
  }
  screenButtonClickEvent(click = () => {}) {
    this.screen.onClick(click);
  }
}
