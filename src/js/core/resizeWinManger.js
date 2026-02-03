export class ResizeWinManger {
constructor(observer=new ResizeObserver()){
this.observer = observer;

}
create(){
  window.addEventListener('resize', (v)=> {this.observer.notify()}, false);
}

 register(handler){
  this.observer.register(handler)
}
}

export class ResizeWinObserver{

  constructor() {
    this.handlers = [];
  }
  notify() {
    for (const handler of this.handlers) {
      handler.update();
    }
  }
  register(handler) {
    this.handlers.push(handler);
  }
}

