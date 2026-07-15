import Link from "next/link";
import {BadgeCheck,Bell,Sparkles} from "lucide-react";
import {WorkspaceEntry} from "@/components/workspace-entry";

export default function WorkerPage(){
 return <>
  <WorkspaceEntry role="worker" initialView="dashboard"/>
  <nav className="progression-dock" aria-label="Worker progression">
   <Link href="/worker/availability" className="progression-launcher progression-launcher-secondary" aria-label="Open live availability" title="Open live availability">
    <Bell size={15}/><span><small>REAL MARKET STATUS</small>Availability</span>
   </Link>
   <Link href="/worker/growth" className="progression-launcher progression-launcher-primary" aria-label="Open My next step" title="Open My next step">
    <Sparkles size={15}/><span><small>YOUR JOURNEY</small>My next step</span>
   </Link>
   <Link href="/worker/passport-export" className="progression-launcher progression-launcher-secondary" aria-label="Open Work Passport export" title="Open Work Passport export">
    <BadgeCheck size={15}/><span><small>PORTABLE PROOF</small>Work Passport</span>
   </Link>
  </nav>
 </>;
}