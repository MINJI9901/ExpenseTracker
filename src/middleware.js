import { NextRequest, NextResponse } from 'next/server'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
// import { createClient } from '@/utils/supabase/client'
import { updateSession } from '@/utils/supabase/middleware'

// export async function middleware(request) {
//     // Update Supabase session
//     const response = await updateSession(request)

//     // Exclude static files, images, and favicon from middleware execution
//     const url = request.nextUrl
//     console.log('url: ', url)
//     if (
//         url.pathname.startsWith('/login') ||
//         url.pathname.startsWith('/auth')
//         // url.pathname.startsWith('/_next/static') ||
//         // url.pathname.startsWith('/_next/image') ||
//         // url.pathname.endsWith('.ico') ||
//         // url.pathname.match(/\.(svg|png|jpg|jpeg|gif|webp)$/)
//     ) {
//         console.log('Skipping middleware for:', url.pathname)
//         return NextResponse.next()
//     }

//     return response
// }

// export async function authenticateUser() {
//     const supabase = await createClient()

//     const { data, error } = await supabase.auth.getUser()
//     if (error || !data?.user) {
//         redirect('/login')
//     }
//     console.log('supabase: ', supabase)
//     console.log('data and error: ', data, error)

//     return data?.user
// }

// Since Next.js deprecated the old export const config format, you need to move the matcher logic inside the middleware() function.

export async function middleware(request) {
    return await updateSession(request)
}

export const config = {
    matcher: [
        /*
        * Match all request paths except for the ones starting with:
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - favicon.ico (favicon file)
        * Feel free to modify this pattern to include more paths.
        */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}