import Link from "next/link";
import {ArrowLeft,Building2,ShieldCheck,UsersRound} from "lucide-react";
import {authenticate} from "./actions";

type Props={searchParams:Promise<{role?:string;error?:string;message?:string;next?:string;intent?:string}>};

export default async function AuthPage({searchParams}:Props){
 const params=await searchParams;
 const role=params.role==="business"?"business":"worker";
 const next=params.next?.startsWith("/")?params.next:`/${role}`;
 const intent=params.intent||"continue";
 const query=(targetRole:string)=>`/auth?role=${targetRole}&next=${encodeURIComponent(next)}&intent=${encodeURIComponent(intent)}`;
 return <main className="min-h-[100svh] bg-[#f3efe6] px-4 py-6 text-[#12211a] sm:px-6 lg:px-8">
  <div className="mx-auto max-w-5xl">
   <Link href={next} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-bold"><ArrowLeft size={16}/>Continue browsing</Link>
   <div className="mt-6 grid overflow-hidden rounded-[30px] border border-black/10 bg-white lg:grid-cols-[.9fr_1.1fr]">
    <section className="bg-[#0d2b20] p-6 text-white sm:p-9 lg:p-12">
     <p className="text-xs font-black tracking-[.16em] text-[#dff09f]">ACCOUNT REQUIRED FOR THIS ACTION</p>
     <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">Browse freely. Sign in when you choose to use Nala.</h1>
     <p className="mt-5 leading-7 text-white/70">You can keep exploring without an account. To {intent.toLowerCase()}, create an account or sign in, then return to where you were.</p>
     <div className="mt-8 space-y-3 text-sm font-bold"><p className="flex items-center gap-3"><ShieldCheck className="text-[#dff09f]"/>Secure Supabase authentication</p><p className="flex items-center gap-3"><UsersRound className="text-[#dff09f]"/>Worker progress linked to a real account</p><p className="flex items-center gap-3"><Building2 className="text-[#dff09f]"/>Business actions linked to a verified account</p></div>
    </section>
    <section className="p-6 sm:p-9 lg:p-12">
     <div className="grid grid-cols-2 gap-2 rounded-2xl bg-[#f3efe6] p-1">
      <Link href={query("worker")} className={`rounded-xl px-4 py-3 text-center text-sm font-black ${role==="worker"?"bg-white shadow-sm":""}`}>Worker</Link>
      <Link href={query("business")} className={`rounded-xl px-4 py-3 text-center text-sm font-black ${role==="business"?"bg-white shadow-sm":""}`}>Business</Link>
     </div>
     <h2 className="mt-7 text-3xl font-black">Join or sign in as a {role}.</h2>
     {params.error?<p className="mt-4 rounded-2xl bg-[#fde8e2] p-4 text-sm font-bold text-[#8b351f]">{params.error}</p>:null}
     {params.message?<p className="mt-4 rounded-2xl bg-[#eaf4df] p-4 text-sm font-bold text-[#1d513b]">{params.message}</p>:null}
     <form action={authenticate} className="mt-6 space-y-4">
      <input type="hidden" name="role" value={role}/><input type="hidden" name="next" value={next}/><input type="hidden" name="intent" value={intent}/>
      <label className="block text-sm font-bold">Name <input name="displayName" autoComplete="name" className="mt-2 w-full rounded-2xl border border-black/15 px-4 py-3 outline-none focus:border-[#1d513b]" placeholder={role==="business"?"Business or owner name":"Your name"}/></label>
      <label className="block text-sm font-bold">Email <input required name="email" type="email" autoComplete="email" className="mt-2 w-full rounded-2xl border border-black/15 px-4 py-3 outline-none focus:border-[#1d513b]"/></label>
      <label className="block text-sm font-bold">Password <input required minLength={8} name="password" type="password" autoComplete="current-password" className="mt-2 w-full rounded-2xl border border-black/15 px-4 py-3 outline-none focus:border-[#1d513b]"/><span className="mt-1 block text-xs font-normal text-black/45">At least 8 characters.</span></label>
      <div className="grid gap-3 sm:grid-cols-2">
       <button name="mode" value="signup" className="min-h-12 rounded-full bg-[#12211a] px-5 text-sm font-black text-white">Create account</button>
       <button name="mode" value="signin" formNoValidate className="min-h-12 rounded-full border border-black/15 bg-white px-5 text-sm font-black">Sign in</button>
      </div>
     </form>
    </section>
   </div>
  </div>
 </main>;
}
