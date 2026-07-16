"use client";

import {useEffect,useMemo,useState} from "react";
import {createBrowserSupabaseClient} from "@/lib/supabase/browser";

const protectedLabels=[
 "start guided simulation","practise again","accept task","submit for review",
 "create and publish task","verify and approve","request correction"
];

function isProtected(target:EventTarget|null){
 if(!(target instanceof Element))return false;
 const button=target.closest("button");
 if(button){
  const label=(button.textContent||"").trim().toLowerCase();
  if(button.closest(".simulation-library-card,.readiness-action,.check-item,.simulation-runner"))return true;
  if(protectedLabels.some(value=>label.includes(value)))return true;
 }
 return Boolean(target.closest("form")?.querySelector('button[type="submit"]'));
}

export function BrowseFirstGate({role,children}:{role:"worker"|"business"|"admin";children:React.ReactNode}){
 const [authenticated,setAuthenticated]=useState<boolean|null>(null);
 const client=useMemo(()=>createBrowserSupabaseClient(),[]);
 useEffect(()=>{
  let active=true;
  client.auth.getUser().then(({data})=>{if(active)setAuthenticated(Boolean(data.user))});
  const {data:listener}=client.auth.onAuthStateChange((_event,session)=>setAuthenticated(Boolean(session?.user)));
  return()=>{active=false;listener.subscription.unsubscribe()};
 },[client]);
 const authHref=`/auth?role=${role==="business"?"business":"worker"}&next=${encodeURIComponent(role==="business"?"/business":"/worker")}&intent=${encodeURIComponent("use this Nala feature")}`;
 function intercept(event:React.SyntheticEvent){
  if(authenticated!==false||!isProtected(event.target))return;
  event.preventDefault();event.stopPropagation();
  window.location.assign(authHref);
 }
 return <div onClickCapture={intercept} onSubmitCapture={intercept}>
  {authenticated===false&&<div className="border-b border-black/10 bg-[#fff6df] px-4 py-3 text-[#12211a]">
   <div className="mx-auto flex max-w-[1376px] flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
    <p><strong>Browse mode:</strong> explore Nala freely. Sign in only when you start a simulation, accept work, submit work, or publish a task.</p>
    <a href={authHref} className="shrink-0 font-black underline underline-offset-4">Sign in or create an account</a>
   </div>
  </div>}
  {children}
 </div>;
}
