import { Screen } from "../screen/screen.js";
import { delay } from "../utils/delay.js";
import { LoadingSpinerElement } from "./LoadingSpinerElement.js";

export class Loading extends Screen {
  constructor(father, tag = "div", styleDisplay = "block", id="loading") {
    super({id, father, tag, styleDisplay});
    console.log(father)
    this.nameId = id
    this.spinner = new LoadingSpinerElement();
   
  }
 async create(wait = 500) {
    console.log(this.father)
    super.create();

    console.log(this.nameId)
 this.spinner.appendTo(this.nameId)

   await delay(wait);
   this.destroy()
    return this;
  }

}
