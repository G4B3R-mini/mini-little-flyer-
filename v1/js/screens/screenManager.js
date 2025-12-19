export class ScreenManager {
  constructor() {
    this.screen = null;
    this.screens = {};
  }
  addScreen(screen) {
    console.log(screen.name)
    this.screens[screen.name] = screen;
    return this;
  }
  nextScreen(cls_screen, settings, getScreen = screen => {}) {
    const name = cls_screen.getName()
    console.log(name)
    if (!this.existis(name)) return this;
    if (this.screen) this.screen.destroy();
    this.screen = this.screens[name].create(settings);

    getScreen(this.screen);
    return this;
  }
  existis(name) {
    if (!name in this.screens) {
      return false;
    }
    return true;
  }
  getScreen(cls_screen) {
        const name = cls_screen.getName()
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
