import { IPlugin } from "../ScreenThrejs/IPlugin.js";

export class SmoothAnimationPlugin extends IPlugin{
  constructor(){
    super([])
  }
  update(camera, time){
    console.log("SmoothAnimation", time);
         camera.setPositionY(2 + Math.sin(time * 0.5) * 0.3);
      camera.lookAt(0, 0, 0);
  }

}