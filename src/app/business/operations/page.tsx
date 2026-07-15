import Link from "next/link";
import {ArrowLeft} from "lucide-react";
import {BusinessOperationsPlanner} from "@/components/business-operations-planner";
import {getPublicMarketData} from "@/lib/market-data";

export const dynamic="force-dynamic";

export default async function BusinessOperationsPage(){
 const {products}=await getPublicMarketData();
 return <main className="min-h-screen bg-[#f3efe6] px-4 py-5 text-[#12211a] md:px-8 md:py-8"><div className="mx-auto max-w-6xl">
  <Link href="/business" className="inline-flex items-center gap-2 text-sm font-bold"><ArrowLeft size={16}/>Back to business workspace</Link>
  <header className="mt-7 rounded-[30px] bg-[#fffdf8] p-6 md:p-10"><p className="text-xs font-black tracking-[.16em] text-[#9a4d31]">MANAGED WORK NETWORK</p><h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight md:text-6xl">Plan repeat work, fair pay and controlled publication.</h1><p className="mt-4 max-w-3xl leading-7 text-black/60">This planning workspace lets a business test a recurring task plan and see every publication gate before an account, payment or live task is required.</p></header>
  <section className="mt-6"><BusinessOperationsPlanner products={products}/></section>
 </div></main>;
}
