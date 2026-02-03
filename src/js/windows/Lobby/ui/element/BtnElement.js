import { UIElement } from "./uiElement";

export class BtnElement extends UIElement {
  constructor(
    text,
    cls = "ui-btn",
    tag = "button",
  ) {
    super(cls, null, tag);
    this.setText(text);
  }
  appendTo(parent) {
    super.appendTo(parent);
    return this;
  }

}
