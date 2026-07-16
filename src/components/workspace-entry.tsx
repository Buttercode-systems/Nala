"use client";

import {BrowseFirstGate} from "@/components/browse-first-gate";
import {ProductionApp,type WorkspaceRole,type WorkspaceView} from "@/components/production-app";

export function WorkspaceEntry({role,initialView="dashboard"}:{role:WorkspaceRole;initialView?:WorkspaceView}){
 return <BrowseFirstGate role={role}><ProductionApp role={role} initialView={initialView}/></BrowseFirstGate>;
}
