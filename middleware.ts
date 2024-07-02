import { get, has } from '@vercel/edge-config'
import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.next()
  }

  const paths = request.nextUrl.pathname.split('/')
  const edgeConfigKeyExists = await has(paths[1]!)

  if (edgeConfigKeyExists) {
    return NextResponse.redirect((await get(paths[1]!)) as string)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|icon.svg).*)'],
}
