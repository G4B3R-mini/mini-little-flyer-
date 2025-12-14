import { IElement } from "../interfaces/IElement.js";

/** SRP: classe responsável SOMENTE pelo elemento DOM */
export class Element extends IElement{
    
  constructor() {
    super()
    this.el =null

  }

  appendTo(fatherId) {
    console.log(fatherId)
    const parent = document.getElementById(fatherId);
    if (!parent) throw new Error(`Pai "${fatherId}" nao encontrado.`);
    console.log(parent)
    parent.append(this.el);
  }

  get() {
    return this.el;
  }

}