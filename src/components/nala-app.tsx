"use client";

import {useEffect,useMemo,useState} from "react";
import Link from "next/link";
import {ArrowLeft,ArrowRight,BadgeCheck,BriefcaseBusiness,Building2,Check,ChevronRight,CircleDollarSign,ClipboardCheck,Clock3,FileCheck2,Home,LayoutDashboard,Menu,Plus,ShieldCheck,Sparkles,Star,UsersRound,X} from "lucide-react";

type Role="worker"|"business"|"admin";
type View="dashboard"|"market"|"task"|"workbench"|"passport"|"create"|"reviews"|"operations";
type TaskStatus="open"|"accepted"|"submitted"|"verified";
type Task={id:string;title:string;business:string;category:string;pay:number;duration:string;description:string;skills:string[];status:TaskStatus;worker?:string;submission?:string;rating?:number};
type State={role:Role;workerName:string;businessName:string;earnings:number;verified:number;reliability:number;tasks:Task[]};

const seed:State={role:"worker",workerName:"Thandi Mokoena",businessName:"Lerato Beauty Studio",earnings:350,verified:4,reliability:96,tasks:[
 {id:"appointment-confirmation",title:"Confirm tomorrow’s appointments",business:"Lerato Beauty Studio",category:"Customer support",pay:100,duration:"45–60 min",description:"Contact 10 customers using the approved message, record responses and flag anything the owner must handle.",skills:["Customer communication","Accuracy","WhatsApp admin"],status:"open"},
 {id:"quote-follow-up",title:"Prepare quote follow-up messages",business:"Mandla Electrical",category:"Sales administration",pay:150,duration:"60–90 min",description:"Prepare professional follow-up messages for eight customers who received quotations this month.",skills:["Professional writing","Sales support","Attention to detail"],status:"open"},
 {id:"content-pack",title:"Create five social post drafts",business:"Kasi Kitchen",category:"Digital marketing",pay:220,duration:"2 hours",description:"Turn a supplied menu and promotion into five clear social-media post drafts.",skills:["Content writing","Digital marketing","Brand tone"],status:"open"},
 {id:"completed-1",title:"Clean customer contact spreadsheet",business:"Naledi Repairs",category:"Data administration",pay:120,duration:"1 hour",description:"Standardise phone numbers and remove duplicates.",skills:["Spreadsheet cleanup","Data accuracy"],status:"verified",worker:"Thandi Mokoena",rating:5}
]};

const workSteps=["Review the approved customer list","Use the approved confirmation message","Record every customer response","Flag questions for the business owner","Complete the final quality check"];

function useDemoState(){
 const [data,setData]=useState<State>(seed);const [ready,setReady]=useState(false);
 useEffect(()=>{try{const saved=localStorage.getItem("nala-premium-demo");if(saved)setData(JSON.parse(saved))}catch{}setReady(true)},[]);
 useEffect(()=>{if(ready)localStorage.setItem("nala-premium-demo",JSON.stringify(data))},[data,ready]);
 return {data,setData,ready};
}

function Metric({icon:Icon,label,value}:{icon:any;label:string;value:string}){return <div className="metric-card"><Icon size={20}/><strong>{value}</strong><span>{label}</span></div>}
function Empty({title,body}:{title:string;body:string}){return <div className="empty-state"><Sparkles className="mx-auto"/><strong className="mt-3 block text-lg text-ink">{title}</strong><p className="mt-2 text-sm">{body}</p></div>}
function Header({eyebrow,title,copy}:{eyebrow:string;title:string;copy:string}){return <><div className="page-eyebrow">{eyebrow}</div><h1 className="page-title">{title}</h1><p className="page-copy">{copy}</p></>}

export function NalaApp({initialView="dashboard"}:{initialView?:View}){
 const {data,setData,ready}=useDemoState();
 const [view,setView]=useState<View>(initialView);
 const [selected,setSelected]=useState(data.tasks[0]?.id||"");
 const [menu,setMenu]=useState(false);
 const [practice,setPractice]=useState(false);
 const [checked,setChecked]=useState<number[]>([]);
 const [submission,setSubmission]=useState("");
 const task=data.tasks.find(t=>t.id===selected)||data.tasks[0];
 const open=data.tasks.filter(t=>t.status==="open");
 const active=data.tasks.filter(t=>t.status==="accepted"||t.status==="submitted");
 const verified=data.tasks.filter(t=>t.status==="verified");
 const submitted=data.tasks.filter(t=>t.status==="submitted");
 const businessTasks=data.tasks.filter(t=>t.business===data.businessName);
 const nav=useMemo(()=>data.role==="worker"?[
  ["dashboard","My progress",Home],["market","Find work",BriefcaseBusiness],["workbench","My work",ClipboardCheck],["passport","Work passport",BadgeCheck]
 ]:data.role==="business"?[
  ["dashboard","Overview",LayoutDashboard],["create","Create task",Plus],["market","Task board",BriefcaseBusiness],["reviews","Review work",FileCheck2]
 ]:[
  ["operations","Marketplace health",ShieldCheck],["market","All tasks",BriefcaseBusiness],["reviews","Review queue",FileCheck2]
 ],[data.role]);

 function switchRole(role:Role){setData(d=>({...d,role}));setView(role==="admin"?"operations":"dashboard");setMenu(false)}
 function openTask(id:string){setSelected(id);setView("task")}
 function beginPractice(){setPractice(true)}
 function passPractice(){setData(d=>({...d,tasks:d.tasks.map(t=>t.id===task.id?{...t,status:"accepted",worker:d.workerName}:t)}));setPractice(false);setView("workbench")}
 function toggleStep(i:number){setChecked(c=>c.includes(i)?c.filter(x=>x!==i):[...c,i])}
 function submitWork(){if(checked.length!==workSteps.length||!submission.trim())return;setData(d=>({...d,tasks:d.tasks.map(t=>t.id===task.id?{...t,status:"submitted",submission}:t)}));setSubmission("");setChecked([]);setView("dashboard")}
 function verifyTask(id:string){const target=data.tasks.find(t=>t.id===id);if(!target)return;setData(d=>({...d,earnings:d.earnings+target.pay,verified:d.verified+1,reliability:Math.min(100,d.reliability+1),tasks:d.tasks.map(t=>t.id===id?{...t,status:"verified",rating:5}:t)}))}
 function createTask(e:React.FormEvent<HTMLFormElement>){e.preventDefault();const f=new FormData(e.currentTarget);const id=`task-${Date.now()}`;const next:Task={id,title:String(f.get("title")),business:data.businessName,category:String(f.get("category")),pay:Number(f.get("pay")),duration:String(f.get("duration")),description:String(f.get("description")),skills:String(f.get("skills")).split(",").map(s=>s.trim()).filter(Boolean),status:"open"};setData(d=>({...d,tasks:[next,...d.tasks]}));setSelected(id);e.currentTarget.reset();setView("task")}
 if(!ready)return <main className="grid min-h-screen place-items-center bg-sand"><div className="text-center"><div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-leaf border-t-forest"/><p className="mt-4 font-bold">Opening Nala…</p></div></main>;

 return <div className="app-shell">
  <header className="app-topbar">
   <Link href="/" className="app-brand">nala<span>.</span></Link>
   <div className="workspace-switch" aria-label="Demo workspace switcher">{(["worker","business","admin"] as Role[]).map(role=><button key={role} className={data.role===role?"active":""} onClick={()=>switchRole(role)}>{role}</button>)}</div>
   <button className="mobile-menu" onClick={()=>setMenu(!menu)} aria-label="Toggle menu">{menu?<X/>:<Menu/>}</button>
  </header>

  <div className="app-layout">
   <aside className={`app-sidebar ${menu?"!block":""}`}>
    <div className="persona-card">
     <small>{data.role==="worker"?"WORKER PROFILE":data.role==="business"?"BUSINESS ACCOUNT":"OPERATIONS ACCOUNT"}</small>
     <strong>{data.role==="worker"?data.workerName:data.role==="business"?data.businessName:"Nala Trust & Safety"}</strong>
     <p>{data.role==="worker"?"Customer support pathway":data.role==="business"?"Beauty & personal care":"Marketplace oversight"}</p>
    </div>
    <nav className="side-nav">{nav.map(([id,label,Icon]:any)=><button key={id} className={view===id?"active":""} onClick={()=>{setView(id);setMenu(false)}}><Icon size={18}/>{label}</button>)}</nav>
    <div className="sidebar-note">{data.role==="worker"?"Every task shows payment, scope and proof requirements before you accept.":data.role==="business"?"Create outcomes, not vague gigs. Nala structures the work for you.":"Protect fair work, business trust and worker dignity."}</div>
   </aside>

   <main className="app-main">
    <div className="app-page">
     {view==="dashboard"&&data.role==="worker"&&<WorkerDashboard data={data} active={active} open={open} setView={setView} openTask={openTask}/>} 
     {view==="dashboard"&&data.role==="business"&&<BusinessDashboard data={data} tasks={businessTasks} submitted={submitted} setView={setView}/>} 
     {view==="operations"&&<AdminDashboard data={data} setView={setView}/>} 
     {view==="market"&&<TaskMarket role={data.role} tasks={data.role==="worker"?open:data.tasks} openTask={openTask}/>} 
     {view==="task"&&task&&<TaskDetail task={task} role={data.role} practice={practice} beginPractice={beginPractice} passPractice={passPractice} back={()=>setView("market")}/>} 
     {view==="workbench"&&<Workbench tasks={active} task={task} setSelected={setSelected} checked={checked} toggleStep={toggleStep} submission={submission} setSubmission={setSubmission} submitWork={submitWork}/>} 
     {view==="passport"&&<Passport data={data} verified={verified}/>} 
     {view==="create"&&<CreateTask onSubmit={createTask}/>} 
     {view==="reviews"&&<Reviews role={data.role} submitted={submitted} verifyTask={verifyTask}/>} 
    </div>
   </main>
  </div>
 </div>
}

function WorkerDashboard({data,active,open,setView,openTask}:{data:State;active:Task[];open:Task[];setView:(v:View)=>void;openTask:(id:string)=>void}){return <section>
 <Header eyebrow="Your work journey" title={`Good to see you, ${data.workerName.split(" ")[0]}.`} copy="You are building a track record employers can trust. Every verified task adds evidence, not just another line on a CV."/>
 <div className="metric-grid"><Metric icon={CircleDollarSign} label="Total earnings" value={`R${data.earnings}`}/><Metric icon={BadgeCheck} label="Verified tasks" value={String(data.verified)}/><Metric icon={Star} label="Reliability" value={`${data.reliability}%`}/></div>
 <div className="content-grid">
  <section className="panel"><div className="section-actions"><div><h2>Your current work</h2><p className="panel-sub">Accepted tasks and work waiting for submission.</p></div><button className="outline-button" onClick={()=>setView("market")}>Find work <ArrowRight size={16}/></button></div><div className="task-list">{active.length?active.map(t=><button className="task-row" key={t.id} onClick={()=>openTask(t.id)}><div><strong>{t.title}</strong><p>{t.business} · {t.status}</p></div><ChevronRight/></button>):<Empty title="No task in progress" body="Choose a starter task that matches what you can already do."/>}</div></section>
  <aside className="panel dark"><span className="page-eyebrow !text-leaf">Next milestone</span><h2 className="mt-4">Reception & Front Desk pathway</h2><p className="panel-sub">Complete one more customer-support task to unlock this pathway.</p><div className="progress-path"><div className="done">Customer communication proven</div><div className="done">Admin accuracy proven</div><div>One more verified task</div><div>Pathway recommendation</div></div></aside>
 </div>
 <div className="panel mt-[18px]"><div className="section-actions"><div><h2>Matched starter work</h2><p className="panel-sub">Selected for your current skills and reliability.</p></div><button className="outline-button" onClick={()=>setView("market")}>See all</button></div><div className="market-grid">{open.slice(0,2).map(t=><MarketCard key={t.id} task={t} onClick={()=>openTask(t.id)}/>)}</div></div>
</section>}

function BusinessDashboard({data,tasks,submitted,setView}:{data:State;tasks:Task[];submitted:Task[];setView:(v:View)=>void}){const spend=tasks.reduce((s,t)=>s+t.pay,0);return <section>
 <Header eyebrow="Business workspace" title="Keep important work moving." copy="Turn the admin and follow-ups sitting in your business into clear outcomes that a prepared worker can complete."/>
 <div className="metric-grid"><Metric icon={BriefcaseBusiness} label="Tasks created" value={String(tasks.length)}/><Metric icon={CircleDollarSign} label="Task value" value={`R${spend}`}/><Metric icon={UsersRound} label="Trusted workers" value="2"/></div>
 <div className="content-grid">
  <section className="panel"><div className="section-actions"><div><h2>Work needing attention</h2><p className="panel-sub">Submissions waiting for your review.</p></div><button className="solid-button" onClick={()=>setView("create")}><Plus size={16}/>Create task</button></div><div className="task-list">{submitted.length?submitted.map(t=><button className="task-row" key={t.id} onClick={()=>setView("reviews")}><div><strong>{t.title}</strong><p>{t.worker} submitted work for review</p></div><span className="status-chip">Review</span></button>):<Empty title="No reviews waiting" body="Submitted work will appear here with the worker’s evidence."/>}</div></section>
  <aside className="panel dark"><span className="page-eyebrow !text-leaf">This week</span><h2 className="mt-4">3.5 hours saved</h2><p className="panel-sub">Structured starter tasks helped your team protect time for customers and revenue.</p><div className="progress-path"><div className="done">10 appointments confirmed</div><div className="done">Customer list cleaned</div><div>Quote follow-ups next</div></div></aside>
 </div>
 <section className="panel mt-[18px]"><h2>Your task board</h2><p className="panel-sub">Every task has a clear scope, payment and review state.</p><div className="task-list">{tasks.map(t=><div className="task-row" key={t.id}><div><strong>{t.title}</strong><p>{t.status} · R{t.pay} · {t.duration}</p></div><span className="status-chip">{t.status}</span></div>)}</div></section>
</section>}

function AdminDashboard({data,setView}:{data:State;setView:(v:View)=>void}){const open=data.tasks.filter(t=>t.status==="open").length;const active=data.tasks.filter(t=>t.status==="accepted"||t.status==="submitted").length;return <section>
 <Header eyebrow="Trust & safety operations" title="Protect the quality of the marketplace." copy="Review task quality, worker safety, business behaviour and disputes before problems become patterns."/>
 <div className="metric-grid"><Metric icon={ShieldCheck} label="Open safety flags" value="0"/><Metric icon={BriefcaseBusiness} label="Open tasks" value={String(open)}/><Metric icon={ClipboardCheck} label="Active assignments" value={String(active)}/></div>
 <div className="content-grid"><section className="panel"><h2>Operations queue</h2><p className="panel-sub">Items needing a human decision.</p><div className="task-list"><div className="task-row"><div><strong>Business verification review</strong><p>1 new business application · low risk</p></div><span className="status-chip">Review</span></div><div className="task-row"><div><strong>Task quality sampling</strong><p>3 recently created tasks selected</p></div><span className="status-chip">Check</span></div></div></section><aside className="panel dark"><span className="page-eyebrow !text-leaf">Marketplace standard</span><h2 className="mt-4">No unpaid trials. No hidden scope.</h2><p className="panel-sub">Every task must disclose payment, expected time, evidence and cancellation rules.</p><button className="solid-button mt-6 !bg-sun !text-ink" onClick={()=>setView("market")}>Inspect all tasks</button></aside></div>
</section>}

function TaskMarket({role,tasks,openTask}:{role:Role;tasks:Task[];openTask:(id:string)=>void}){return <section><Header eyebrow={role==="worker"?"Matched starter work":"Marketplace task board"} title={role==="worker"?"Work you can succeed at.":"Clear work. Visible status."} copy={role==="worker"?"See the payment, time, scope and skills before you decide.":"Inspect every task and its current delivery state."}/><div className="market-grid">{tasks.length?tasks.map(t=><MarketCard key={t.id} task={t} onClick={()=>openTask(t.id)}/>):<Empty title="No work available" body="New suitable tasks will appear here."/>}</div></section>}
function MarketCard({task,onClick}:{task:Task;onClick:()=>void}){return <button className="market-card" onClick={onClick}><div className="market-card-top"><span className="status-chip">{task.category}</span><strong className="text-2xl">R{task.pay}</strong></div><h3>{task.title}</h3><p>{task.business} · {task.duration}</p><p>{task.description}</p><div className="skill-row">{task.skills.map(s=><span key={s}>{s}</span>)}</div></button>}

function TaskDetail({task,role,practice,beginPractice,passPractice,back}:{task:Task;role:Role;practice:boolean;beginPractice:()=>void;passPractice:()=>void;back:()=>void}){return <section className="detail-card"><button className="mb-5 flex items-center gap-2 text-sm font-bold text-forest" onClick={back}><ArrowLeft size={16}/>Back</button><div className="detail-head"><div><div className="page-eyebrow">{task.category}</div><h1 className="page-title !text-[44px]">{task.title}</h1><p className="page-copy">{task.business}</p></div><div className="detail-pay"><small>{role==="worker"?"YOU EARN":"TASK VALUE"}</small><strong>R{task.pay}</strong><span className="block text-xs">{task.duration}</span></div></div><div className="info-band"><div><strong>Clear scope</strong><span>Defined outcome before acceptance</span></div><div><strong>Protected work</strong><span>Dispute and cancellation support</span></div><div><strong>Verified proof</strong><span>Added after business approval</span></div></div><div className="mt-7"><h2 className="text-xl font-black">What needs to be done</h2><p className="mt-3 leading-7 text-black/60">{task.description}</p><h2 className="mt-7 text-xl font-black">What this work proves</h2><div className="skill-row">{task.skills.map(s=><span key={s}>{s}</span>)}</div></div>{role==="worker"&&task.status==="open"&&<div className="mt-8 rounded-[20px] border border-line bg-sand p-5">{!practice?<><strong>Practise before accepting</strong><p className="mt-2 text-sm leading-6 text-black/55">Complete one short scenario so you understand the tone and quality expected.</p><button className="solid-button mt-4" onClick={beginPractice}>Start readiness check <ArrowRight size={16}/></button></>:<><strong>Which message is more professional?</strong><p className="mt-3 rounded-xl border border-line bg-white p-4 text-sm">“Hi Naledi, just checking whether you are still able to attend your appointment tomorrow at 10:00. Please reply YES to confirm or let us know if you need to reschedule.”</p><button className="solid-button mt-4" onClick={passPractice}><Check size={16}/>This is the right message</button></>}</div>}</section>}

function Workbench({tasks,task,setSelected,checked,toggleStep,submission,setSubmission,submitWork}:{tasks:Task[];task:Task;setSelected:(id:string)=>void;checked:number[];toggleStep:(i:number)=>void;submission:string;setSubmission:(v:string)=>void;submitWork:()=>void}){if(!tasks.length)return <section><Header eyebrow="My work" title="Nothing in progress yet." copy="Accept a task after completing its readiness check."/><Empty title="Your workbench is ready" body="Once you accept a task, Nala will guide you through each step here."/></section>;const current=tasks.find(t=>t.id===task?.id)||tasks[0];return <section><Header eyebrow="Guided workbench" title={current.title} copy={`${current.business} · ${current.duration} · R${current.pay}`}/>{tasks.length>1&&<div className="mt-5 flex gap-2">{tasks.map(t=><button className="outline-button" key={t.id} onClick={()=>setSelected(t.id)}>{t.title}</button>)}</div>}<div className="content-grid"><section className="panel"><h2>Complete the task step by step</h2><p className="panel-sub">Your progress stays on this device until you submit.</p><div className="checklist">{workSteps.map((step,i)=><div className={`check-item ${checked.includes(i)?"done":""}`} key={step}><button onClick={()=>toggleStep(i)}>{checked.includes(i)&&<Check size={15}/>}</button><div><strong>{step}</strong><p className="mt-1 text-xs text-black/45">Follow the approved task instructions and protect customer information.</p></div></div>)}</div></section><aside className="panel"><h2>Submit your result</h2><p className="panel-sub">Explain what you completed and anything the business owner must know.</p><div className="field mt-5"><textarea value={submission} onChange={e=>setSubmission(e.target.value)} placeholder="Example: Confirmed 8 appointments, recorded 1 cancellation and flagged 1 customer question…"/></div><button className="solid-button mt-4 w-full" disabled={checked.length!==workSteps.length||!submission.trim()} onClick={submitWork}>Submit for business review <ArrowRight size={16}/></button></aside></div></section>}

function Passport({data,verified}:{data:State;verified:Task[]}){return <section><Header eyebrow="Verified proof of work" title={`${data.workerName}’s work passport`} copy="A portable record of the tasks, skills and reliability demonstrated through real business work."/><div className="metric-grid"><Metric icon={BadgeCheck} label="Verified tasks" value={String(data.verified)}/><Metric icon={Star} label="Reliability" value={`${data.reliability}%`}/><Metric icon={Building2} label="Businesses served" value="2"/></div><section className="panel mt-[18px]"><h2>Verified experience</h2><p className="panel-sub">Only business-approved work appears here.</p><div className="task-list">{verified.map(t=><article className="review-card" key={t.id}><div className="flex items-start justify-between gap-4"><div><span className="status-chip">Verified</span><h3 className="mt-3 text-xl font-black">{t.title}</h3><p className="mt-1 text-sm text-forest">{t.business}</p></div><BadgeCheck className="text-forest"/></div><p className="mt-4 text-sm leading-6 text-black/55">Completed the defined task accurately and received business approval.</p><div className="skill-row">{t.skills.map(s=><span key={s}>{s}</span>)}</div></article>)}</div></section></section>}

function CreateTask({onSubmit}:{onSubmit:(e:React.FormEvent<HTMLFormElement>)=>void}){return <section><Header eyebrow="Create a structured outcome" title="What important work needs to move?" copy="Nala works best when the result is clear, safe and small enough for a prepared starter worker to complete well."/><form className="panel mt-7" onSubmit={onSubmit}><div className="form-grid"><div className="field full"><label>TASK TITLE</label><input name="title" required placeholder="Confirm tomorrow’s customer appointments"/></div><div className="field"><label>CATEGORY</label><select name="category"><option>Customer support</option><option>Sales administration</option><option>Data administration</option><option>Digital marketing</option></select></div><div className="field"><label>PAYMENT (R)</label><input name="pay" type="number" min="50" required placeholder="100"/></div><div className="field"><label>ESTIMATED TIME</label><input name="duration" required placeholder="45–60 min"/></div><div className="field"><label>SKILLS, COMMA SEPARATED</label><input name="skills" required placeholder="Communication, accuracy, admin"/></div><div className="field full"><label>WHAT MUST BE COMPLETED?</label><textarea name="description" required placeholder="Describe the outcome, information provided and evidence expected…"/></div></div><div className="mt-6 rounded-[18px] bg-sand p-4 text-sm leading-6 text-black/55"><strong className="text-ink">Fair-work check:</strong> payment is visible before acceptance, unpaid trials are not allowed, and sensitive access should never be included in a starter task.</div><button className="solid-button mt-5" type="submit">Create and publish task <ArrowRight size={16}/></button></form></section>}

function Reviews({role,submitted,verifyTask}:{role:Role;submitted:Task[];verifyTask:(id:string)=>void}){return <section><Header eyebrow={role==="admin"?"Review oversight":"Business review"} title={role==="admin"?"Quality and dispute queue":"Approve work that meets the brief."} copy={role==="admin"?"Check flagged or sampled work before marketplace trust is affected.":"Inspect the worker’s summary, verify the result and add trusted experience to their passport."}/><div className="mt-7">{submitted.length?submitted.map(t=><article className="review-card" key={t.id}><div className="flex flex-col justify-between gap-4 sm:flex-row"><div><span className="status-chip">Submitted</span><h2 className="mt-3 text-2xl font-black">{t.title}</h2><p className="mt-1 text-sm text-black/50">{t.worker} · {t.business}</p></div><strong className="text-3xl">R{t.pay}</strong></div><div className="mt-5 rounded-[16px] bg-sand p-4"><small className="font-black text-forest">WORKER SUMMARY</small><p className="mt-2 leading-7 text-black/60">{t.submission}</p></div>{role==="business"&&<div className="mt-5 flex gap-3"><button className="solid-button" onClick={()=>verifyTask(t.id)}><BadgeCheck size={16}/>Verify and approve</button><button className="outline-button">Request correction</button></div>}</article>):<Empty title="Nothing waiting for review" body="New submissions will appear here with the worker’s evidence and summary."/>}</div></section>}
