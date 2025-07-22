import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Handle CORS for all API routes
  const corsHeaders = {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  }

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders,
    })
  }

  // Get the pathname of the request
  const { pathname } = request.nextUrl

  // Check if this is an API route that requires authentication
  if (pathname.startsWith('/api/')) {
    // Skip authentication for public endpoints
    const publicEndpoints = [
      '/api/health',
      '/api/openapi',
      '/api/auth/signin-password',
      '/api/auth/register',
      '/api/auth/',
      '/api/universities',
      '/api/universities/search'
    ]

    const isPublicEndpoint = publicEndpoints.some(endpoint => 
      pathname.startsWith(endpoint)
    )

    if (!isPublicEndpoint) {
      // For now, skip token verification to avoid middleware errors
      // This can be re-enabled once the authentication system is fully set up
      return NextResponse.next({
        request: {
          headers: request.headers,
        },
      })
    }
  }

  // Add CORS headers to all responses
  const response = NextResponse.next()
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  
  return response
}

export const config = {
  matcher: [
    '/api/:path*'
  ]
}
