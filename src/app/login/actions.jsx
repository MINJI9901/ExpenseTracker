'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function authenticateUser() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  // if (error || !data?.user) {
  //     redirect('/login')
  // }
  // console.log('supabase: ', supabase)
  // console.log('data: ', data)
  // console.log('error: ', error)


  return data?.user
}

export async function login(formData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  try {
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    }
  
    const { error } = await supabase.auth.signInWithPassword(data)
  
    if (error) {
      return false
    }
  } catch {
    return false;
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  console.log('signup data: ', data)

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function logout() {
  const supabase = await createClient()

  // const data = {
  //   email: formData.get('email'),
  //   password: formData.get('password'),
  // }

  // console.log('logout data: ', data)

  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}