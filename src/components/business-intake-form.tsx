"use client";

import {FormEvent,useMemo,useState} from "react";
import {createClient} from "@supabase/supabase-js";
import {BadgeCheck,MessageCircle,ShieldCheck} from "lucide-react";
import {NALA_SUPABASE_PUBLISHABLE_KEY,NALA_SUPABASE_URL,type TaskProduct} from "@/lib/market-data";

const client=createClient(NALA_SUPABASE_URL,NALA_SUPABASE_PUBLISHABLE_KEY,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});

export function BusinessIntakeForm({products}:{products:TaskProduct[]}){
 const [status,setStatus]=useState<"idle"|"sending"|"sent"|"error">("idle");
 const [error,setError]=useState("");
 const whatsApp=useMemo(()=>"https://wa.me/?text="+encodeURIComponent("I need help packaging a recurring business task for Nala."),[]);
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();setStatus("sending");setError("");const form=new FormData(event.currentTarget);
  const payload={source:"web",contact_name:String(form.get("contact_name")||"").trim(),business_name:String(form.get("business_name")||"").trim(),contact_phone:String(form.get("contact_phone")||"").trim()||null,contact_email:String(form.get("contact_email")||"").trim()||null,geography:String(form.get("geography")||"").trim()||null,vertical:String(form.get("vertical")||"").trim()||null,requested_outcome:String(form.get("requested_outcome")||"").trim(),preferred_task_product_slug:String(form.get("preferred_task_product_slug")||"")||null,urgency:String(form.get("urgency")||"standard"),consent_to_contact:form.get("consent_to_contact")==="on"};
  const {error}=await client.from("business_intake_requests").insert(payload);
  if(error){setError(error.message);setStatus("error");return}
  event.currentTarget.reset();setStatus("sent");
 }
 return <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
  <form onSubmit={submit} className="rounded-[28px] border border-black/10 bg-white p-5 md:p-7">
   <p className="text-xs font-black tracking-[.14em] text-[#9a4d31]">STRUCTURED INTAKE</p><h2 className="mt-2 text-3xl font-black">Describe the business outcome, not a vague job.</h2>
   <div className="mt-6 grid gap-4 md:grid-cols-2">
    <Field label="Your name"><input name="contact_name" minLength={2} required/></Field><Field label="Business name"><input name="business_name" minLength={2} required/></Field>
    <Field label="Phone"><input name="contact_phone" inputMode="tel"/></Field><Field label="Email"><input name="contact_email" type="email"/></Field>
    <Field label="Area"><input name="geography" placeholder="e.g. Soweto, Gauteng"/></Field><Field label="Business type"><input name="vertical" placeholder="e.g. salon, electrical repairs"/></Field>
    <Field label="Closest task product" full><select name="preferred_task_product_slug"><option value="">Help me choose</option>{products.map(item=><option key={item.id} value={item.slug}>{item.title}</option>)}</select></Field>
    <Field label="What outcome must be completed?" full><textarea name="requested_outcome" minLength={10} required placeholder="Example: confirm tomorrow's appointments and return a list of confirmed, cancelled and owner-action items."/></Field>
    <Field label="Priority"><select name="urgency"><option value="standard">Standard</option><option value="urgent">Urgent review requested</option></select></Field>
    <label className="flex items-start gap-3 rounded-2xl bg-[#f3efe6] p-4 text-sm font-bold"><input className="mt-1" type="checkbox" name="consent_to_contact" required/><span>Nala may contact me about packaging this request. I understand this is intake, not automatic publication.</span></label>
   </div>
   <button className="mt-5 rounded-full bg-[#12211a] px-5 py-3 text-sm font-black text-white disabled:opacity-50" disabled={status==="sending"}>{status==="sending"?"Submitting…":"Submit for structured review"}</button>
   {status==="sent"&&<p className="mt-4 rounded-2xl bg-[#dff09f] p-4 text-sm font-bold">Request received. Nala will review scope, safety, inputs and fair pay before any task can be published.</p>}
   {status==="error"&&<p className="mt-4 rounded-2xl bg-[#fff6df] p-4 text-sm font-bold">Submission could not be saved: {error}</p>}
  </form>
  <aside className="space-y-4">
   <article className="rounded-[28px] bg-[#0d2b20] p-6 text-white"><ShieldCheck/><h3 className="mt-4 text-2xl font-black">Managed before marketplace.</h3><p className="mt-3 leading-7 text-white/70">Nala checks task clarity, allowed information, funding readiness, worker pay and review boundaries before publication.</p></article>
   <article className="rounded-[28px] bg-[#fff6df] p-6"><MessageCircle/><h3 className="mt-4 text-2xl font-black">Start through WhatsApp.</h3><p className="mt-3 text-sm leading-6 text-black/60">Use WhatsApp for familiar lead intake, then move structured details and execution into Nala.</p><a href={whatsApp} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full bg-white px-4 py-3 text-sm font-black">Open WhatsApp intake</a></article>
   <article className="rounded-[28px] border border-black/10 bg-white p-6"><BadgeCheck/><h3 className="mt-4 text-xl font-black">No account required to submit interest.</h3><p className="mt-2 text-sm leading-6 text-black/55">Sign-in is only introduced when a verified business needs a private workspace or live task action.</p></article>
  </aside>
 </div>
}

function Field({label,full=false,children}:{label:string;full?:boolean;children:React.ReactNode}){return <label className={`grid gap-2 text-sm font-bold ${full?"md:col-span-2":""}`}><span>{label}</span><span className="[&>input]:w-full [&>input]:rounded-2xl [&>input]:border [&>input]:border-black/10 [&>input]:bg-[#fffdf8] [&>input]:p-3 [&>select]:w-full [&>select]:rounded-2xl [&>select]:border [&>select]:border-black/10 [&>select]:bg-[#fffdf8] [&>select]:p-3 [&>textarea]:min-h-32 [&>textarea]:w-full [&>textarea]:rounded-2xl [&>textarea]:border [&>textarea]:border-black/10 [&>textarea]:bg-[#fffdf8] [&>textarea]:p-3">{children}</span></label>}
