import {createClient} from "@supabase/supabase-js";

const supabaseUrl=process.env.NEXT_PUBLIC_SUPABASE_URL||"https://cvmycngyaaqfyfeaaszh.supabase.co";
const supabasePublishableKey=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY||"sb_publishable_DpLaemlmu92uqntbAu2dGw_5_3HjSOU";

/**
 * Public/browse-first Supabase client.
 *
 * The publishable key is intentionally safe for browser use. Database RLS remains
 * the authorization boundary. Browsing task products and market-health views does
 * not require authentication; privileged lifecycle mutations do.
 */
export const publicSupabase=createClient(supabaseUrl,supabasePublishableKey,{
 auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false},
 global:{headers:{"x-client-info":"nala-public-web"}},
});
