export type ProgressTaskStatus="open"|"accepted"|"submitted"|"changes_requested"|"verified";
export type ProgressTask={id:string;title:string;business:string;category:string;pay:number;duration:string;description:string;skills:string[];status:ProgressTaskStatus;worker?:string;submission?:string;feedback?:string;rating?:number};
export type ProgressState={mode:"empty"|"demo"|"custom";workerName:string;businessName:string;earnings:number;verified:number;reliability:number;tasks:ProgressTask[];readiness:Record<string,{passed?:boolean;score?:number}>;goal?:{name:string;target:number}};

export const STORAGE_KEY="nala-sandbox-state-v3";
export const DEFAULT_GOAL={name:"Transport and data",target:1000};

export function readProgressState():ProgressState|null{
 if(typeof window==="undefined")return null;
 try{const raw=window.localStorage.getItem(STORAGE_KEY);return raw?JSON.parse(raw):null}catch{return null}
}

export function verifiedTasks(state:ProgressState){return state.tasks.filter(task=>task.status==="verified")}
export function passedSimulations(state:ProgressState){return Object.values(state.readiness||{}).filter(item=>item?.passed).length}

export function strongestCategories(state:ProgressState){
 const counts=new Map<string,number>();
 for(const task of verifiedTasks(state))counts.set(task.category,(counts.get(task.category)||0)+1);
 return [...counts.entries()].sort((a,b)=>b[1]-a[1]).map(([category,count])=>({category,count}));
}

export function recommendationFor(task:ProgressTask,state:ProgressState){
 const categoryCount=verifiedTasks(state).filter(item=>item.category===task.category).length;
 const simulationCount=passedSimulations(state);
 const reasons:string[]=[];
 let score=0;
 if(categoryCount){score+=categoryCount*35;reasons.push(`${categoryCount} verified ${task.category.toLowerCase()} task${categoryCount===1?"":"s"}`)}
 if(simulationCount){score+=Math.min(simulationCount,3)*10;reasons.push(`${simulationCount} readiness simulation${simulationCount===1?"":"s"} passed`)}
 if(state.reliability>=90){score+=20;reasons.push(`${state.reliability}% reliability`)}
 if(task.pay<=150){score+=8;reasons.push("starter-sized scope")}
 if(!reasons.length)reasons.push("available as a new category to explore");
 return {score,reasons};
}

export function rankedOpenTasks(state:ProgressState){
 return state.tasks.filter(task=>task.status==="open").map(task=>({task,...recommendationFor(task,state)})).sort((a,b)=>b.score-a.score||a.task.pay-b.task.pay);
}

export function nextStep(state:ProgressState){
 const categories=strongestCategories(state);
 const ranked=rankedOpenTasks(state);
 const strongest=categories[0];
 const recommendation=ranked[0];
 if(!verifiedTasks(state).length&&!passedSimulations(state))return {title:"Build your first evidence",body:"Complete a readiness simulation, then choose a starter task with a clear scope.",reason:"Nala has no verified work evidence to use yet."};
 if(recommendation)return {title:`Try: ${recommendation.task.title}`,body:`This ${recommendation.task.category.toLowerCase()} task is the strongest current fit.`,reason:`Recommended because of ${recommendation.reasons.join(", ")}.`};
 return {title:"Keep strengthening your proof",body:strongest?`Your strongest verified category is ${strongest.category}. New suitable work will appear here when available.`:"Continue practising while suitable work is added.",reason:"Recommendations use verified work and readiness evidence only."};
}

export function uniqueSkills(state:ProgressState){return [...new Set(verifiedTasks(state).flatMap(task=>task.skills))].sort()}
