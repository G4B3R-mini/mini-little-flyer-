export class IAngle {
  set(camera, angle) {
    throw new Error("method 'set' not implementad");
  }
}
export class AngleX extends IAngle {
  set(camera, angle) {
    camera.rotation.x = angle;
  }
}
export class AngleY extends IAngle {
  set(camera, angle) {
    camera.rotation.y = angle;
  }
}
export class AngleZ extends IAngle {
  set(camera, angle) {
    camera.rotation.z = angle;
  }
}
export class AngleXYZ extends IAngle {
  set(camera, angles) {
    camera.rotation.set(angles.x, angles.y, angles.z);
  }
}