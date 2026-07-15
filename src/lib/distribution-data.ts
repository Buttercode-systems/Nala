import {createClient} from "@supabase/supabase-js";
import {NALA_SUPABASE_PUBLISHABLE_KEY,NALA_SUPABASE_URL} from "@/lib/market-data";

export type DistributionReadiness={market_cell_id:string;market_cell_name:string;geography:string;status:string;worker_capacity:number;active_worker_count:number;funded_open_task_count:number;active_task_products:number;active_partner_cohorts:number;verified_businesses:number;recurring_plans:number;last_reviewed_at:string|null};

export async function getDistributionReadiness(){try{const client=createClient(NALA_SUPABASE_URL,NALA_SUPABASE_PUBLISHABLE_KEY,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});const {data,error}=await client.from("distribution_readiness_public").select("*").order("market_cell_name");if(error)throw error;return {rows:(data||[]) as DistributionReadiness[],source:"supabase" as const};}catch(error){return {rows:[] as DistributionReadiness[],source:"fallback" as const,error:error instanceof Error?error.message:"Distribution data unavailable"}}}
