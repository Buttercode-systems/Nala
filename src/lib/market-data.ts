import {createClient} from "@supabase/supabase-js";

export const NALA_SUPABASE_URL=process.env.NEXT_PUBLIC_SUPABASE_URL||"https://cvmycngyaaqfyfeaaszh.supabase.co";
export const NALA_SUPABASE_PUBLISHABLE_KEY=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY||"sb_publishable_DpLaemlmu92uqntbAu2dGw_5_3HjSOU";

export type MarketHealth={id:string;slug:string;name:string;geography:string;verticals:string[];status:string;worker_capacity:number;active_worker_count:number;funded_open_task_count:number;funded_tasks_per_active_worker:number|null;health_band:string;last_reviewed_at:string|null};
export type TaskProduct={id:string;slug:string;title:string;category:string;verticals:string[];status:string;outcome:string;source_inputs:string[];completion_checklist:string[];evidence_requirements:string[];prohibited_information:string[];readiness_simulation_id:string|null;expected_active_minutes:number;expected_revision_minutes:number;minimum_worker_pay_cents:number;revision_limit:number;remote_capable:boolean};

function client(){return createClient(NALA_SUPABASE_URL,NALA_SUPABASE_PUBLISHABLE_KEY,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}})}

export async function getPublicMarketData():Promise<{cells:MarketHealth[];products:TaskProduct[];source:"supabase"|"fallback";error?:string}>{
 try{
  const supabase=client();
  const [{data:cells,error:cellError},{data:products,error:productError}]=await Promise.all([
   supabase.from("market_health_public").select("*").order("name"),
   supabase.from("task_products").select("id,slug,title,category,verticals,status,outcome,source_inputs,completion_checklist,evidence_requirements,prohibited_information,readiness_simulation_id,expected_active_minutes,expected_revision_minutes,minimum_worker_pay_cents,revision_limit,remote_capable").in("status",["pilot","available"]).order("category").order("title")
  ]);
  if(cellError||productError)throw new Error(cellError?.message||productError?.message||"Market data unavailable");
  return {cells:(cells||[]) as MarketHealth[],products:(products||[]) as TaskProduct[],source:"supabase"};
 }catch(error){
  return {cells:[],products:[],source:"fallback",error:error instanceof Error?error.message:"Market data unavailable"};
 }
}

export function formatRand(cents:number){return new Intl.NumberFormat("en-ZA",{style:"currency",currency:"ZAR",maximumFractionDigits:0}).format(cents/100)}
export function healthLabel(value:string){return ({building_supply:"Building task supply",severe_worker_oversupply:"Worker intake paused",thin_demand:"Limited task supply",developing:"Controlled cohort growth",healthy:"Healthy pilot capacity",worker_shortage:"Recruiting ready workers"} as Record<string,string>)[value]||value.replaceAll("_"," ")}
