/** SRP: classe responsável SOMENTE pelo elemento DOM */
export class IElement {
    
  constructor() {
    this.el =null

  }

  appendTo(fatherId) {
  throw new Error("method 'appendTo' not implementad");
  }

  get() {
   throw new Error("method 'get' not implementad");
  }

}