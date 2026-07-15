export type HealthBand="building_supply"|"severe_worker_oversupply"|"thin_demand"|"developing"|"healthy"|"worker_shortage";
export type AvailabilityState="available"|"readiness_required"|"temporarily_full"|"no_current_demand";
export type Cadence="once"|"weekly"|"fortnightly"|"monthly"|"service_cycle";

export function marketHealthBand(fundedTasks:number,activeWorkers:number):HealthBand{
 if(activeWorkers<=0)return "building_supply";
 const ratio=fundedTasks/activeWorkers;
 if(ratio<0.15)return "severe_worker_oversupply";
 if(ratio<0.35)return "thin_demand";
 if(ratio<0.75)return "developing";
 if(ratio<=1.5)return "healthy";
 return "worker_shortage";
}

export function availabilityState({fundedTasks,activeWorkers,ready}:{fundedTasks:number;activeWorkers:number;ready:boolean}):AvailabilityState{
 if(!ready&&fundedTasks>0)return "readiness_required";
 const band=marketHealthBand(fundedTasks,activeWorkers);
 if(band==="healthy"||band==="worker_shortage")return "available";
 if(band==="developing")return "temporarily_full";
 return "no_current_demand";
}

export function fairPayQuote({activeMinutes,revisionMinutes=0,waitingMinutes=0,hourlyFloorCents,complexity=1,sensitive=false,urgent=false}:{activeMinutes:number;revisionMinutes?:number;waitingMinutes?:number;hourlyFloorCents:number;complexity?:number;sensitive?:boolean;urgent?:boolean}){
 const totalMinutes=Math.max(1,activeMinutes+revisionMinutes+waitingMinutes);
 const multiplier=Math.max(1,complexity)*(sensitive?1.15:1)*(urgent?1.2:1);
 const workerPayCents=Math.ceil((totalMinutes/60)*hourlyFloorCents*multiplier/100)*100;
 return {totalMinutes,multiplier:Number(multiplier.toFixed(2)),workerPayCents,effectiveHourlyCents:Math.round(workerPayCents/(totalMinutes/60))};
}

export function nextRunAt(from:Date,cadence:Cadence){
 const next=new Date(from);
 if(cadence==="weekly")next.setUTCDate(next.getUTCDate()+7);
 else if(cadence==="fortnightly")next.setUTCDate(next.getUTCDate()+14);
 else if(cadence==="monthly")next.setUTCMonth(next.getUTCMonth()+1);
 else if(cadence==="service_cycle")next.setUTCDate(next.getUTCDate()+7);
 return next;
}

export function canPublishTask({businessVerified,paymentReady,funded}:{businessVerified:boolean;paymentReady:boolean;funded:boolean}){
 return businessVerified&&paymentReady&&funded;
}
