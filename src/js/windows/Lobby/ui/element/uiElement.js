import { CreateElementHTML, Element, ElementAppendFather } from "../../../ScreenThrejs/Element";

export class UIElement extends Element {
  constructor(
    cls,
    id,
    tag = "div",
    textManager = new UIElementText(),
    appendFather = new ElementAppendFather(),
    element= new CreateElementHTML()
  ) {
    super(appendFather);
    this.textManager = textManager;
    this.el = element.create(tag);
    this.el.className = `${cls} notranslate`;
    this.el.id = id ? id : cls;
  }
  appendTo(parent) {
    super.appendTo(parent);
    return this;
  }
  getId() {
    return this.el.id;
  }
  setText(text) {
    this.textManager.setText(this.el, text);
    return this;
  }
}

export class UIElementText {
  setText(el, text) {
    el.innerHTML = text;
  }
}
