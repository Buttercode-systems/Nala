"use client";

import {useEffect,useState} from "react";
import {NalaApp} from "@/components/nala-app";

type WorkspaceRole="worker"|"business"|"admin";
type WorkspaceView="dashboard"|"market"|"task"|"workbench"|"passport"|"create"|"reviews"|"operations";

const STORAGE_KEY="nala-premium-demo";

export function WorkspaceEntry({role,initialView="dashboard"}:{role:WorkspaceRole;initialView?:WorkspaceView}){
 const [ready,setReady]=useState(false);
 useEffect(()=>{
  try{
   const raw=localStorage.getItem(STORAGE_KEY);
   const current=raw?JSON.parse(raw):{};
   localStorage.setItem(STORAGE_KEY,JSON.stringify({...current,role}));
  }catch{
   localStorage.removeItem(STORAGE_KEY);
   localStorage.setItem(STORAGE_KEY,JSON.stringify({role}));
  }
  setReady(true);
 },[role]);
 if(!ready)return <main className="grid min-h-screen place-items-center bg-sand"><div className="text-center"><div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-leaf border-t-forest"/><p className="mt-4 font-bold">Opening your {role} workspace…</p></div></main>;
 return <div className={`workspace-role-${role}`}><NalaApp initialView={initialView}/></div>;
}
