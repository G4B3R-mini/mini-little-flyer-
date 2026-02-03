`

track move: forward, backward
vou move: forward, backward, left, right, straight



`
 
 /*export class AirplaneMove {
  constructor() {
    this.speed = 0;
    this.maxSpeed = 0.1;
    this.acceleration = 0.0005;
    this.deceleration = 0.0003;
  }
  keyDOWN(event) {

  }
  keyUP() {}

  update() {
    if (this.speed < this.maxSpeed) {
      this.speed += this.acceleration;
    } else {
      this.speed -= this.deceleration;
    }
    if (this.speed < 0) this.speed = 0;
    return this.speed;
  }
}*/


export class AirplaneMove {
  /**
   * 
   * 
   */
  constructor() {
this.speed = 7;
this.key=null;
this.keys ={
  w: 'w',
  s: 's',
  a: 'a',
  d: 'd'
}
  }
  /**
   * 
   * @param {string} key 
   */
  keyDOWN(key) {
    this.key=this.keys[key] || null;
  }
    /**
   * 
   * @param {string} key 
   */
  keyUP(key) {
    this.key = key === this.key ? null : this.key;
  }

  update(model, delta ) {
  if (this.key === this.keys.w)  model.position.z -= this.speed * delta;
  if (this.key === this.keys.s)  model.position.z += this.speed * delta;
  }
}

