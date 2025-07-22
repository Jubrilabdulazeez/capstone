import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PasswordUtils, TokenUtils } from '@/lib/auth'

// POST /api/auth/signin-password - Sign in with email and password (for counselors)
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { email, password } = data

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        password: true,
        requirePasswordChange: true,
        verified: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check if user has a password (only counselors should have passwords)
    if (!user.password) {
      return NextResponse.json(
        { error: 'This account does not support password authentication' },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await PasswordUtils.verify(password, user.password)
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate session token
    const sessionToken = TokenUtils.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    })

    const response = NextResponse.json({
      message: 'Sign in successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        requirePasswordChange: user.requirePasswordChange,
        verified: user.verified
      },
      requirePasswordChange: user.requirePasswordChange
    })

    // Set session cookie
    response.cookies.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    return response

  } catch (error) {
    console.error('Error during password sign in:', error)
    
    return NextResponse.json(
      { error: 'Sign in failed' },
      { status: 500 }
    )
  }
}