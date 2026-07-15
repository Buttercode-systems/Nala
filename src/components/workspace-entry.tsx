"use client";

import {ProductionApp,type WorkspaceRole,type WorkspaceView} from "@/components/production-app";

export function WorkspaceEntry({role,initialView="dashboard"}:{role:WorkspaceRole;initialView?:WorkspaceView}){
 return <ProductionApp role={role} initialView={initialView}/>;
}
