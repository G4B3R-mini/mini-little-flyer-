let log = true;

export class Base {
  constructor() {}
  log(str) {
    if (log) console.log(str);
  }
}
