'use server';

import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {z} from "zod";
import type {SupabaseClient,User} from "@supabase/supabase-js";
import {createServerSupabaseClient} from "@/lib/supabase/server";

const schema=z.object({
 email:z.string().email(),
 password:z.string().min(8),
 displayName:z.string().trim().min(2).max(80).optional(),
 role:z.enum(["worker","business"]),
 mode:z.enum(["signin","signup"]),
 next:z.string().optional(),
 intent:z.string().max(120).optional()
});

function safeNext(value:string|undefined,fallback:string){return value?.startsWith("/")&&!value.startsWith("//")?value:fallback}
function authUrl(role:string,next:string,intent:string|undefined,key:"error"|"message",value:string){return `/auth?role=${role}&next=${encodeURIComponent(next)}&intent=${encodeURIComponent(intent||"continue")}&${key}=${encodeURIComponent(value)}`}
function go(path:string):never{return redirect(path as never)}

async function ensureRoleProfile(supabase:SupabaseClient,user:User,requestedName?:string){
 const role=user.user_metadata?.role==="business"?"business":"worker";
 const displayName=(requestedName||user.user_metadata?.display_name||user.email?.split("@")[0]||"Nala member").trim();
 if(role==="business"){
  const {data}=await supabase.from("business_profiles").select("id").eq("owner_user_id",user.id).maybeSingle();
  if(!data)await supabase.from("business_profiles").insert({owner_user_id:user.id,name:displayName,vertical:"unselected"});
 }else{
  const {data}=await supabase.from("worker_profiles").select("id").eq("owner_user_id",user.id).maybeSingle();
  if(!data)await supabase.from("worker_profiles").insert({owner_user_id:user.id,display_name:displayName});
 }
 return role;
}

export async function authenticate(formData:FormData){
 const parsed=schema.safeParse({
  email:formData.get("email"),password:formData.get("password"),displayName:formData.get("displayName")||undefined,
  role:formData.get("role"),mode:formData.get("mode"),next:formData.get("next")||undefined,intent:formData.get("intent")||undefined
 });
 if(!parsed.success)go("/auth?error=Please+check+your+details");
 const {email,password,displayName,role,mode,intent}=parsed.data;
 const next=safeNext(parsed.data.next,`/${role}`);
 const supabase=await createServerSupabaseClient();
 if(mode==="signup"){
  if(!displayName)go(authUrl(role,next,intent,"error","Please enter your name"));
  const requestHeaders=await headers();
  const origin=requestHeaders.get("origin")||"https://nala-sa.vercel.app";
  const confirmationNext=`${next}${next.includes("?")?"&":"?"}auth=confirmed`;
  const {data,error}=await supabase.auth.signUp({email,password,options:{emailRedirectTo:`${origin}/auth/confirm?next=${encodeURIComponent(confirmationNext)}`,data:{role,display_name:displayName}}});
  if(error)go(authUrl(role,next,intent,"error",error.message));
  if(data.session&&data.user){
   await ensureRoleProfile(supabase,data.user,displayName);
   go(next);
  }
  go(authUrl(role,next,intent,"message","Check your email to confirm your account."));
 }
 const {data,error}=await supabase.auth.signInWithPassword({email,password});
 if(error)go(authUrl(role,next,intent,"error",error.message));
 await ensureRoleProfile(supabase,data.user,displayName);
 go(next);
}
