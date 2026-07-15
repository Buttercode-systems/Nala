'use server';

import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {z} from "zod";
import {createServerSupabaseClient} from "@/lib/supabase/server";

const schema=z.object({
 email:z.string().email(),
 password:z.string().min(8),
 displayName:z.string().trim().min(2).max(80).optional(),
 role:z.enum(["worker","business"]),
 mode:z.enum(["signin","signup"])
});

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
  if(data.session)redirect(`/${role}`);
  redirect(`/auth?role=${role}&message=${encodeURIComponent("Check your email to confirm your account.")}`);
 }
 const {data,error}=await supabase.auth.signInWithPassword({email,password});
 if(error)redirect(`/auth?role=${role}&error=${encodeURIComponent(error.message)}`);
 const savedRole=data.user.user_metadata?.role==="business"?"business":"worker";
 redirect(`/${savedRole}`);
}
