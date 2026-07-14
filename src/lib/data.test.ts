import {describe,expect,it} from "vitest";
import {tasks} from "./data";
describe("starter task catalogue",()=>{it("contains transparent positive payments",()=>{expect(tasks.length).toBeGreaterThan(0);expect(tasks.every(task=>task.payment>0)).toBe(true)})});
