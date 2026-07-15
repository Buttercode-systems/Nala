import Link from "next/link";
import {ArrowLeft,ArrowRight,BadgeCheck,BriefcaseBusiness,Repeat2,ShieldCheck} from "lucide-react";

const revenue=[
 {title:"Completed-work service fee",body:"The intended core model is a transparent business-paid fee attached to successfully completed work. Worker pay remains visible before acceptance."},
 {title:"Recurring business plans",body:"Businesses with repeat workflows can later pay for reusable templates, preferred workers, reporting and higher task volume."},
 {title:"Sponsored pathways",body:"Approved partners may fund worker cohorts, task pools or progression programmes without turning worker access into a paid product."},
];

export default function BusinessModelPage(){return <main className="business-model-page"><div className="business-model-shell">
 <Link href="/business" className="progression-back"><ArrowLeft size={16}/>Back to business workspace</Link>
 <header><p>HOW NALA WORKS FOR BUSINESS</p><h1>Pay for a clear outcome. Build a trusted talent pipeline.</h1><span>Nala is designed so the business funds the work and service—not the worker’s access to opportunity.</span></header>
 <section className="business-model-grid"><article><BriefcaseBusiness/><h2>Defined outcomes</h2><p>Every task has a visible scope, time estimate, payment and approval standard before a worker accepts it.</p></article><article><ShieldCheck/><h2>Controlled delivery</h2><p>Workers practise first, use guided workflows and submit work for business verification rather than acting without oversight.</p></article><article><Repeat2/><h2>Repeatable support</h2><p>Reliable workers and proven task templates make recurring operational work easier to delegate over time.</p></article></section>
 <section className="business-model-revenue"><div><p>COMMERCIAL MODEL</p><h2>Simple, aligned and transparent.</h2></div>{revenue.map(item=><article key={item.title}><BadgeCheck size={18}/><div><strong>{item.title}</strong><p>{item.body}</p></div></article>)}</section>
 <section className="business-model-boundary"><strong>Current product boundary</strong><p>Nala does not currently claim a live wallet, escrow, lending product, FNB integration or guaranteed task supply. Regulated payment rails and partner offers require separate approval and implementation.</p></section>
 <Link href="/business" className="primary-cta">Open business workspace <ArrowRight size={18}/></Link>
 </div></main>}
