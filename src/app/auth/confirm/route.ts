import type {EmailOtpType} from "@supabase/supabase-js";
import {NextRequest,NextResponse} from "next/server";
import {createServerSupabaseClient} from "@/lib/supabase/server";

export async function GET(request:NextRequest){
 const url=new URL(request.url);
 const next=url.searchParams.get("next")||"/worker";
 const code=url.searchParams.get("code");
 const tokenHash=url.searchParams.get("token_hash");
 const type=url.searchParams.get("type") as EmailOtpType|null;
 const supabase=await createServerSupabaseClient();
 let error:Error|null=null;
 if(code){
  const result=await supabase.auth.exchangeCodeForSession(code);
  error=result.error;
 }else if(tokenHash&&type){
  const result=await supabase.auth.verifyOtp({token_hash:tokenHash,type});
  error=result.error;
 }else error=new Error("Missing confirmation token");
 if(error)return NextResponse.redirect(new URL(`/auth?error=${encodeURIComponent(error.message)}`,url.origin));
 const {data:{user}}=await supabase.auth.getUser();
 if(user){
  const role=user.user_metadata?.role==="business"?"business":"worker";
  const displayName=(user.user_metadata?.display_name||user.email?.split("@")[0]||"Nala member").trim();
  if(role==="business"){
   const {data}=await supabase.from("business_profiles").select("id").eq("owner_user_id",user.id).maybeSingle();
   if(!data)await supabase.from("business_profiles").insert({owner_user_id:user.id,name:displayName,vertical:"unselected"});
  }else{
   const {data}=await supabase.from("worker_profiles").select("id").eq("owner_user_id",user.id).maybeSingle();
   if(!data)await supabase.from("worker_profiles").insert({owner_user_id:user.id,display_name:displayName});
  }
 }
 return NextResponse.redirect(new URL(next,url.origin));
}
