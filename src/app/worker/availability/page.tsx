import Link from "next/link";
import {ArrowLeft,ArrowRight,BadgeCheck,Bell,Clock3,MapPin,Sparkles} from "lucide-react";
import {getPublicMarketData,healthLabel} from "@/lib/market-data";
import {availabilityState} from "@/lib/market-operations";

export const dynamic="force-static";
export const revalidate=300;

const stateCopy={
 available:{title:"Suitable funded work is available",body:"Review scope, pay and readiness before accepting.",action:"Browse available work",href:"/worker"},
 readiness_required:{title:"Work exists, but readiness comes first",body:"Complete the matching simulation to become eligible.",action:"Open practice library",href:"/worker"},
 temporarily_full:{title:"Current tasks are fully allocated",body:"Join the category waitlist and prepare for the next review window.",action:"Register category interest",href:"/market"},
 no_current_demand:{title:"No current funded demand in this cell",body:"Nala will not imply that paid work exists when it does not. Explore preparation pathways and register interest.",action:"Prepare for future work",href:"/worker/growth"}
} as const;

function humanise(value:string){return value.replaceAll("_"," ").replace(/\b\w/g,letter=>letter.toUpperCase())}

export default async function WorkerAvailabilityPage(){
 const {cells,products}=await getPublicMarketData();
 const cell=cells[0];
 const state=availabilityState({fundedTasks:cell?.funded_open_task_count||0,activeWorkers:cell?.active_worker_count||0,ready:true});
 const copy=stateCopy[state];
 const lastReviewed=cell?.last_reviewed_at?new Intl.DateTimeFormat("en-ZA",{dateStyle:"medium",timeStyle:"short",timeZone:"Africa/Johannesburg"}).format(new Date(cell.last_reviewed_at)):"Pilot operations review pending";

 return <main className="min-h-[100svh] overflow-x-clip bg-[#f3efe6] px-3 py-4 text-[#12211a] sm:px-5 sm:py-6 lg:px-8 lg:py-8">
  <div className="mx-auto w-full max-w-6xl">
   <Link href="/worker" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-bold shadow-sm"><ArrowLeft size={16}/>Back to worker workspace</Link>

   <header className="mt-5 overflow-hidden rounded-[24px] bg-[#0d2b20] px-5 py-7 text-white sm:rounded-[30px] sm:p-8 lg:p-10">
    <p className="text-[11px] font-black tracking-[.14em] text-[#dff09f] sm:text-xs sm:tracking-[.16em]">LIVE AVAILABILITY</p>
    <h1 className="mt-3 max-w-4xl break-words font-serif text-[2.15rem] leading-[1.05] sm:text-5xl lg:text-6xl">Know the real market status before you wait for work.</h1>
    <p className="mt-4 max-w-3xl text-sm leading-6 text-white/70 sm:text-base sm:leading-7">No sign-in is required to see the pilot cell, category preparation paths or whether funded supply currently exists.</p>
   </header>

   <section className="mt-4 rounded-[24px] border border-black/10 bg-white p-5 sm:mt-5 sm:rounded-[28px] sm:p-7 lg:p-8">
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_56px] lg:items-start">
     <div className="min-w-0">
      <span className="inline-flex max-w-full rounded-full bg-[#fff6df] px-3 py-2 text-[10px] font-black uppercase leading-4 tracking-[.1em] sm:text-xs sm:tracking-[.12em]">{healthLabel(cell?.health_band||"building_supply")}</span>
      <h2 className="mt-4 break-words text-2xl font-black leading-tight sm:text-3xl lg:text-4xl">{copy.title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-black/60 sm:text-base sm:leading-7">{copy.body}</p>
      <Link href={copy.href} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#12211a] px-5 text-sm font-black text-white">{copy.action}<ArrowRight size={16}/></Link>
     </div>
     <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#dff09f] text-[#1d513b] lg:h-14 lg:w-14"><Bell size={26}/></div>
    </div>

    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
     <article className="min-w-0 rounded-2xl bg-[#f3efe6] p-4"><MapPin/><strong className="mt-3 block break-words">{cell?.geography||"Gauteng pilot"}</strong><p className="mt-1 break-words text-sm leading-5 text-black/55">{cell?.verticals?.map(humanise).join(" · ")||"Salons · Trades"}</p></article>
     <article className="min-w-0 rounded-2xl bg-[#f3efe6] p-4"><Clock3/><strong className="mt-3 block">Last reviewed</strong><p className="mt-1 break-words text-sm leading-5 tabular-nums text-black/55">{lastReviewed}</p></article>
     <article className="min-w-0 rounded-2xl bg-[#dff09f] p-4 sm:col-span-2 lg:col-span-1"><BadgeCheck/><strong className="mt-3 block break-words">{products.length} preparation pathways</strong><p className="mt-1 text-sm leading-5 text-black/55">Payment floors and readiness expectations are public.</p></article>
    </div>
   </section>

   <section className="mt-4 grid gap-4 sm:mt-5 lg:grid-cols-2">
    {products.length?products.map(product=><article key={product.id} className="min-w-0 rounded-[22px] border border-black/10 bg-[#fffdf8] p-5 sm:rounded-[24px] sm:p-6">
     <p className="break-words text-[10px] font-black uppercase leading-4 tracking-[.1em] text-[#9a4d31] sm:text-xs sm:tracking-[.12em]">{product.category}</p>
     <h3 className="mt-2 break-words text-xl font-black leading-tight sm:text-2xl">{product.title}</h3>
     <p className="mt-3 text-sm leading-6 text-black/60">{product.outcome}</p>
     <div className="mt-4 flex items-start gap-2 text-sm font-bold leading-5 text-[#1d513b]"><Sparkles className="mt-0.5 shrink-0" size={16}/><span className="min-w-0 break-words">{product.readiness_simulation_id?"Matching readiness simulation":"Preparation guidance available"}</span></div>
    </article>):<article className="rounded-[24px] border border-black/10 bg-white p-6 lg:col-span-2"><h3 className="text-xl font-black">Preparation pathways are temporarily unavailable.</h3><p className="mt-2 text-sm leading-6 text-black/55">Nala will show them again when the live catalogue is available.</p></article>}
   </section>

   <section className="mt-4 rounded-[24px] bg-[#fff6df] p-5 sm:mt-5 sm:rounded-[28px] sm:p-6 lg:p-8">
    <h2 className="text-2xl font-black leading-tight sm:text-3xl">One meaningful next action</h2>
    <p className="mt-2 max-w-4xl text-sm leading-6 text-black/60 sm:text-base sm:leading-7">Complete your profile, select interests, practise a matching pathway, prepare your Work Passport, or register for a category review window. Nala does not use a generic “more work coming soon” message.</p>
   </section>
  </div>
 </main>;
}
