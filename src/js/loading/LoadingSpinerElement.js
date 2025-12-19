import { Element } from "../ScreenThrejs/Element.js";

export class LoadingSpinerElement extends Element {
  constructor() {
    super();

    this.createConteiner();
    this.createSpinner();
  }
  createConteiner(cls = "loader_conteiner") {
    this.el = document.createElement("div");
    this.el.classList.add(cls);
  }
  createSpinner() {
    this.spinner = document.createElement("div");
    this.spinner.classList.add("loader");
    this.el.appendChild(this.spinner);
  }
}
