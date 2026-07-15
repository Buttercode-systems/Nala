import {createBrowserClient} from "@supabase/ssr";
import {NALA_SUPABASE_PUBLISHABLE_KEY,NALA_SUPABASE_URL} from "@/lib/market-data";

export function createBrowserSupabaseClient(){
 return createBrowserClient(NALA_SUPABASE_URL,NALA_SUPABASE_PUBLISHABLE_KEY);
}
