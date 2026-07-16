import Link from "next/link";
import {ArrowLeft,ShieldCheck} from "lucide-react";
import {PartnerCohortPlanner} from "@/components/partner-cohort-planner";
import {getDistributionReadiness} from "@/lib/distribution-data";

export const dynamic="force-dynamic";

export default async function PartnersPage(){
 const {rows,source}=await getDistributionReadiness();
 const cell=rows[0];
 return <main className="min-h-screen bg-[#f3efe6] px-4 py-5 text-[#12211a] md:px-8 md:py-8"><div className="mx-auto max-w-6xl">
  <div className="flex flex-wrap items-center justify-between gap-3"><Link href="/" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-bold"><ArrowLeft size={16}/>Back to Nala</Link><span className="rounded-full bg-white px-3 py-2 text-xs font-black">Public readiness source · {source}</span></div>
  <header className="mt-7 rounded-[30px] bg-[#0d2b20] p-6 text-white md:p-10"><div className="flex items-center gap-3 text-[#dff09f]"><ShieldCheck/><span className="text-xs font-black tracking-[.16em]">PARTNER PROGRAMME PLANNING</span></div><h1 className="mt-4 max-w-4xl font-serif text-4xl leading-tight md:text-6xl">Build a funded cohort around real task supply.</h1><p className="mt-4 max-w-3xl leading-7 text-white/70">Partners can plan controlled worker and business cohorts using public, non-personal readiness metrics. Private participant management and live actions require an authorised account.</p></header>
  <section className="mt-6"><PartnerCohortPlanner fundedTasks={cell?.funded_open_task_count||0} activeWorkers={cell?.active_worker_count||0} verifiedBusinesses={cell?.verified_businesses||0} taskProducts={cell?.active_task_products||0}/></section>
  <section className="mt-6 grid gap-4 md:grid-cols-3"><Rule title="Demand first" body="Funded work commitments come before worker acquisition."/><Rule title="One cell at a time" body="Do not expand geography and task categories simultaneously."/><Rule title="Real reporting" body="No demo metrics are presented as participant outcomes or impact."/></section>
 </div></main>;
}

function Rule({title,body}:{title:string;body:string}){return <article className="rounded-[24px] border border-black/10 bg-[#fffdf8] p-5"><h2 className="font-black">{title}</h2><p className="mt-2 text-sm leading-6 text-black/55">{body}</p></article>}
