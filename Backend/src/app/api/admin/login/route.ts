import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PasswordUtils, TokenUtils, SecurityUtils } from '@/lib/auth'
import { z } from 'zod'

// Validation schema for admin login
const adminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
})

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Admin login request received:', { email: body.email })
    
    // Validate input
    const validationResult = adminLoginSchema.safeParse(body)
    if (!validationResult.success) {
      console.log('Admin login validation failed:', validationResult.error.issues)
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.issues
        },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true',
          }
        }
      )
    }

    const { email, password } = validationResult.data

    // Find user with ADMIN role
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        name: true,
        role: true,
        password: true,
        verified: true,
        createdAt: true
      }
    })

    if (!user) {
      console.log('Admin not found:', email)
      await SecurityUtils.logSecurityEvent('ADMIN_LOGIN_FAILED_USER_NOT_FOUND', {
        email,
        ip: request.ip
      })
      
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { 
          status: 401,
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true',
          }
        }
      )
    }

    // Check if user has ADMIN role
    if (user.role !== 'ADMIN') {
      console.log('User is not an admin:', email, 'Role:', user.role)
      await SecurityUtils.logSecurityEvent('ADMIN_LOGIN_FAILED_INSUFFICIENT_PRIVILEGES', {
        userId: user.id,
        email,
        role: user.role,
        ip: request.ip
      })
      
      return NextResponse.json(
        { error: 'Access denied. Admin privileges required.' },
        { 
          status: 403,
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true',
          }
        }
      )
    }

    // Verify password
    if (!user.password) {
      console.log('Admin account has no password set:', email)
      return NextResponse.json(
        { error: 'Account configuration error. Please contact system administrator.' },
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true',
          }
        }
      )
    }

    const isPasswordValid = await PasswordUtils.verify(password, user.password)
    if (!isPasswordValid) {
      console.log('Invalid password for admin:', email)
      await SecurityUtils.logSecurityEvent('ADMIN_LOGIN_FAILED_INVALID_PASSWORD', {
        userId: user.id,
        email,
        ip: request.ip
      })
      
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { 
          status: 401,
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true',
          }
        }
      )
    }

    // Generate admin session token
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      type: 'admin',
      loginTime: new Date().toISOString()
    }

    const sessionToken = TokenUtils.generateToken(tokenPayload)

    // Log successful admin login
    await SecurityUtils.logSecurityEvent('ADMIN_LOGIN_SUCCESS', {
      userId: user.id,
      email: user.email,
      ip: request.ip
    })

    console.log('Admin login successful:', email)

    return NextResponse.json(
      {
        success: true,
        message: 'Admin login successful',
        admin: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          name: user.name,
          role: user.role,
          verified: user.verified,
          createdAt: user.createdAt
        },
        token: sessionToken
      },
      { 
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Credentials': 'true',
        }
      }
    )

  } catch (error) {
    console.error('Admin login error:', error)
    
    await SecurityUtils.logSecurityEvent('ADMIN_LOGIN_ERROR', {
      error: error instanceof Error ? error.message : 'Unknown error',
      ip: request.ip
    })

    return NextResponse.json(
      { error: 'Internal server error during admin login' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Access-Control-Allow-Credentials': 'true',
        }
      }
    )
  }
}