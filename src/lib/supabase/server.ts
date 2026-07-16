import {createServerClient,type CookieOptions} from "@supabase/ssr";
import {cookies} from "next/headers";
import {NALA_SUPABASE_PUBLISHABLE_KEY,NALA_SUPABASE_URL} from "@/lib/supabase/config";

type CookieToSet={name:string;value:string;options:CookieOptions};

export async function createServerSupabaseClient(){
 const cookieStore=await cookies();
 return createServerClient(NALA_SUPABASE_URL,NALA_SUPABASE_PUBLISHABLE_KEY,{
  cookies:{
   getAll(){return cookieStore.getAll()},
   setAll(cookiesToSet:CookieToSet[]){
    try{cookiesToSet.forEach(({name,value,options})=>cookieStore.set(name,value,options))}catch{}
   }
  }
 });
}
