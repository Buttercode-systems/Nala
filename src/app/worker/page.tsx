import Link from "next/link";
import {BadgeCheck,Sparkles} from "lucide-react";
import {WorkspaceEntry} from "@/components/workspace-entry";
import {WorkerCorePrompt} from "@/components/worker-core-prompt";

export default function WorkerPage(){
 return <>
  <WorkspaceEntry role="worker" initialView="dashboard"/>
  <WorkerCorePrompt/>
  <nav className="progression-dock" aria-label="Worker progression">
   <Link href="/worker/growth" className="progression-launcher progression-launcher-primary" aria-label="Open My next step" title="Open My next step">
    <Sparkles size={15}/><span><small>YOUR JOURNEY</small>My next step</span>
   </Link>
   <Link href="/worker/passport-export" className="progression-launcher progression-launcher-secondary" aria-label="Open Work Passport export" title="Open Work Passport export">
    <BadgeCheck size={15}/><span><small>PORTABLE PROOF</small>Work Passport</span>
   </Link>
  </nav>
 </>;
}
