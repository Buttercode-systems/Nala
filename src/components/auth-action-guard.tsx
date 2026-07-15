"use client";

import {useEffect,useRef,useState} from "react";
import {usePathname,useRouter} from "next/navigation";
import {createBrowserSupabaseClient} from "@/lib/supabase/browser";

const ACTION_TEXT=[
 "start guided simulation","practise again","accept task","submit for review",
 "create and publish task","verify and approve","request correction",
 "record readiness and continue","retry full mission","check my work","continue",
 "submit for structured review","save recurring plan","join waitlist","export passport"
];

function isProtectedElement(target:Element){
 const button=target.closest("button");
 const text=(button?.textContent||"").trim().toLowerCase();
 if(ACTION_TEXT.some(label=>text.includes(label)))return true;
 return Boolean(target.closest(
  ".simulation-library-card,.readiness-action button,.simulation-shell .simulation-options button,.simulation-shell .sequence-builder button,.simulation-shell select,.simulation-shell textarea,.check-item button,.content-grid textarea,[data-auth-action='required']"
 ));
}

export function AuthActionGuard(){
 const router=useRouter();
 const pathname=usePathname();
 const [authenticated,setAuthenticated]=useState<boolean|null>(null);
 const replaying=useRef(false);

 useEffect(()=>{
  const client=createBrowserSupabaseClient();
  client.auth.getUser().then(({data})=>setAuthenticated(Boolean(data.user))).catch(()=>setAuthenticated(false));
  const {data:{subscription}}=client.auth.onAuthStateChange((_event,session)=>setAuthenticated(Boolean(session?.user)));
  return ()=>subscription.unsubscribe();
 },[]);

 useEffect(()=>{
  async function guard(event:Event){
   if(replaying.current||authenticated===true)return;
   const target=event.target;
   if(!(target instanceof Element)||!isProtectedElement(target))return;
   event.preventDefault();
   event.stopPropagation();
   event.stopImmediatePropagation();

   if(authenticated===null){
    try{
     const {data}=await createBrowserSupabaseClient().auth.getUser();
     if(data.user){
      setAuthenticated(true);
      replaying.current=true;
      const button=target.closest("button") as HTMLButtonElement|null;
      const form=target.closest("form") as HTMLFormElement|null;
      if(button)button.click();else if(form)form.requestSubmit();
      queueMicrotask(()=>{replaying.current=false});
      return;
     }
    }catch{}
   }

   const next=encodeURIComponent(pathname||"/");
   const intent=encodeURIComponent((target.closest("button")?.textContent||"Continue in Nala").trim());
   router.push(`/auth?next=${next}&intent=${intent}`);
  }

  document.addEventListener("click",guard,true);
  document.addEventListener("submit",guard,true);
  document.addEventListener("change",guard,true);
  document.addEventListener("input",guard,true);
  return ()=>{
   document.removeEventListener("click",guard,true);
   document.removeEventListener("submit",guard,true);
   document.removeEventListener("change",guard,true);
   document.removeEventListener("input",guard,true);
  };
 },[authenticated,pathname,router]);

 return null;
}
