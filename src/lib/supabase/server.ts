import {createServerClient} from "@supabase/ssr";
import {cookies} from "next/headers";
import {NALA_SUPABASE_PUBLISHABLE_KEY,NALA_SUPABASE_URL} from "@/lib/market-data";

export async function createServerSupabaseClient(){
 const cookieStore=await cookies();
 return createServerClient(NALA_SUPABASE_URL,NALA_SUPABASE_PUBLISHABLE_KEY,{
  cookies:{
   getAll(){return cookieStore.getAll()},
   setAll(cookiesToSet){
    try{cookiesToSet.forEach(({name,value,options})=>cookieStore.set(name,value,options))}catch{}
   }
  }
 });
}
