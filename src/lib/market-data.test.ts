import {describe,expect,it} from "vitest";
import {formatRand,healthLabel} from "./market-data";

describe("market data helpers",()=>{
 it("formats worker pay in rand",()=>expect(formatRand(15000)).toContain("150"));
 it("labels capacity states without pretending work exists",()=>{
  expect(healthLabel("building_supply")).toBe("Building task supply");
  expect(healthLabel("thin_demand")).toBe("Limited task supply");
  expect(healthLabel("severe_worker_oversupply")).toBe("Worker intake paused");
 });
});
