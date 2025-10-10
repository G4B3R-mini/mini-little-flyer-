export class ScreenManager {
  constructor() {
   this.screen = null
    this.screens = {};
  }
  addScreen(screen) {
    this.screens[screen.name] = screen;
  }
  nextScreen(name, getScreen = screen => {}) {
    if (!name in this.screens) {
      return;
    }
    this. screen = this.screens[name].show();
    
    getScreen(this.screen);
  }
}
