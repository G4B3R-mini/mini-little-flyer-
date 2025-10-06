export class Screen {
  constructor(nameId, father, tag = "div", styleDisplay = "block") {
    this.father = father;
    this.screen = document.createElement(tag);
    this.styleDisplay = styleDisplay;
    this.screen.id = nameId;
    this.addStyle()
    // this.display("none");
  }
  addStyle() {
    this.getElement().style.transition = "opacity 0.5s ease-in-out";
  }
  display(state = "none") {
    this.getElement().style.display = state;
    return this;
  }
  create() {
    document.getElementById(this.father).appendChild(this.getElement());
    return this;
  }
  destroy() {
    this.getElement().style.opacity = 0;
    setTimeout(() => {
      this.getElement().remove();
    }, 3000);
    return this;
  }
}
