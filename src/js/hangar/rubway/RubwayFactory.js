import { Rubway } from "./Rubway.js";

export class RubwayFactory{
  create(settings){
const runway = new Rubway(settings);
console.log(runway)
return runway.get()
  }
}