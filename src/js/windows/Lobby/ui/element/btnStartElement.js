import { BtnElement } from "./BtnElement";

export class BtnStartElement extends BtnElement {
  constructor(
    text,
    cls = "ui-btn-start",
    tag = "button",

  ) {
    super(text, cls,  tag);
  }
  
}

