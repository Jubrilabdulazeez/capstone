import { NextRequest, NextResponse } from 'next/server'
import { AuthUtils, UserRole, Permission } from './auth'

// Middleware factory for different protection levels
export function withAuth() {
  return async (request: NextRequest) => {
    try {
      const user = await AuthUtils.requireAuth(request)
      
      // Add user to request headers for downstream handlers
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-user-id', user.id)
      requestHeaders.set('x-user-role', user.role)
      requestHeaders.set('x-user-email', user.email)

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    } catch (error) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }
  }
}

export function withRole(allowedRoles: UserRole[]) {
  return async (request: NextRequest) => {
    try {
      const user = await AuthUtils.requireRole(request, allowedRoles)
      
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-user-id', user.id)
      requestHeaders.set('x-user-role', user.role)
      requestHeaders.set('x-user-email', user.email)

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    } catch (error) {
      const statusCode = error instanceof Error && error.message === 'Authentication required' ? 401 : 403
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Access denied' },
        { status: statusCode }
      )
    }
  }
}

export function withPermission(permission: Permission) {
  return async (request: NextRequest) => {
    try {
      const user = await AuthUtils.requirePermission(request, permission)
      
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-user-id', user.id)
      requestHeaders.set('x-user-role', user.role)
      requestHeaders.set('x-user-email', user.email)

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    } catch (error) {
      const statusCode = error instanceof Error && error.message === 'Authentication required' ? 401 : 403
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Access denied' },
        { status: statusCode }
      )
    }
  }
}

// Rate limiting middleware
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export function withRateLimit(options: { maxRequests: number; windowMs: number }) {
  return async (request: NextRequest) => {
    const ip = request.ip || 'unknown'
    const now = Date.now()
    const windowStart = now - options.windowMs

    // Clean up old entries
    for (const [key, value] of rateLimitStore.entries()) {
      if (value.resetTime < now) {
        rateLimitStore.delete(key)
      }
    }

    const currentData = rateLimitStore.get(ip)
    
    if (!currentData) {
      rateLimitStore.set(ip, { count: 1, resetTime: now + options.windowMs })
      return NextResponse.next()
    }

    if (currentData.count >= options.maxRequests) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    currentData.count++
    return NextResponse.next()
  }
}

// Input validation middleware
export function withValidation<T>(schema: any) {
  return async (request: NextRequest) => {
    try {
      const body = await request.json()
      const validationResult = schema.safeParse(body)
      
      if (!validationResult.success) {
        return NextResponse.json(
          { 
            error: 'Validation failed',
            details: validationResult.error.issues
          },
          { status: 400 }
        )
      }

      // Add validated data to headers
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-validated-data', JSON.stringify(validationResult.data))

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }
  }
}

// Combine multiple middlewares
export function compose(...middlewares: Array<(req: NextRequest) => Promise<NextResponse>>) {
  return async (request: NextRequest) => {
    for (const middleware of middlewares) {
      const result = await middleware(request)
      if (result.status !== 200) {
        return result
      }
      // Update request with any headers set by middleware
      Object.assign(request, result.request || {})
    }
    return NextResponse.next()
  }
}