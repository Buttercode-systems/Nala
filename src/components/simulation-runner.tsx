"use client";

import {useMemo,useState} from "react";
import {ArrowLeft,Check,RotateCcw,ShieldCheck} from "lucide-react";
import type {Simulation} from "@/lib/simulations";

export type SimulationResult={simulationId:string;score:number;passed:boolean;attempts:number;completedAt:string};

export function SimulationRunner({simulation,previous,onPass,onExit}:{simulation:Simulation;previous?:SimulationResult;onPass:(result:SimulationResult)=>void;onExit:()=>void}){
 const [step,setStep]=useState(0);
 const [answers,setAnswers]=useState<Record<string,string>>({});
 const [revealed,setRevealed]=useState(false);
 const [attempts,setAttempts]=useState((previous?.attempts||0)+1);
 const current=simulation.steps[step];
 const selected=current?answers[current.id]:undefined;
 const option=current?.options.find(o=>o.id===selected);
 const total=useMemo(()=>simulation.steps.reduce((sum,item)=>{
  const chosen=item.options.find(o=>o.id===answers[item.id]);return sum+(chosen?.score||0);
 },0),[answers,simulation.steps]);
 const max=simulation.steps.length*25;
 const score=Math.round((total/max)*100);
 const complete=step===simulation.steps.length-1&&revealed;
 const passed=complete&&score>=simulation.passMark;
 function choose(id:string){if(revealed)return;setAnswers(a=>({...a,[current.id]:id}));setRevealed(true)}
 function next(){if(!selected)return;if(step<simulation.steps.length-1){setStep(s=>s+1);setRevealed(false)} }
 function retry(){setStep(0);setAnswers({});setRevealed(false);setAttempts(a=>a+1)}
 function finish(){if(!passed)return;onPass({simulationId:simulation.id,score,passed:true,attempts,completedAt:new Date().toISOString()})}
 return <section className="simulation-shell">
  <div className="simulation-head"><button className="simulation-back" onClick={onExit}><ArrowLeft size={16}/>Back to task</button><span className="status-chip">Practice · attempt {attempts}</span></div>
  <div className="simulation-progress"><span style={{width:`${((step+(revealed?1:0))/simulation.steps.length)*100}%`}}/></div>
  <div className="simulation-meta"><div><div className="page-eyebrow">Readiness simulation</div><h1>{simulation.title}</h1><p>{simulation.description}</p></div><div className="simulation-score"><small>PASS MARK</small><strong>{simulation.passMark}%</strong></div></div>
  {!complete&&current&&<div className="simulation-card">
   <div className="simulation-step-label">Decision {step+1} of {simulation.steps.length}</div>
   <h2>{current.prompt}</h2>{current.context&&<p className="simulation-context">{current.context}</p>}
   <div className="simulation-options">{current.options.map(item=><button key={item.id} className={`${selected===item.id?"selected":""} ${revealed&&selected===item.id?(item.score===25?"correct":"needs-work"):""}`} onClick={()=>choose(item.id)} disabled={revealed}><span>{item.label}</span>{revealed&&selected===item.id&&<Check size={18}/>}</button>)}</div>
   {revealed&&option&&<div className={`simulation-feedback ${option.score===25?"good":"coach"}`}><strong>{option.score===25?"Good judgement":"Coaching note"}</strong><p>{option.feedback}</p></div>}
   {revealed&&<div className="simulation-actions"><span>Current score: {score}%</span><button className="solid-button" onClick={next}>Continue</button></div>}
  </div>}
  {complete&&<div className={`simulation-result ${passed?"passed":"retry"}`}>
   <ShieldCheck size={38}/><div className="page-eyebrow">Simulation complete</div><h2>{passed?"You are ready for this task.":"Almost there. Practise once more."}</h2><div className="result-score">{score}%</div><p>{passed?"Your result has been recorded. You can now accept this task with evidence that you understand the expected approach.":`You need ${simulation.passMark}% to pass. Review the coaching notes and try again.`}</p>
   <div className="skill-row">{simulation.skills.map(skill=><span key={skill}>{skill}</span>)}</div>
   <div className="simulation-result-actions">{passed?<button className="solid-button" onClick={finish}>Record readiness and continue</button>:<button className="solid-button" onClick={retry}><RotateCcw size={16}/>Retry simulation</button>}<button className="outline-button" onClick={onExit}>Return to task</button></div>
  </div>}
 </section>
}
