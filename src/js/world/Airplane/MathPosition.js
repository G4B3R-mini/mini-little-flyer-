/**
 * @interface IEngineAirplanePosition
 */
export class MathAnimationX {
  set(math, time) {
  return    math.sin(time, 1.2, 0.03);
  }
}
/**
 * @interface IEngineAirplanePosition 
 */
export class MathAnimationY {
  set(math, time) {
  return  math.sin(time, 2, 0.2);
  }
}
/**
 * @interface IEngineAirplanePosition
 */
export class MathAnimationZ {
  set(math, time) {
  return  math.sin(time, 1.5, 0.05);
  }
}
