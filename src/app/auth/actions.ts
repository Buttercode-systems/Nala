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
 mode:z.enum(["signin","signup"])
});

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
  role:formData.get("role"),mode:formData.get("mode")
 });
 if(!parsed.success)redirect("/auth?error=Please+check+your+details");
 const {email,password,displayName,role,mode}=parsed.data;
 const supabase=await createServerSupabaseClient();
 if(mode==="signup"){
  if(!displayName)redirect(`/auth?role=${role}&error=Please+enter+your+name`);
  const requestHeaders=await headers();
  const origin=requestHeaders.get("origin")||"https://nala-sa.vercel.app";
  const {data,error}=await supabase.auth.signUp({email,password,options:{emailRedirectTo:`${origin}/auth/confirm?next=/${role}`,data:{role,display_name:displayName}}});
  if(error)redirect(`/auth?role=${role}&error=${encodeURIComponent(error.message)}`);
  if(data.session&&data.user){
   const savedRole=await ensureRoleProfile(supabase,data.user,displayName);
   redirect(`/${savedRole}`);
  }
  redirect(`/auth?role=${role}&message=${encodeURIComponent("Check your email to confirm your account.")}`);
 }
 const {data,error}=await supabase.auth.signInWithPassword({email,password});
 if(error)redirect(`/auth?role=${role}&error=${encodeURIComponent(error.message)}`);
 const savedRole=await ensureRoleProfile(supabase,data.user,displayName);
 redirect(`/${savedRole}`);
}
