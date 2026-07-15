import Link from "next/link";
import {Sparkles} from "lucide-react";
import {WorkspaceEntry} from "@/components/workspace-entry";
export default function WorkerPage(){return <><WorkspaceEntry role="worker" initialView="dashboard"/><Link href="/worker/growth" className="progression-launcher"><Sparkles size={15}/>My next step</Link></>}
