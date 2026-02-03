import { IElement } from "../interfaces/IElement";


/**
 * verificar o comsumo de memoria, (um listener com lista de observers ) ou (vários listeners com 1 observer cada)
 * 
 * 
 * 
 */
export class EventsManager {
  constructor(eventObservers = new EventObservers()) {
    this.eventObservers = eventObservers;
  }
  create() {

  const handler = (type) => (event) =>
    this.eventObservers.notify(type, event);

  document.addEventListener("click", handler("click"));
  document.addEventListener("mousemove", handler("mousemove"));
  document.addEventListener("keydown", handler("keydown"));
  document.addEventListener("keyup", handler("keyup"));
  window.addEventListener("resize", handler("resize"));
  return this;
}

  
  subscribe(observer) {
    this.eventObservers.subscribe(observer);
  }

}

class EventObserversMap  extends Map {
  constructor() {
    super();
  }
  addObserver(eventName, observer) {
    if (this.has(eventName)) {
      this.get(eventName).push(observer);
    } else {
      this.set(eventName, [observer]);
    }
  }
  removeObserver(eventName, observer) {
    if (this.has(eventName)) {
      const observers = this.get(eventName);
      this.set(
        eventName,
        observers.filter((obs) => obs !== observer)
      );
    }
  }
}


export class EventObservers {
  constructor() {
    this.observers = [];
    this.observersMap = new EventObserversMap();
  }
  /**
   *
   * @param {ObserverEvent} observer
   */
  subscribe(observer) {
    this.observers.push(observer);
    this.observersMap.addObserver(observer.name, observer); 
  }
  /**
   *
   * @param {ObserverEvent} observer
   */
  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
    this.observersMap.removeObserver(observer.name, observer);
  }
  /**
   *
   * @param {ObserverEvent} event
   * @param {*} data
   */
  notify(event, data) {

    for (const observer of this.observersMap.get(event) || []) {
      observer.update(event, data); 
  }
}
}
/**
 *
 */
/**
 * Represents an ObserverEvent with a name and a callback function.
 */
export class ObserverEvent {
  /**
   * Creates an ObserverEvent instance.
   * @param {string} name - The name of the ObserverEvent to listen for.
   * @param {Function} callback - The function to call when the ObserverEvent is triggered.
   */
  constructor(name, callback) {
    this.name = name;
    this.callback = callback;

  }

  /**
   * Invokes the callback if the ObserverEvent name matches.
   * @param {string} ObserverEvent - The name of the ObserverEvent to check.
   * @param {*} data - The data to pass to the callback function.
   */
  update(event, data) {
    //if (event === this.name) {
      this.callback(data);
   // }
  }
}


/**
 * 
 */
export class EventClick extends ObserverEvent {
  /**
   * 
   * @param {IElement}} element 
   * @param {Function} callback 
   */
  constructor(element,callback) {
    super("click", callback);
    this.element = element;
  }
  update(event, data) { 
    if (event === this.name && data.target === this.element.get()) {
      this.callback(data);
    }
  }
}

export class EventResize extends ObserverEvent {
  constructor(callback) {
    super("resize", callback);
  }
}

export class EventKey extends ObserverEvent {
  constructor(callback) {
    super("keydown", callback);
  }

}



export class EventKeydown extends ObserverEvent {
  constructor(callback) {
    super("keydown", callback);
  }
}

export class EventKeyUp extends ObserverEvent {
  constructor(callback) {
    super("keyup", callback);
  }
}

export class EventMousemove extends ObserverEvent {
  constructor(callback) {
    super("mousemove", callback);
  }
}

export class EventScroll extends ObserverEvent {
  constructor(callback) {
    super("scroll", callback);
  }
}

export class EventWheel extends ObserverEvent {
  constructor(callback) {
    super("wheel", callback);
  }
}