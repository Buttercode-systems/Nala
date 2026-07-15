export * from "./simulations";
import {getSimulationForCategory as resolve,SIMULATIONS,type Simulation} from "./simulations";
export function getSimulationForCategory(category:string):Simulation{return resolve(category)??SIMULATIONS[0]}
