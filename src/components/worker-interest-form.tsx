"use client";

import {FormEvent,useMemo,useState} from "react";
import {Bell,CheckCircle2,MessageCircle} from "lucide-react";
import {publicSupabase} from "@/lib/supabase/public-client";

const CATEGORY_OPTIONS=[
 "Customer support",
 "Sales administration",
 "Data administration",
 "Digital content support",
 "E-commerce catalogue support",
 "Basic technology support",
 "Retail and stock operations",
];

export function WorkerInterestForm({marketCellSlug}:{marketCellSlug?:string}){
 const [selected,setSelected]=useState<string[]>([]);
 const [status,setStatus]=useState<"idle"|"sending"|"sent"|"error">("idle");
 const [error,setError]=useState("");
 const whatsApp=useMemo(()=>"https://wa.me/?text="+encodeURIComponent("I want to register my work-category interest with Nala."),[]);
 function toggle(category:string){setSelected(current=>current.includes(category)?current.filter(item=>item!==category):current.length<5?[...current,category]:current)}
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();setStatus("sending");setError("");const form=new FormData(event.currentTarget);
  const payload={display_name:String(form.get("display_name")||"").trim(),contact_phone:String(form.get("contact_phone")||"").trim()||null,contact_email:String(form.get("contact_email")||"").trim()||null,geography:String(form.get("geography")||"").trim(),interested_categories:selected,preferred_market_cell_slug:marketCellSlug||null,consent_to_contact:form.get("consent_to_contact")==="on",source:"web"};
  const {error}=await publicSupabase.from("worker_interest_requests").insert(payload);
  if(error){setError(error.message);setStatus("error");return}
  event.currentTarget.reset();setSelected([]);setStatus("sent");
 }
 return <section className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
  <form onSubmit={submit} className="rounded-[28px] border border-black/10 bg-white p-5 sm:p-7">
   <p className="text-[10px] font-black uppercase tracking-[.14em] text-[#9a4d31]">CATEGORY INTEREST</p>
   <h2 className="mt-2 text-2xl font-black sm:text-3xl">Register interest without creating an account.</h2>
   <p className="mt-2 text-sm leading-6 text-black/60">This records demand for planning and cohort invitations. It does not promise a task or create a worker profile.</p>
   <div className="mt-5 grid gap-3 sm:grid-cols-2">
    <Field label="Your name"><input name="display_name" minLength={2} required/></Field>
    <Field label="Area"><input name="geography" minLength={2} placeholder="e.g. Soweto, Gauteng" required/></Field>
    <Field label="Phone"><input name="contact_phone" inputMode="tel"/></Field>
    <Field label="Email"><input name="contact_email" type="email"/></Field>
   </div>
   <fieldset className="mt-5"><legend className="text-sm font-black">Which pathways interest you? Choose up to five.</legend><div className="mt-3 flex flex-wrap gap-2">{CATEGORY_OPTIONS.map(category=><button type="button" key={category} onClick={()=>toggle(category)} className={`rounded-full border px-3 py-2 text-xs font-black ${selected.includes(category)?"border-[#1d513b] bg-[#dff09f] text-[#1d513b]":"border-black/10 bg-[#fffdf8]"}`}>{selected.includes(category)?"✓ ":""}{category}</button>)}</div></fieldset>
   <label className="mt-5 flex items-start gap-3 rounded-2xl bg-[#f3efe6] p-4 text-sm font-bold"><input className="mt-1" type="checkbox" name="consent_to_contact" required/><span>Nala may contact me about a suitable cohort or review window. I understand that registration is not guaranteed work.</span></label>
   <button disabled={status==="sending"||selected.length===0} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#12211a] px-5 text-sm font-black text-white disabled:opacity-40"><Bell size={16}/>{status==="sending"?"Saving interest…":"Register category interest"}</button>
   {status==="sent"&&<p className="mt-4 flex items-start gap-2 rounded-2xl bg-[#dff09f] p-4 text-sm font-bold"><CheckCircle2 className="shrink-0" size={18}/>Interest recorded. Nala will only contact you when a relevant controlled opportunity or cohort exists.</p>}
   {status==="error"&&<p className="mt-4 rounded-2xl bg-[#fff6df] p-4 text-sm font-bold">We could not save this interest: {error}</p>}
  </form>
  <aside className="rounded-[28px] bg-[#0d2b20] p-6 text-white"><MessageCircle size={26}/><h3 className="mt-4 text-2xl font-black">Prefer WhatsApp?</h3><p className="mt-3 text-sm leading-6 text-white/70">Use WhatsApp to start the conversation. Nala still records structured category and location information before placing anyone into a cohort.</p><a href={whatsApp} target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-full bg-[#dff09f] px-4 py-3 text-sm font-black text-[#1d513b]">Open WhatsApp</a><div className="mt-6 rounded-2xl bg-white/10 p-4 text-sm leading-6 text-white/70"><strong className="block text-white">Browse-first rule</strong>No login is forced for market status, task pathways or interest registration. Live task actions require a verified account.</div></aside>
 </section>;
}

function Field({label,children}:{label:string;children:React.ReactNode}){return <label className="grid gap-2 text-sm font-bold"><span>{label}</span><span className="[&>input]:w-full [&>input]:rounded-2xl [&>input]:border [&>input]:border-black/10 [&>input]:bg-[#fffdf8] [&>input]:p-3">{children}</span></label>}
