let log = true;

export class Base {
  constructor(tag=" ") {
   this.tag = tag
  }
  log(str) {
    if (log) console.log(this.tag,str);
  }
}
