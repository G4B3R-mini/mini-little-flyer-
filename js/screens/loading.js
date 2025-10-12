// Importa a classe base
import { Screen } from "./screen-02.js";

export class Loading extends Screen {
  constructor(father, tag = "div", styleDisplay = "block") {
    super("loading", father, tag, styleDisplay);
    this.__addLoader();
    this.__addStyles();
  }

  __addLoader() {
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "50%";
    container.style.top = "50%";
    container.style.transform = "translate(-50%, -50%)";

    const spinner = document.createElement("div");
    spinner.classList.add("loader");

    container.appendChild(spinner);
    this.screen.appendChild(container);
}

  __addStyles() {
    this.screen.style.display = "flex";
    this.screen.style.justifyContent = "center";
    this.screen.style.alignItems = "center";
  }
}
