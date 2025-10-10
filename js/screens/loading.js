
// Importa a classe base
import { Screen } from "./screen-02.js";

export class Loading extends Screen {
  constructor(nameId, father, tag = "div", styleDisplay = "block") {
    super("loading", father, tag, styleDisplay);
    this.__addLoader();
  }

  __addLoader() {
    // Cria o container centralizador
    const container = document.createElement("div");
    container.classList.add("loading-container");

    // Cria o loader
    const loader = document.createElement("div");
    loader.classList.add("loader");

    container.appendChild(loader);
    this.screen.appendChild(container);
  }

  __addStyles() {
    this.screen.style.display = "flex";
    this.screen.style.justifyContent = "center";
    this.screen.style.alignItems = "center";
  }
}
