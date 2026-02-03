
import { UIElement } from "./uiElement";

export class TitleElement extends UIElement {
  constructor(title, cls = "ui-title", tag = "h1") {
    super(cls, null, tag);
    this.el.innerHTML = title;
  }

}
