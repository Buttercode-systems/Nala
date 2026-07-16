"use client";

import {useEffect,useMemo,useState} from "react";
import {createBrowserSupabaseClient} from "@/lib/supabase/browser";

export function BrowseFirstGate({role,children}:{role:"worker"|"business"|"admin";children:React.ReactNode}){
 const [authenticated,setAuthenticated]=useState<boolean|null>(null);
 const client=useMemo(()=>createBrowserSupabaseClient(),[]);
 useEffect(()=>{
  let active=true;
  client.auth.getUser().then(({data})=>{if(active)setAuthenticated(Boolean(data.user))}).catch(()=>{if(active)setAuthenticated(false)});
  const {data:listener}=client.auth.onAuthStateChange((_event,session)=>setAuthenticated(Boolean(session?.user)));
  return()=>{active=false;listener.subscription.unsubscribe()};
 },[client]);
 const selectedRole=role==="business"?"business":"worker";
 const next=role==="business"?"/business":"/worker";
 const authHref=`/auth?role=${selectedRole}&next=${encodeURIComponent(next)}&intent=${encodeURIComponent("use this Nala feature")}`;
 return <div>
  {authenticated===false&&role!=="admin"&&<div className="border-b border-black/10 bg-[#fff6df] px-4 py-3 text-[#12211a]">
   <div className="mx-auto flex max-w-[1376px] flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
    <p><strong>Browse mode:</strong> explore Nala freely. An account is requested only when you start a simulation, accept or submit work, publish a task, join a waitlist, or save personal progress.</p>
    <a href={authHref} className="shrink-0 font-black underline underline-offset-4">Sign in or create an account</a>
   </div>
  </div>}
  {children}
 </div>;
}
