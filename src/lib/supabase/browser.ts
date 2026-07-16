import {createBrowserClient} from "@supabase/ssr";
import {NALA_SUPABASE_PUBLISHABLE_KEY,NALA_SUPABASE_URL} from "@/lib/supabase/config";

export function createBrowserSupabaseClient(){
 return createBrowserClient(NALA_SUPABASE_URL,NALA_SUPABASE_PUBLISHABLE_KEY);
}
