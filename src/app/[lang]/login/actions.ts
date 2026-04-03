"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signInWithEmail(formData: FormData) {
  const lang = formData.get("lang") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    redirect(`/${lang}/login?error=invalid`);
  }

  redirect(`/${lang}`);
}

export async function signUpWithEmail(formData: FormData) {
  const lang = formData.get("lang") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    redirect(`/${lang}/login?error=signup`);
  }

  redirect(`/${lang}`);
}

export async function signOut(formData: FormData) {
  const lang = formData.get("lang") as string;
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(`/${lang}/login`);
}
