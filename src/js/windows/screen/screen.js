import { ScreenAnimator } from "./ScreenAnimator.js";
import { ScreenElement } from "./ScreenElement.js";
import { ScreenEvents } from "./ScreenEvents.js";


/** DIP + OCP: classe principal usando composição */
export class Screen {
  constructor({
    id,
    father,
    tag = "div",
    display = "block",
    transition = 500,
  }) {

    this.element = new ScreenElement(tag, id, display)
    this.animator = new ScreenAnimator(this.element.get(), transition)

    this.events = new ScreenEvents(this.element.get())
    this.father = father
  }

  create(){
    this.element.appendTo(this.father)
    requestAnimationFrame(() => this.animator.show(this.element.defaltDisplay))
  }
  destroy(){
    this.animator.hide().then(()=>{
      this.element.get().remove()
    })
  }
  display(state="none"){
if (state == "none") this.animator.hide()
  else this.animator.show(state)
  }

  setContet(content) {
    this.element.setContent(content)

  }
  addClass(...cls){
    this.element.addClass(...cls)
  }
  onClick(fn){
    this.events.onClick(fn)
  }
  getElement(){
    return this.element.get()
  }
}
