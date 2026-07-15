import {describe,expect,it} from "vitest";
import {availabilityState,canPublishTask,fairPayQuote,marketHealthBand,nextRunAt} from "./market-operations";

describe("market operations",()=>{
 it("applies capacity bands",()=>{
  expect(marketHealthBand(0,0)).toBe("building_supply");
  expect(marketHealthBand(10,100)).toBe("severe_worker_oversupply");
  expect(marketHealthBand(50,100)).toBe("developing");
  expect(marketHealthBand(100,100)).toBe("healthy");
 });
 it("keeps empty states truthful",()=>{
  expect(availabilityState({fundedTasks:0,activeWorkers:50,ready:true})).toBe("no_current_demand");
  expect(availabilityState({fundedTasks:10,activeWorkers:10,ready:false})).toBe("readiness_required");
 });
 it("includes revision, waiting and risk in fair pay",()=>{
  const quote=fairPayQuote({activeMinutes:60,revisionMinutes:15,waitingMinutes:15,hourlyFloorCents:6000,complexity:1.2,sensitive:true});
  expect(quote.workerPayCents).toBeGreaterThanOrEqual(10000);
  expect(quote.effectiveHourlyCents).toBeGreaterThanOrEqual(6000);
 });
 it("blocks publication until verification, readiness and funding",()=>{
  expect(canPublishTask({businessVerified:true,paymentReady:true,funded:true})).toBe(true);
  expect(canPublishTask({businessVerified:true,paymentReady:true,funded:false})).toBe(false);
 });
 it("schedules repeat work",()=>expect(nextRunAt(new Date("2026-07-15T00:00:00Z"),"fortnightly").toISOString()).toBe("2026-07-29T00:00:00.000Z"));
});
