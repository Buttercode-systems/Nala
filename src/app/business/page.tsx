import Link from "next/link";
import {BriefcaseBusiness,Repeat2} from "lucide-react";
import {WorkspaceEntry} from "@/components/workspace-entry";

export default function BusinessPage(){return <>
 <WorkspaceEntry role="business" initialView="dashboard"/>
 <div className="fixed bottom-[72px] left-[18px] z-[55] flex flex-col gap-2 md:bottom-[18px] md:flex-row">
  <Link href="/business/how-nala-works" className="business-model-link !static"><BriefcaseBusiness size={15}/>How Nala works</Link>
  <Link href="/business/operations" className="business-model-link !static"><Repeat2 size={15}/>Plan recurring work</Link>
 </div>
 </>}
