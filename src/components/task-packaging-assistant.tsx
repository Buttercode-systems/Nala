"use client";

import {useMemo,useState} from "react";
import {AlertTriangle,ArrowRight,BadgeCheck,CircleDollarSign,ClipboardCheck,ShieldCheck,Sparkles} from "lucide-react";
import type {TaskProduct} from "@/lib/market-data";
import {formatRand} from "@/lib/market-data";
import {packageBusinessNeed} from "@/lib/task-packaging";

export function TaskPackagingAssistant({products}:{products:TaskProduct[]}){
 const [requestedOutcome,setRequestedOutcome]=useState("");
 const [businessType,setBusinessType]=useState("");
 const [urgency,setUrgency]=useState<"standard"|"urgent">("standard");
 const [sensitive,setSensitive]=useState(false);
 const [customerContact,setCustomerContact]=useState(false);
 const [hourlyFloor,setHourlyFloor]=useState(6000);
 const result=useMemo(()=>packageBusinessNeed({requestedOutcome,businessType,urgency,containsSensitiveData:sensitive,customerContactRequired:customerContact,hourlyFloorCents:hourlyFloor},products),[requestedOutcome,businessType,urgency,sensitive,customerContact,hourlyFloor,products]);
 return <div className="grid gap-5 lg:grid-cols-[1.05fr_.95fr]">
  <section className="rounded-[28px] border border-black/10 bg-white p-5 md:p-7">
   <p className="text-xs font-black tracking-[.14em] text-[#9a4d31]">TASK PACKAGING ASSISTANT</p>
   <h2 className="mt-2 text-3xl font-black">Turn a vague need into a controlled outcome.</h2>
   <p className="mt-3 text-sm leading-6 text-black/60">This rule-based first version recommends an approved task product, required inputs, safety boundaries and a fair-pay floor. It never publishes work automatically.</p>
   <div className="mt-6 grid gap-4">
    <label className="grid gap-2 text-sm font-bold">What outcome do you need?<textarea className="min-h-32 rounded-2xl border border-black/10 bg-[#fffdf8] p-3" value={requestedOutcome} onChange={e=>setRequestedOutcome(e.target.value)} placeholder="Example: confirm tomorrow's appointments and return confirmed, cancelled and owner-action lists."/></label>
    <div className="grid gap-4 md:grid-cols-2"><label className="grid gap-2 text-sm font-bold">Business type<input className="rounded-2xl border border-black/10 bg-[#fffdf8] p-3" value={businessType} onChange={e=>setBusinessType(e.target.value)} placeholder="e.g. salon, repair business, retailer"/></label><label className="grid gap-2 text-sm font-bold">Hourly policy floor (R)<input className="rounded-2xl border border-black/10 bg-[#fffdf8] p-3" type="number" min="40" value={hourlyFloor/100} onChange={e=>setHourlyFloor(Math.max(4000,Number(e.target.value||60)*100))}/></label></div>
    <div className="grid gap-3 rounded-2xl bg-[#f3efe6] p-4 text-sm font-bold sm:grid-cols-3"><label><input className="mr-2" type="checkbox" checked={sensitive} onChange={e=>setSensitive(e.target.checked)}/>Sensitive information</label><label><input className="mr-2" type="checkbox" checked={customerContact} onChange={e=>setCustomerContact(e.target.checked)}/>Customer contact</label><label>Priority<select className="ml-2 rounded-xl border border-black/10 bg-white p-2" value={urgency} onChange={e=>setUrgency(e.target.value as "standard"|"urgent")}><option value="standard">Standard</option><option value="urgent">Urgent</option></select></label></div>
   </div>
  </section>
  <aside className="space-y-4">
   <article className="rounded-[28px] bg-[#0d2b20] p-6 text-white"><div className="flex items-center justify-between gap-3"><span className="text-xs font-black tracking-[.14em] text-[#dff09f]">RECOMMENDED PACKAGE</span><span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black">{result.confidence} confidence</span></div><Sparkles className="mt-5"/><h3 className="mt-3 text-2xl font-black">{result.selectedProduct?.title||"Operator review required"}</h3><p className="mt-3 text-sm leading-6 text-white/70">{result.scopeSummary}</p>{result.recommendedWorkerPayCents!==null&&<div className="mt-5 rounded-2xl bg-[#dff09f] p-4 text-[#12211a]"><CircleDollarSign/><small className="mt-2 block font-black">RECOMMENDED WORKER PAY FLOOR</small><strong className="mt-1 block text-2xl">{formatRand(result.recommendedWorkerPayCents)}</strong></div>}</article>
   <article className="rounded-[24px] border border-black/10 bg-white p-5"><div className="flex items-center gap-2"><ClipboardCheck size={18}/><h3 className="font-black">Required inputs</h3></div><ul className="mt-3 space-y-2 text-sm text-black/60">{result.missingInputs.length?result.missingInputs.map(item=><li key={item}>• {item}</li>):<li>• Add more detail to receive a complete input checklist.</li>}</ul></article>
   <article className={`rounded-[24px] p-5 ${result.safetyFlags.length?"bg-[#fff6df]":"bg-[#dff09f]"}`}><div className="flex items-center gap-2">{result.safetyFlags.length?<AlertTriangle size={18}/>:<ShieldCheck size={18}/>}<h3 className="font-black">{result.safetyFlags.length?"Safety review needed":"No obvious prohibited-work signal"}</h3></div>{result.safetyFlags.length?<ul className="mt-3 space-y-2 text-sm">{result.safetyFlags.map(flag=><li key={flag}>• {flag}</li>)}</ul>:<p className="mt-2 text-sm">A human still reviews scope, data access, funding and evidence before publication.</p>}</article>
   <a href="/business/intake" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#12211a] px-5 text-sm font-black text-white">Submit this need for review <ArrowRight size={16}/></a>
  </aside>
 </div>;
}
