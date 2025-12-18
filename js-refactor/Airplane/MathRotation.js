
export class MathRotationX {
  set(math, time) {
  return    math.sin(time, 1.2, 0.03);
  }
}

export class MathRotationY {
  set(math, time) {
  return  math.sin(time, 2, 0.2);
  }
}

export class MathRotationZ {
  set(math, time) {
  return  math.sin(time, 1.5, 0.05);
  }
}
