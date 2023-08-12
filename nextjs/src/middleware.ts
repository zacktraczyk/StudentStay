import { NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user && req.nextUrl.pathname.startsWith('/profile')) {
    return NextResponse.rewrite(new URL('/', req.url))
  }

  if ((user && req.nextUrl.pathname == '/login') || req.nextUrl.pathname == '/signup') {
    return NextResponse.rewrite(new URL('/', req.url))
  }
  return res
}

export const config = {
  matcher: ['/profile:path*', '/login', '/signup'],
}
