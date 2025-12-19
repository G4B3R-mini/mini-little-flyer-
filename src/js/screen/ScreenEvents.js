
/** SRP: gerencia SOMENTE eventos */
export class ScreenEvents{
    constructor(element){
this.el = element
    }
    onClick(callback){
        this.el.addEventListener("click", callback)
    }
}