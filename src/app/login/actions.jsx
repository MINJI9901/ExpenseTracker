"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function authenticateUser() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  return data?.user || null;
}

export async function login(formData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  try {
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      console.log("error: ", error);
      return false;
    }
  } catch {
    console.log("login failed");
    return false;
  }

  revalidatePath("/", "layout");
  redirect("/?redirected=true");
}

export async function signup(formData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // console.log("signup data: ", data);

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/?redirected=true");
}

// export async function handleSignInWithGoogle(response) {
//   const supabase = await createClient();

//   const { data, error } = await supabase.auth.signInWithIdToken({
//     provider: "google",
//     token: response.credential,
//     options: {
//       redirectTo: `${NEXT_PUBLIC_API_URL}/auth/callback`,
//     },
//   });

//   console.log(data);
// }
export async function signInWith(provider) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_API_URL}/auth/callback`,
    },
  });

  if (error) {
    console.log(`error in signing in with ${provider}: `, error);
  }
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function deleteUser(userId) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    console.log(error);
    return error;
  }

  redirect("/login");
}
