import Link from "next/link";
import {ArrowRight, BadgeCheck, BriefcaseBusiness, Building2, Check, ChevronRight, CircleDollarSign, HeartHandshake, ShieldCheck, Sparkles, Star, UsersRound} from "lucide-react";
import {Nav} from "@/components/nav";

const workerSteps=[
  ["01","Tell us what you can already do","Formal jobs are not the only experience that counts. Helping at a salon, selling products, managing a WhatsApp group or organising community work can all reveal useful skills."],
  ["02","Practise before real work","Nala gives you a short, guided simulation so you can build confidence and the business can trust that you understand the task."],
  ["03","Complete safe, paid work","You see the scope, payment, deadline and evidence requirements before accepting. Nala guides the process without hiding what is expected."],
  ["04","Turn work into proof","The business verifies your quality, reliability and communication. That evidence grows your work passport and unlocks better opportunities."],
];

const businessOutcomes=["Confirm tomorrow’s appointments","Prepare quotation follow-ups","Clean customer spreadsheets","Draft social content","Prepare invoice reminders"];
const safeguards=["No unpaid trial work","Payment shown before acceptance","Verified business and task history","Clear disputes and cancellation rules"];

export default function Home(){
 return <div className="landing-shell">
  <Nav/>
  <main>
   <section className="hero-stage">
    <div className="hero-grid">
     <div className="hero-copy reveal-up">
      <div className="eyebrow"><span className="eyebrow-dot"/>Built for the first opportunity</div>
      <h1>Experience should not be the thing that keeps you from getting experience.</h1>
      <p className="hero-lede">Nala helps young people earn their first income through safe, structured work for real businesses—and turns every completed task into verified proof that they can be trusted with more.</p>
      <div className="hero-actions">
       <Link href="/worker" className="primary-cta">Start building experience <ArrowRight size={19}/></Link>
       <Link href="/business" className="secondary-cta">I run a business <Building2 size={18}/></Link>
      </div>
      <div className="trust-line"><ShieldCheck size={17}/><span>Clear scope. Fair payment. Verified work.</span></div>
     </div>

     <div className="journey-board reveal-up delay-1" aria-label="Example Nala work journey">
      <div className="journey-topline"><span>THANDI’S FIRST WORK JOURNEY</span><span className="live-pill"><span/>IN PROGRESS</span></div>
      <div className="journey-person">
       <div className="portrait-mark">TM</div>
       <div><strong>Thandi Mokoena</strong><p>22 · Matric · Strong with people</p></div>
       <div className="journey-score"><Star size={15} fill="currentColor"/> 96%</div>
      </div>
      <div className="journey-track">
       <div className="track-line"/>
       <div className="journey-node done"><Check size={16}/><span>Practised</span></div>
       <div className="journey-node active"><BriefcaseBusiness size={16}/><span>Working</span></div>
       <div className="journey-node"><BadgeCheck size={16}/><span>Verified</span></div>
       <div className="journey-node"><Sparkles size={16}/><span>Progress</span></div>
      </div>
      <div className="task-ticket">
       <div><span className="ticket-label">CURRENT TASK</span><h3>Confirm 10 salon appointments</h3><p>Lerato Beauty Studio · Remote · 45–60 min</p></div>
       <div className="ticket-pay"><small>YOU EARN</small><strong>R100</strong></div>
      </div>
      <div className="passport-preview">
       <div className="passport-icon"><BadgeCheck/></div>
       <div><span>WHAT THIS WILL PROVE</span><strong>Customer communication</strong><p>Plus admin accuracy and reliability</p></div>
       <ChevronRight/>
      </div>
     </div>
    </div>
    <div className="hero-footnote"><span>THE GAP NALA CLOSES</span><p>“You need experience to get hired.” <strong>But where does the first experience come from?</strong></p></div>
   </section>

   <section className="problem-section" id="why-nala">
    <div className="section-kicker">The problem is not a lack of willingness</div>
    <div className="problem-grid">
     <h2>Two groups need each other. They just do not have a safe way to meet.</h2>
     <div className="problem-copy"><p>Millions of young people can communicate, organise, sell, assist and learn—but have no formal history to prove it.</p><p>At the same time, small businesses lose time and money because useful admin, follow-ups and customer work never gets done.</p></div>
    </div>
    <div className="bridge-visual">
     <article className="bridge-side worker-side"><div className="bridge-icon"><UsersRound/></div><span>YOUNG PEOPLE</span><h3>Ready to work.<br/>Blocked by “no experience.”</h3><ul><li>No references</li><li>No proof of reliability</li><li>No clear first step</li></ul></article>
     <div className="bridge-centre"><div className="bridge-word">NALA</div><div className="bridge-arrow"><span/><ArrowRight/></div><p>Turns real business needs into safe starter work</p></div>
     <article className="bridge-side business-side"><div className="bridge-icon"><Building2/></div><span>SMALL BUSINESSES</span><h3>Important work.<br/>Not enough time or staff.</h3><ul><li>Missed follow-ups</li><li>Unconfirmed bookings</li><li>Admin backlog</li></ul></article>
    </div>
   </section>

   <section className="how-section" id="how-it-works">
    <div className="how-heading"><div><span className="section-kicker light">For young people</span><h2>From “no experience” to evidence that speaks for you.</h2></div><p>Nala does not simply send you to another job listing. It helps you create the experience employers keep asking for.</p></div>
    <div className="steps-list">{workerSteps.map(([number,title,body])=><article key={number} className="step-row"><span className="step-number">{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
    <div className="passport-strip"><div><BadgeCheck size={34}/><span>PROOF-OF-WORK PASSPORT</span></div><p>Instead of only saying “I am hardworking,” show verified tasks, quality scores, skills demonstrated and businesses that would hire you again.</p><Link href="/passport">See an example passport <ArrowRight size={17}/></Link></div>
   </section>

   <section className="business-section" id="for-business">
    <div className="business-intro">
     <span className="section-kicker">For small businesses</span>
     <h2>Get the important small work done—without hiring for a full-time role.</h2>
     <p>Choose the outcome you need. Nala turns it into a clear task, prepares the worker, protects both sides and gives you a simple review process.</p>
     <Link href="/business" className="dark-link">Open the business workspace <ArrowRight size={18}/></Link>
    </div>
    <div className="outcome-stack">{businessOutcomes.map((item,index)=><div className="outcome-card" key={item}><span>0{index+1}</span><strong>{item}</strong><ChevronRight/></div>)}</div>
    <div className="business-value">
     <div><HeartHandshake/><strong>Affordable support</strong><p>Pay for a defined outcome instead of carrying a full-time salary.</p></div>
     <div><ShieldCheck/><strong>Lower training burden</strong><p>Workers practise first and receive step-by-step guidance during delivery.</p></div>
     <div><BadgeCheck/><strong>Discover trusted talent</strong><p>Rebook reliable people or invite them into bigger opportunities later.</p></div>
    </div>
   </section>

   <section className="difference-section">
    <div className="difference-heading"><span className="section-kicker light">Why Nala is different</span><h2>Not another job board. Not another certificate.</h2></div>
    <div className="comparison-grid">
     <div className="comparison-muted"><span>TYPICAL JOB PLATFORM</span><h3>Lists opportunities</h3><p>Then asks applicants to already have the experience, references and confidence needed to compete.</p></div>
     <div className="comparison-arrow"><ArrowRight/></div>
     <div className="comparison-nala"><span>NALA</span><h3>Creates the first credible experience</h3><p>Practice → paid work → business verification → portable proof → better opportunity.</p></div>
    </div>
   </section>

   <section className="safety-section" id="trust">
    <div className="safety-copy"><span className="section-kicker">Dignity and safety by design</span><h2>Starter work should never mean exploitative work.</h2><p>Nala is designed around transparent expectations, fair treatment and controlled access to business information.</p></div>
    <div className="safeguard-list">{safeguards.map(item=><div key={item}><span><Check size={15}/></span>{item}</div>)}</div>
   </section>

   <section className="final-cta">
    <div className="cta-mark">nala.</div>
    <h2>Your first chance should lead somewhere.</h2>
    <p>Earn the first income. Build the first proof. Unlock the next opportunity.</p>
    <div className="hero-actions centered"><Link href="/worker" className="primary-cta light-cta">Start as a worker <ArrowRight size={19}/></Link><Link href="/business" className="secondary-cta dark-secondary">Create work for someone <Building2 size={18}/></Link></div>
   </section>
  </main>
  <footer className="site-footer"><div><strong>nala.</strong><p>Real work. Real proof. Real progress.</p></div><div className="footer-links"><a href="#why-nala">Why Nala</a><a href="#how-it-works">How it works</a><a href="#for-business">For businesses</a><a href="#trust">Trust & safety</a></div><div className="footer-note">Built in South Africa. Designed to travel.</div></footer>
 </div>
}