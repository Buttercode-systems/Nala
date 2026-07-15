import type {EmailOtpType} from "@supabase/supabase-js";
import {NextRequest,NextResponse} from "next/server";
import {createServerSupabaseClient} from "@/lib/supabase/server";

export async function GET(request:NextRequest){
 const url=new URL(request.url);
 const next=url.searchParams.get("next")||"/account";
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
 return NextResponse.redirect(new URL(next,url.origin));
}
