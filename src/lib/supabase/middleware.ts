import {createServerClient} from "@supabase/ssr";
import {NextResponse,type NextRequest} from "next/server";
import {NALA_SUPABASE_PUBLISHABLE_KEY,NALA_SUPABASE_URL} from "@/lib/supabase/config";

export async function refreshSupabaseSession(request:NextRequest){
 let response=NextResponse.next({request});
 const supabase=createServerClient(NALA_SUPABASE_URL,NALA_SUPABASE_PUBLISHABLE_KEY,{
  cookies:{
   getAll(){return request.cookies.getAll()},
   setAll(cookiesToSet){
    cookiesToSet.forEach(({name,value})=>request.cookies.set(name,value));
    response=NextResponse.next({request});
    cookiesToSet.forEach(({name,value,options})=>response.cookies.set(name,value,options));
   }
  }
 });
 await supabase.auth.getUser();
 return response;
}
