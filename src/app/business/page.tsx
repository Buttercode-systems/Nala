import Link from "next/link";
import {BriefcaseBusiness} from "lucide-react";
import {WorkspaceEntry} from "@/components/workspace-entry";

export default function BusinessPage(){return <>
 <WorkspaceEntry role="business" initialView="dashboard"/>
 <Link href="/business/how-nala-works" className="business-model-link"><BriefcaseBusiness size={15}/>How Nala works for business</Link>
 </>}
