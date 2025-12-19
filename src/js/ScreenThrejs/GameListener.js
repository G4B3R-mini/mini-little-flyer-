export class GameListener{
constructor(){
  this.observables = []
}

notify(){
  this.observables.forEach(observable => observable.update())
}

subcribe(observable){
  if (!observable) throw new Error("observable not defined");
  
  this.observables.push(observable)
}
}