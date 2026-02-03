
/**
 * observa as mudancas no hp dos player
 */
export class Life {
  constructor() {
    this.observables = [];
  }

  notify() {
    for (const observable of this.observables) {
      observable.update();
    }
  }
  setState() {}
  subcribe(observable) {
    if (!observable) throw new Error("observable not defined");

    this.observables.push(observable);
  }
}
