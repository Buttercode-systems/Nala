import Link from "next/link";
import {ArrowLeft} from "lucide-react";
import {BusinessIntakeForm} from "@/components/business-intake-form";
import {getPublicMarketData} from "@/lib/market-data";

export const dynamic="force-dynamic";

export default async function BusinessIntakePage(){const {products}=await getPublicMarketData();return <main className="min-h-screen bg-[#f3efe6] px-4 py-5 text-[#12211a] md:px-8 md:py-8"><div className="mx-auto max-w-6xl"><Link href="/business" className="inline-flex items-center gap-2 text-sm font-bold"><ArrowLeft size={16}/>Back to business workspace</Link><header className="mt-7 rounded-[30px] bg-[#fffdf8] p-6 md:p-10"><p className="text-xs font-black tracking-[.16em] text-[#9a4d31]">BUSINESS TASK INTAKE</p><h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight md:text-6xl">Turn neglected business work into a clear, fair task.</h1><p className="mt-4 max-w-3xl leading-7 text-black/60">Submit the outcome publicly without creating an account. Nala reviews scope, safety, payment readiness and evidence requirements before anything can reach workers.</p></header><section className="mt-6"><BusinessIntakeForm products={products}/></section></div></main>}
