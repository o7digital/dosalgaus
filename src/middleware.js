import { NextResponse } from 'next/server'
import { ONLINE_SALES_ENABLED } from './lib/storefront'

export function middleware(request) {
  const { pathname } = request.nextUrl
  const locale = pathname.match(/^\/(en|es|de|fr|it|pt)(?=\/|$)/)?.[0] || ''
  const storePath = pathname.slice(locale.length).replace(/\/$/, '')
  if (!ONLINE_SALES_ENABLED && (
    /^\/shop\/product(?:\/|$|-)/.test(storePath) ||
    /^\/product(?:\/|$|-)/.test(storePath) ||
    /^\/shop\/(?:accordion|countdown|full-content|gallery-grid|low-stock-notice|notify-me|out-of-stock|scroll-1-column|vertical|video-popup)(?:\/|$)/.test(storePath) ||
    /^\/(?:shop\/)?(?:cart|checkout)(?:\/|$)/.test(storePath)
  )) {
    return NextResponse.redirect(new URL(`${locale}/shop`, request.url), 307)
  }

  const host = request.headers.get('host') || ''
  const productionHosts = new Set([
    'dosalga.store',
    'www.dosalga.store',
    'dosalga.online',
    'www.dosalga.online',
  ])
  if (!productionHosts.has(host)) return NextResponse.next()

  const maintenanceValue = String(process.env.MAINTENANCE || process.env.NEXT_PUBLIC_MAINTENANCE || '').toLowerCase()
  const maintenanceEnabled = maintenanceValue === '1' || maintenanceValue === 'true' || maintenanceValue === 'on'
  if (!maintenanceEnabled) return NextResponse.next()

  // Allow the maintenance page itself and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    pathname === '/maintenance'
  ) {
    return NextResponse.next()
  }

  return NextResponse.rewrite(new URL('/maintenance', request.url))
}

export const config = {
  matcher: '/:path*'
}
