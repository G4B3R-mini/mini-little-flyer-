import { Screen } from "./screen-02.js";

export class Loading extends Screen {
    constructor(nameId, father, tag = "div", styleDisplay = "block") {
        super(nameId, father, tag, styleDisplay);
        this.__addLoader();
    }
    __addLoader() {
        const child = document.createElement("div");
        child.classList.add("loader");
        this.screen.appendChild(child);
         this.__addStyles(child);
    }
    __addStyles(element) {
        element.style.position = "absolute";
        element.style.left = "50%";
        element.style.top = "50%";
        element.style.transform = "translate(-50%,-50%)";
    }
}
