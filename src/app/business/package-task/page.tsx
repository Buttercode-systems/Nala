import Link from "next/link";
import {ArrowLeft} from "lucide-react";
import {TaskPackagingAssistant} from "@/components/task-packaging-assistant";
import {getPublicMarketData} from "@/lib/market-data";

export const dynamic="force-dynamic";

export default async function PackageTaskPage(){
 const {products}=await getPublicMarketData();
 return <main className="min-h-screen bg-[#f3efe6] px-4 py-5 text-[#12211a] md:px-8 md:py-8"><div className="mx-auto max-w-6xl">
  <Link href="/business" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-bold"><ArrowLeft size={16}/>Back to business workspace</Link>
  <header className="mt-7 rounded-[30px] bg-[#fffdf8] p-6 md:p-10"><p className="text-xs font-black tracking-[.16em] text-[#9a4d31]">STRUCTURED TASK SUPPLY</p><h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight md:text-6xl">Package the work before asking someone to do it.</h1><p className="mt-4 max-w-3xl leading-7 text-black/60">Nala maps a business outcome to an approved task product, fair-pay floor, input checklist and safety review. This assistant is advisory and cannot publish or fund a task.</p></header>
  <section className="mt-6"><TaskPackagingAssistant products={products}/></section>
 </div></main>;
}
