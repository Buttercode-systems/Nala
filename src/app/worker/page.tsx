import Link from "next/link";
import {Sparkles} from "lucide-react";
import {WorkspaceEntry} from "@/components/workspace-entry";

export default function WorkerPage(){
 return <>
  <WorkspaceEntry role="worker" initialView="dashboard"/>
  <Link href="/worker/growth" className="progression-launcher" aria-label="Open My next step" title="Open My next step">
   <Sparkles size={15}/>My next step
  </Link>
 </>;
}