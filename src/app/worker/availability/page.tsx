import Link from "next/link";
import {ArrowLeft,BadgeCheck,Bell,Clock3,MapPin,Sparkles} from "lucide-react";
import {getPublicMarketData,healthLabel} from "@/lib/market-data";
import {availabilityState} from "@/lib/market-operations";

export const dynamic="force-dynamic";

const stateCopy={
 available:{title:"Suitable funded work is available",body:"Review scope, pay and readiness before accepting.",action:"Browse available work"},
 readiness_required:{title:"Work exists, but readiness comes first",body:"Complete the matching simulation to become eligible.",action:"Open practice library"},
 temporarily_full:{title:"Current tasks are fully allocated",body:"Join the category waitlist and prepare for the next review window.",action:"Register category interest"},
 no_current_demand:{title:"No current funded demand in this cell",body:"Nala will not imply that paid work exists when it does not. Explore preparation pathways and register interest.",action:"Prepare for future work"}
} as const;

export default async function WorkerAvailabilityPage(){
 const {cells,products}=await getPublicMarketData();const cell=cells[0];
 const state=availabilityState({fundedTasks:cell?.funded_open_task_count||0,activeWorkers:cell?.active_worker_count||0,ready:true});const copy=stateCopy[state];
 return <main className="min-h-screen bg-[#f3efe6] px-4 py-5 text-[#12211a] md:px-8 md:py-8"><div className="mx-auto max-w-5xl">
  <Link href="/worker" className="inline-flex items-center gap-2 text-sm font-bold"><ArrowLeft size={16}/>Back to worker workspace</Link>
  <header className="mt-7 rounded-[30px] bg-[#0d2b20] p-6 text-white md:p-10"><p className="text-xs font-black tracking-[.16em] text-[#dff09f]">LIVE AVAILABILITY</p><h1 className="mt-3 max-w-3xl font-serif text-4xl md:text-6xl">Know the real market status before you wait for work.</h1><p className="mt-4 max-w-3xl leading-7 text-white/70">No sign-in is required to see the pilot cell, category preparation paths or whether funded supply currently exists.</p></header>
  <section className="mt-5 rounded-[28px] border border-black/10 bg-white p-6 md:p-8"><div className="flex flex-wrap items-start justify-between gap-4"><div><span className="rounded-full bg-[#fff6df] px-3 py-2 text-xs font-black uppercase tracking-[.12em]">{healthLabel(cell?.health_band||"building_supply")}</span><h2 className="mt-4 text-3xl font-black">{copy.title}</h2><p className="mt-3 max-w-2xl leading-7 text-black/60">{copy.body}</p></div><Bell className="text-[#1d513b]" size={32}/></div><div className="mt-6 grid gap-3 md:grid-cols-3"><article className="rounded-2xl bg-[#f3efe6] p-4"><MapPin/><strong className="mt-3 block">{cell?.geography||"Gauteng pilot"}</strong><p className="mt-1 text-sm text-black/55">{cell?.verticals?.join(" · ")||"Salons · Trades"}</p></article><article className="rounded-2xl bg-[#f3efe6] p-4"><Clock3/><strong className="mt-3 block">Last reviewed</strong><p className="mt-1 text-sm text-black/55">{cell?.last_reviewed_at?new Date(cell.last_reviewed_at).toLocaleString("en-ZA"):"Pilot operations review pending"}</p></article><article className="rounded-2xl bg-[#dff09f] p-4"><BadgeCheck/><strong className="mt-3 block">{products.length} preparation pathways</strong><p className="mt-1 text-sm text-black/55">Payment floors and readiness expectations are public.</p></article></div></section>
  <section className="mt-5 grid gap-4 md:grid-cols-2">{products.map(product=><article key={product.id} className="rounded-[24px] border border-black/10 bg-[#fffdf8] p-5"><p className="text-xs font-black uppercase tracking-[.12em] text-[#9a4d31]">{product.category}</p><h3 className="mt-2 text-xl font-black">{product.title}</h3><p className="mt-2 text-sm leading-6 text-black/60">{product.outcome}</p><div className="mt-4 flex items-center gap-2 text-sm font-bold text-[#1d513b]"><Sparkles size={16}/>{product.readiness_simulation_id?"Matching readiness simulation":"Preparation guidance available"}</div></article>)}</section>
  <section className="mt-5 rounded-[28px] bg-[#fff6df] p-6"><h2 className="text-2xl font-black">One meaningful next action</h2><p className="mt-2 text-black/60">Complete your profile, select interests, practise a matching pathway, prepare your Work Passport, or register for a category review window. Nala does not use a generic “more work coming soon” message.</p></section>
 </div></main>;
}
