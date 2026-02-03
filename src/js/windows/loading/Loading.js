import { Screen } from "../screen/screen.js";
import { delay } from "../../utils/delay.js";
import { LoadingSpinerElement } from "./LoadingSpinerElement.js";

export class Loading extends Screen {
  constructor(father, tag = "div", styleDisplay = "block", id="loading") {
    super({id, father, tag, styleDisplay});

    this.nameId = id
    this.spinner = new LoadingSpinerElement();
   
  }
 async create(wait = 500) {
    super.create();

 this.spinner.appendTo(this.nameId)

   await delay(wait);
   this.destroy()
    return this;
  }

}
