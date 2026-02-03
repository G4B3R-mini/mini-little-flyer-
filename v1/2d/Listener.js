
const keyState = {
keydown: 'keydown' ,
keyup: "keyup"
}

const keyssuporteds = {

}


export class Listener {
  constructor(document) {
    this.keyDownObservaver = {};
    this.keyUpObservaver = {};
    this.start(document)
  }

  registerKeyDown() {}

  registerKeyUp() {}
  notfy(event, keyType) {
    if (keyState.keydown == keyType) this.keyDownObservaver[event.code]()
  else  if (keyState.keydown) this.keyUpObservaver[event.code]()   
  }
  //document.
  start(document) {
    console.log(document)


  document.addEventListener("keydown",(event) => {
      this.notfy(event, keyState.keydown);
    });

document.addEventListener("keyup",  (event) => {
    console.log(event)
       this.notfy(event,keyState.keyup);
    });
  }
}
