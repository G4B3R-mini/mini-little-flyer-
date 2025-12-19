
/**
 * observa as mudancas no hp dos player
 */
export class Life {
  constructor() {
    this.observables = [];
  }

  notify() {
    this.observables.forEach((observable) => observable.update());
  }
  setState() {}
  subcribe(observable) {
    if (!observable) throw new Error("observable not defined");

    this.observables.push(observable);
  }
}
