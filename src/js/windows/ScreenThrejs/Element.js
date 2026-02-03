import { IElement } from "../../interfaces/IElement.js";

/** SRP: classe responsável SOMENTE pelo elemento DOM */
export class Element extends IElement {
  constructor(appendFather = new ElementAppendFather()) {
    super();
    this.el = null;
    this.appendFather = appendFather;
  }

  appendTo(fatherId) {
    this.appendFather.appendTo(fatherId, this.el);
    return this;
  }

  get() {
    return this.el;
  }
}

export class ElementAppendFather {
  appendTo(fatherId, el) {
    const parent = document.getElementById(fatherId);
    if (!parent) throw new Error(`Pai "${fatherId}" nao encontrado.`);

    parent.append(el);
  }
}

export class CreateElementHTML {
  create(tag){
    return  document.createElement(tag);
  }
}