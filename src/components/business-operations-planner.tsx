"use client";

import {useMemo,useState} from "react";
import {BadgeCheck,CalendarClock,CircleDollarSign,Repeat2,ShieldCheck,UsersRound} from "lucide-react";
import {canPublishTask,fairPayQuote,nextRunAt,type Cadence} from "@/lib/market-operations";

type Product={id:string;title:string;category:string;expected_active_minutes:number;expected_revision_minutes:number;minimum_worker_pay_cents:number};

export function BusinessOperationsPlanner({products}:{products:Product[]}){
 const [productId,setProductId]=useState(products[0]?.id||"");
 const [cadence,setCadence]=useState<Cadence>("once");
 const [hourlyFloor,setHourlyFloor]=useState(6000);
 const [complexity,setComplexity]=useState(1);
 const [sensitive,setSensitive]=useState(false);
 const [urgent,setUrgent]=useState(false);
 const [verified,setVerified]=useState(false);
 const [paymentReady,setPaymentReady]=useState(false);
 const [funded,setFunded]=useState(false);
 const product=products.find(item=>item.id===productId)||products[0];
 const quote=useMemo(()=>product?fairPayQuote({activeMinutes:product.expected_active_minutes,revisionMinutes:product.expected_revision_minutes,hourlyFloorCents:hourlyFloor,complexity,sensitive,urgent}):null,[product,hourlyFloor,complexity,sensitive,urgent]);
 const publishable=canPublishTask({businessVerified:verified,paymentReady,funded});
 const next=nextRunAt(new Date(),cadence);
 if(!product)return <div className="rounded-3xl bg-white p-6">No task products are currently available.</div>;
 return <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
  <section className="rounded-[28px] border border-black/10 bg-white p-5 md:p-7">
   <p className="text-xs font-black tracking-[.14em] text-[#9a4d31]">RECURRING TASK PLAN</p>
   <h2 className="mt-2 text-3xl font-black">Package repeat work before publishing.</h2>
   <div className="mt-6 grid gap-4 md:grid-cols-2">
    <label className="grid gap-2 text-sm font-bold md:col-span-2">Outcome product<select className="rounded-2xl border border-black/10 bg-[#fffdf8] p-3" value={productId} onChange={e=>setProductId(e.target.value)}>{products.map(item=><option key={item.id} value={item.id}>{item.title} · {item.category}</option>)}</select></label>
    <label className="grid gap-2 text-sm font-bold">Cadence<select className="rounded-2xl border border-black/10 bg-[#fffdf8] p-3" value={cadence} onChange={e=>setCadence(e.target.value as Cadence)}><option value="once">Once</option><option value="weekly">Weekly</option><option value="fortnightly">Fortnightly</option><option value="monthly">Monthly</option><option value="service_cycle">After each service cycle</option></select></label>
    <label className="grid gap-2 text-sm font-bold">Hourly policy floor (R)<input className="rounded-2xl border border-black/10 bg-[#fffdf8] p-3" type="number" min="40" value={hourlyFloor/100} onChange={e=>setHourlyFloor(Math.max(4000,Number(e.target.value)*100))}/></label>
    <label className="grid gap-2 text-sm font-bold">Complexity<select className="rounded-2xl border border-black/10 bg-[#fffdf8] p-3" value={complexity} onChange={e=>setComplexity(Number(e.target.value))}><option value="1">Standard</option><option value="1.15">Moderate</option><option value="1.3">High</option></select></label>
    <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-[#f3efe6] p-4 text-sm font-bold"><label><input className="mr-2" type="checkbox" checked={sensitive} onChange={e=>setSensitive(e.target.checked)}/>Sensitive-data allowance</label><label><input className="mr-2" type="checkbox" checked={urgent} onChange={e=>setUrgent(e.target.checked)}/>Urgent-work allowance</label></div>
   </div>
   <div className="mt-6 grid gap-3 md:grid-cols-3">
    <article className="rounded-2xl bg-[#f3efe6] p-4"><CalendarClock/><small className="mt-3 block font-black">NEXT RUN</small><strong className="mt-1 block">{cadence==="once"?"One-off":next.toLocaleDateString("en-ZA")}</strong></article>
    <article className="rounded-2xl bg-[#dff09f] p-4"><CircleDollarSign/><small className="mt-3 block font-black">RECOMMENDED WORKER PAY</small><strong className="mt-1 block text-2xl">R{Math.max(product.minimum_worker_pay_cents,quote?.workerPayCents||0)/100}</strong></article>
    <article className="rounded-2xl bg-[#fff6df] p-4"><Repeat2/><small className="mt-3 block font-black">REPEAT RELATIONSHIP</small><strong className="mt-1 block">Preferred worker can be invited after a verified completion.</strong></article>
   </div>
  </section>
  <aside className="rounded-[28px] bg-[#0d2b20] p-5 text-white md:p-7">
   <p className="text-xs font-black tracking-[.14em] text-[#dff09f]">PUBLICATION GATE</p><h2 className="mt-2 text-3xl font-black">No unfunded paid task reaches workers.</h2>
   <div className="mt-6 grid gap-3">
    <Gate icon={ShieldCheck} label="Business verified" value={verified} onChange={setVerified}/>
    <Gate icon={BadgeCheck} label="Payment method ready" value={paymentReady} onChange={setPaymentReady}/>
    <Gate icon={CircleDollarSign} label="Task funding confirmed" value={funded} onChange={setFunded}/>
   </div>
   <div className={`mt-6 rounded-2xl p-4 ${publishable?"bg-[#dff09f] text-[#12211a]":"bg-white/10"}`}><strong>{publishable?"Ready for controlled publication":"Publication blocked"}</strong><p className="mt-2 text-sm opacity-75">{publishable?"The task can proceed to structured review and worker allocation.":"Complete all three gates. This preview does not publish or charge anything."}</p></div>
   <div className="mt-5 flex items-start gap-3 text-sm text-white/70"><UsersRound className="mt-1 shrink-0" size={18}/><p>Rebooking and recurring plans remain transparent. Workers may accept, reject or block invitations.</p></div>
  </aside>
 </div>;
}

function Gate({icon:Icon,label,value,onChange}:{icon:any;label:string;value:boolean;onChange:(value:boolean)=>void}){return <label className="flex cursor-pointer items-center gap-3 rounded-2xl bg-white/10 p-4"><input type="checkbox" checked={value} onChange={e=>onChange(e.target.checked)}/><Icon size={18}/><span className="font-bold">{label}</span></label>}
