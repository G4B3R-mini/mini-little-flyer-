import { Element } from "../../../ScreenThrejs/Element";
import { UIElement } from "./uiElement";

export class UserInfoElement extends UIElement {
  constructor(username, cls = "ui-user-info", tag = "div") {
    super(cls, null, tag);

    this.el.innerHTML = username;
  }
}
