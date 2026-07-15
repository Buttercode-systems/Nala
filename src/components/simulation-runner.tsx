"use client";

import {useMemo,useState} from "react";
import {ArrowLeft,Check,ChevronRight,RotateCcw,ShieldCheck} from "lucide-react";
import type {Simulation,SimulationActivity} from "@/lib/simulations";

export type SimulationResult={simulationId:string;score:number;passed:boolean;attempts:number;completedAt:string};
type ActivityAnswer=string|string[]|Record<string,string>;
type Evaluation={score:number;feedback:string;complete:boolean};

function sameSet(a:string[],b:string[]){return a.length===b.length&&a.every(x=>b.includes(x))}
function evaluate(activity:SimulationActivity,answer:ActivityAnswer|undefined):Evaluation{
 if(activity.type==="choice"){
  const option=activity.options.find(o=>o.id===answer);return option?{score:option.score,feedback:option.feedback,complete:true}:{score:0,feedback:"Choose an answer before continuing.",complete:false};
 }
 if(activity.type==="inspect"){
  const selected=Array.isArray(answer)?answer:[];if(!selected.length)return {score:0,feedback:"Select the issues you identified.",complete:false};
  const correct=selected.filter(id=>activity.correctIds.includes(id)).length;const wrong=selected.filter(id=>!activity.correctIds.includes(id)).length;const missed=activity.correctIds.filter(id=>!selected.includes(id)).length;
  const score=Math.max(0,Math.round(((correct-wrong*.6-missed*.5)/activity.correctIds.length)*100));return {score,feedback:activity.feedback,complete:true};
 }
 if(activity.type==="classify"){
  const values=answer&&typeof answer==="object"&&!Array.isArray(answer)?answer as Record<string,string>:{};if(Object.keys(values).length!==activity.records.length)return {score:0,feedback:"Classify every record before continuing.",complete:false};
  const correct=activity.records.filter(r=>values[r.id]===activity.answers[r.id]).length;return {score:Math.round(correct/activity.records.length*100),feedback:activity.feedback,complete:true};
 }
 if(activity.type==="sequence"){
  const values=Array.isArray(answer)?answer:[];if(values.length!==activity.items.length)return {score:0,feedback:"Place every step in the workflow.",complete:false};
  const correct=values.filter((id,index)=>activity.correctOrder[index]===id).length;return {score:Math.round(correct/activity.items.length*100),feedback:activity.feedback,complete:true};
 }
 const text=typeof answer==="string"?answer.trim():"";if(text.length<activity.minimumLength)return {score:0,feedback:`Write at least ${activity.minimumLength} characters so the work can be assessed.`,complete:false};
 const lower=text.toLowerCase();const requiredHits=activity.required.filter(term=>lower.includes(term.toLowerCase())).length;const forbiddenHits=activity.forbidden.filter(term=>lower.includes(term.toLowerCase())).length;const score=Math.max(0,Math.round((requiredHits/activity.required.length)*100-forbiddenHits*30));
 return {score,feedback:activity.feedback,complete:true};
}

export function SimulationRunner({simulation,previous,onPass,onExit}:{simulation:Simulation;previous?:SimulationResult;onPass:(result:SimulationResult)=>void;onExit:()=>void}){
 const [index,setIndex]=useState(0);const [answers,setAnswers]=useState<Record<string,ActivityAnswer>>({});const [reviewed,setReviewed]=useState(false);const [attempts,setAttempts]=useState((previous?.attempts||0)+1);const [locked,setLocked]=useState(false);
 const activity=simulation.activities[index];const answer=answers[activity.id];const evaluation=useMemo(()=>evaluate(activity,answer),[activity,answer]);
 const activityScores=simulation.activities.map(item=>item.id===activity.id&&reviewed?evaluation.score:(answers[`__score:${item.id}`] as unknown as number)||0);
 const score=Math.round(activityScores.reduce((a,b)=>a+b,0)/simulation.activities.length);const complete=index===simulation.activities.length-1&&reviewed;const passed=complete&&score>=simulation.passMark;
 function setAnswer(value:ActivityAnswer){if(reviewed||locked)return;setAnswers(a=>({...a,[activity.id]:value}))}
 function review(){if(!evaluation.complete||locked)return;setLocked(true);setAnswers(a=>({...a,[`__score:${activity.id}`]:evaluation.score as unknown as ActivityAnswer}));setReviewed(true);setTimeout(()=>setLocked(false),250)}
 function next(){if(!reviewed||locked)return;if(index<simulation.activities.length-1){setIndex(i=>i+1);setReviewed(false)}}
 function retry(){if(locked)return;setIndex(0);setAnswers({});setReviewed(false);setAttempts(a=>a+1)}
 function finish(){if(!passed||locked)return;setLocked(true);onPass({simulationId:simulation.id,score,passed:true,attempts,completedAt:new Date().toISOString()})}
 function toggleInspect(id:string){const current=Array.isArray(answer)?answer:[];setAnswer(current.includes(id)?current.filter(x=>x!==id):[...current,id])}
 function pushSequence(id:string){const current=Array.isArray(answer)?answer:[];if(current.includes(id))setAnswer(current.filter(x=>x!==id));else setAnswer([...current,id])}
 function classify(recordId:string,value:string){const current=answer&&typeof answer==="object"&&!Array.isArray(answer)?answer as Record<string,string>:{};setAnswer({...current,[recordId]:value})}
 return <section className="simulation-shell">
  <div className="simulation-head"><button className="simulation-back" onClick={onExit}><ArrowLeft size={16}/>Back to task</button><span className="status-chip">Training mission · attempt {attempts}</span></div>
  <div className="simulation-progress"><span style={{width:`${((index+(reviewed?1:0))/simulation.activities.length)*100}%`}}/></div>
  <div className="simulation-meta"><div><div className="page-eyebrow">Job-specific readiness</div><h1>{simulation.title}</h1><p>{simulation.description}</p></div><div className="simulation-score"><small>PASS MARK</small><strong>{simulation.passMark}%</strong><span>{simulation.activities.length} activities</span></div></div>
  {!complete&&<div className="simulation-card">
   <div className="simulation-step-label">Activity {index+1} of {simulation.activities.length} · {activity.type.replace("compose","write").replace("inspect","spot issues")}</div><h2>{activity.prompt}</h2>
   {activity.type==="choice"&&<div className="simulation-options">{activity.options.map(option=><button key={option.id} className={answer===option.id?"selected":""} onClick={()=>setAnswer(option.id)} disabled={reviewed}>{option.label}</button>)}</div>}
   {activity.type==="inspect"&&<div className="simulation-options">{activity.items.map(item=><button key={item.id} className={Array.isArray(answer)&&answer.includes(item.id)?"selected":""} onClick={()=>toggleInspect(item.id)} disabled={reviewed}><span>{item.label}</span>{Array.isArray(answer)&&answer.includes(item.id)&&<Check size={18}/>}</button>)}</div>}
   {activity.type==="classify"&&<div className="classification-list">{activity.records.map(record=><div className="classification-row" key={record.id}><strong>{record.label}</strong><select value={(answer&&typeof answer==="object"&&!Array.isArray(answer)?(answer as Record<string,string>)[record.id]:"")||""} onChange={e=>classify(record.id,e.target.value)} disabled={reviewed}><option value="">Choose status…</option>{activity.categories.map(category=><option key={category}>{category}</option>)}</select></div>)}</div>}
   {activity.type==="sequence"&&<><p className="simulation-context">Select the steps in the order you would perform them. Select an item again to remove it.</p><div className="sequence-builder">{(Array.isArray(answer)?answer:[]).map((id,position)=><button key={id} onClick={()=>pushSequence(id)} disabled={reviewed}><span>{position+1}</span>{activity.items.find(item=>item.id===id)?.label}</button>)}</div><div className="simulation-options compact">{activity.items.filter(item=>!Array.isArray(answer)||!answer.includes(item.id)).map(item=><button key={item.id} onClick={()=>pushSequence(item.id)} disabled={reviewed}>{item.label}<ChevronRight size={17}/></button>)}</div></>}
   {activity.type==="compose"&&<><div className="simulation-brief"><strong>Work brief</strong><p>{activity.brief}</p></div><textarea className="simulation-compose" value={typeof answer==="string"?answer:""} onChange={e=>setAnswer(e.target.value)} disabled={reviewed} placeholder="Write the work you would submit…"/><div className="compose-meter"><span>{typeof answer==="string"?answer.trim().length:0} characters</span><span>Minimum {activity.minimumLength}</span></div></>}
   {!reviewed?<div className="simulation-actions"><span>Complete the activity carefully. You cannot pass by skipping work.</span><button className="solid-button" onClick={review} disabled={!evaluation.complete||locked}>Check my work</button></div>:<><div className={`simulation-feedback ${evaluation.score>=80?"good":"coach"}`}><strong>{evaluation.score>=80?"Strong work":evaluation.score>=50?"Needs another look":"Coaching required"} · {evaluation.score}%</strong><p>{evaluation.feedback}</p>{activity.type==="compose"&&evaluation.score<100&&<p>Make sure every required detail is present and remove unsafe or unauthorised wording.</p>}</div><div className="simulation-actions"><span>Mission score so far: {score}%</span><button className="solid-button" onClick={next}>Continue</button></div></>}
  </div>}
  {complete&&<div className={`simulation-result ${passed?"passed":"retry"}`}><ShieldCheck size={42}/><div className="page-eyebrow">Training mission complete</div><h2>{passed?"You demonstrated readiness.":"This work needs more practice."}</h2><div className="result-score">{score}%</div><p>{passed?"Your result records the judgement, accuracy and job-specific workflow you demonstrated—not only the answers you clicked.":`You need ${simulation.passMark}% to pass. Retry the full mission and apply the coaching from each activity.`}</p><div className="skill-row">{simulation.skills.map(skill=><span key={skill}>{skill}</span>)}</div><div className="simulation-result-actions">{passed?<button className="solid-button" onClick={finish} disabled={locked}>Record readiness and continue</button>:<button className="solid-button" onClick={retry}><RotateCcw size={16}/>Retry full mission</button>}<button className="outline-button" onClick={onExit}>Return to task</button></div></div>}
 </section>
}
