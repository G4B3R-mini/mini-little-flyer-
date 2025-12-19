import { Element } from "../ScreenThrejs/Element.js";

/** SRP: classe responsável SOMENTE pelo elemento DOM */
export class ScreenElement extends Element {
  constructor(tag, nameId, defaltDisplay = "block") {
    super();
    this.el = document.createElement(tag);
    this.el.id = nameId;
    this.defaltDisplay = defaltDisplay;
  }

  appendTo(fatherId) {
    super.appendTo(fatherId);
  }
  get() {
    return super.get();
  }

  setContent(content) {
    if (typeof content === "string") this.el.innerHTML = content;
    else if (content instanceof HTMLElement) this.el.append(content);
  }

  addClass(...cls) {
    this.el.classList.add(...cls);
  }
}
