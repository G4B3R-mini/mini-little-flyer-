
import { UIElement } from "./uiElement";

export class SubTítuloElement extends UIElement {
  constructor(subTitle, cls = "ui-subtitle", tag = "p") {
    super(cls, null, tag);
    this.el.innerHTML = subTitle;
  }

}
