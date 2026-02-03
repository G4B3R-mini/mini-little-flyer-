import { Runway } from "./Runway.js";

export class RunwayFactory{
  runway = null
  create(settings){
const runway = new Runway(settings);
this.runway = runway
return runway.get()
  }
}