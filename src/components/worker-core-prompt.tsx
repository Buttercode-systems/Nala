"use client";

import Link from "next/link";
import {useEffect,useState} from "react";
import {ArrowRight,BadgeCheck,Sparkles,Target} from "lucide-react";

type Snapshot={mode?:string;earnings?:number;verified?:number;readiness?:Record<string,{passed?:boolean}>;tasks?:Array<{status?:string}>};

export function WorkerCorePrompt(){
 const [snapshot,setSnapshot]=useState<Snapshot|null>(null);
 useEffect(()=>{
  try{const raw=window.localStorage.getItem("nala-sandbox-state-v3");setSnapshot(raw?JSON.parse(raw):{})}catch{setSnapshot({})}
 },[]);
 if(snapshot===null)return null;
 const passed=Object.values(snapshot.readiness||{}).filter(item=>item?.passed).length;
 const active=(snapshot.tasks||[]).filter(item=>["accepted","submitted","changes_requested"].includes(item.status||"")).length;
 const hasEvidence=(snapshot.verified||0)>0||passed>0;
 if(snapshot.mode==="empty"||(!hasEvidence&&!active))return <aside className="worker-core-prompt" aria-label="Start your Nala journey">
  <div className="worker-core-prompt-icon"><Sparkles size={18}/></div>
  <div><small>START HERE</small><strong>Build momentum before work arrives.</strong><p>Load the guided demo, complete a readiness simulation, or explore the task categories Nala is designed to support.</p></div>
  <div className="worker-core-prompt-actions"><Link href="/worker/growth">See your journey <ArrowRight size={14}/></Link><Link href="/worker#practice">Start practising</Link></div>
 </aside>;
 return <aside className="worker-core-progress" aria-label="Your Nala progress">
  <div><Target size={16}/><span><small>NEXT STEP</small><strong>{active?"Finish your current work":"Use your evidence to move forward"}</strong></span></div>
  <div className="worker-core-progress-stats"><span><BadgeCheck size={13}/>{snapshot.verified||0} verified</span><span><Sparkles size={13}/>{passed} passed</span><span>R{snapshot.earnings||0} earned</span></div>
  <Link href="/worker/growth">Open progression <ArrowRight size={14}/></Link>
 </aside>;
}
