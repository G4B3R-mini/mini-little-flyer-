export class GameListener{
constructor(){
  this.observables = []
}

notify(){
  
  for (const observable of this.observables){
    observable.update()
  }
}

subcribe(observable){
  if (!observable) throw new Error("observable not defined");
  
  this.observables.push(observable)
}
}