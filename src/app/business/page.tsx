import Link from "next/link";
import {BriefcaseBusiness,MessageCircle,PackageSearch,Repeat2} from "lucide-react";
import {WorkspaceEntry} from "@/components/workspace-entry";

export default function BusinessPage(){return <>
 <WorkspaceEntry role="business" initialView="dashboard"/>
 <div className="fixed bottom-[72px] left-[18px] z-[55] flex max-w-[calc(100vw-36px)] flex-wrap gap-2 md:bottom-[18px]">
  <Link href="/business/how-nala-works" className="business-model-link !static"><BriefcaseBusiness size={15}/>How Nala works</Link>
  <Link href="/business/package-task" className="business-model-link !static"><PackageSearch size={15}/>Package a task</Link>
  <Link href="/business/operations" className="business-model-link !static"><Repeat2 size={15}/>Plan recurring work</Link>
  <Link href="/business/intake" className="business-model-link !static"><MessageCircle size={15}/>Submit a business need</Link>
 </div>
 </>}
