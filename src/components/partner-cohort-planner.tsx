"use client";

import {useMemo,useState} from "react";
import {AlertTriangle,BadgeCheck,BriefcaseBusiness,Building2,Target,UsersRound} from "lucide-react";

export function PartnerCohortPlanner({fundedTasks,activeWorkers,verifiedBusinesses,taskProducts}:{fundedTasks:number;activeWorkers:number;verifiedBusinesses:number;taskProducts:number}){
 const [workerTarget,setWorkerTarget]=useState(50);
 const [businessTarget,setBusinessTarget]=useState(10);
 const [fundedTaskTarget,setFundedTaskTarget]=useState(50);
 const assessment=useMemo(()=>{
  const taskCoverage=workerTarget?fundedTaskTarget/workerTarget:0;
  const businessCoverage=businessTarget?fundedTaskTarget/businessTarget:0;
  const ready=taskCoverage>=.5&&businessCoverage>=3&&taskProducts>=3;
  return {taskCoverage,businessCoverage,ready};
 },[workerTarget,businessTarget,fundedTaskTarget,taskProducts]);
 return <div className="grid gap-5 lg:grid-cols-[1.05fr_.95fr]">
  <section className="rounded-[28px] border border-black/10 bg-white p-5 md:p-7"><p className="text-xs font-black tracking-[.14em] text-[#9a4d31]">COHORT CAPACITY PLANNER</p><h2 className="mt-2 text-3xl font-black">Size distribution to funded work—not registrations.</h2><p className="mt-3 text-sm leading-6 text-black/60">Set a proposed controlled cohort. Nala checks task coverage, business concentration and task-product breadth before recommending launch.</p><div className="mt-6 grid gap-4 sm:grid-cols-3"><Field label="Worker target" value={workerTarget} onChange={setWorkerTarget}/><Field label="Business target" value={businessTarget} onChange={setBusinessTarget}/><Field label="Funded task target" value={fundedTaskTarget} onChange={setFundedTaskTarget}/></div><div className="mt-6 grid gap-3 sm:grid-cols-2"><Metric icon={UsersRound} label="Funded tasks per worker" value={assessment.taskCoverage.toFixed(2)}/><Metric icon={Building2} label="Tasks per business" value={assessment.businessCoverage.toFixed(1)}/></div></section>
  <aside className="space-y-4"><article className={`rounded-[28px] p-6 ${assessment.ready?"bg-[#dff09f]":"bg-[#fff6df]"}`}>{assessment.ready?<BadgeCheck/>:<AlertTriangle/>}<h3 className="mt-4 text-2xl font-black">{assessment.ready?"Controlled pilot shape is credible":"Strengthen demand before launch"}</h3><p className="mt-3 text-sm leading-6 text-black/65">{assessment.ready?"The proposed cohort has enough funded-task coverage and task-family breadth for a controlled launch. Continue manual review and fair-pay checks.":"Increase funded task commitments, reduce the worker cohort, or recruit more repeat businesses before distribution."}</p></article><article className="rounded-[28px] bg-[#0d2b20] p-6 text-white"><p className="text-xs font-black tracking-[.14em] text-[#dff09f]">CURRENT LIVE FOUNDATION</p><div className="mt-5 grid grid-cols-2 gap-3"><LiveStat icon={BriefcaseBusiness} label="Funded open tasks" value={fundedTasks}/><LiveStat icon={UsersRound} label="Active workers" value={activeWorkers}/><LiveStat icon={Building2} label="Verified businesses" value={verifiedBusinesses}/><LiveStat icon={Target} label="Task products" value={taskProducts}/></div></article></aside>
 </div>;
}

function Field({label,value,onChange}:{label:string;value:number;onChange:(value:number)=>void}){return <label className="grid gap-2 text-sm font-bold">{label}<input className="rounded-2xl border border-black/10 bg-[#fffdf8] p-3" type="number" min="1" value={value} onChange={e=>onChange(Math.max(1,Number(e.target.value)||1))}/></label>}
function Metric({icon:Icon,label,value}:{icon:any;label:string;value:string}){return <article className="rounded-2xl bg-[#f3efe6] p-4"><Icon size={18}/><strong className="mt-3 block text-2xl">{value}</strong><span className="text-xs font-bold text-black/50">{label}</span></article>}
function LiveStat({icon:Icon,label,value}:{icon:any;label:string;value:number}){return <div className="rounded-2xl bg-white/10 p-4"><Icon size={17}/><strong className="mt-2 block text-xl">{value}</strong><span className="text-[10px] font-bold text-white/55">{label}</span></div>}
