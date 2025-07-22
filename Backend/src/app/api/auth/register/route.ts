import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PasswordUtils, SecurityUtils } from '@/lib/auth'
import { z } from 'zod'

// Validation schema
const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  role: z.enum(['STUDENT', 'COUNSELOR']).optional().default('STUDENT'),
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions')
})

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Registration request received:', body)
    
    // Validate input
    const validationResult = registerSchema.safeParse(body)
    if (!validationResult.success) {
      console.log('Validation failed:', validationResult.error.issues)
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

    const { email, password, firstName, lastName, nationality, role } = validationResult.data

    // Sanitize inputs
    const sanitizedEmail = SecurityUtils.sanitizeInput(email.toLowerCase())
    const sanitizedFirstName = SecurityUtils.sanitizeInput(firstName)
    const sanitizedLastName = SecurityUtils.sanitizeInput(lastName)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: sanitizedEmail }
    })

    if (existingUser) {
      await SecurityUtils.logSecurityEvent('REGISTRATION_ATTEMPT_DUPLICATE_EMAIL', {
        email: sanitizedEmail,
        ip: request.ip
      })
      
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Validate password strength
    const passwordValidation = PasswordUtils.validateStrength(password)
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { 
          error: 'Password does not meet security requirements',
          details: passwordValidation.errors
        },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await PasswordUtils.hash(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        email: sanitizedEmail,
        firstName: sanitizedFirstName,
        lastName: sanitizedLastName,
        name: `${sanitizedFirstName} ${sanitizedLastName}`,
        nationality,
        role: role as any,
        password: hashedPassword,
        verified: false,
        requirePasswordChange: false
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        verified: true,
        createdAt: true
      }
    })

    await SecurityUtils.logSecurityEvent('USER_REGISTERED', {
      userId: user.id,
      email: sanitizedEmail,
      role,
      ip: request.ip
    })

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          verified: user.verified
        }
      },
      { 
        status: 201,
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Credentials': 'true',
        }
      }
    )

  } catch (error) {
    console.error('Registration error:', error)
    
    await SecurityUtils.logSecurityEvent('REGISTRATION_ERROR', {
      error: error instanceof Error ? error.message : 'Unknown error',
      ip: request.ip
    })

    return NextResponse.json(
      { error: 'Internal server error during registration' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Credentials': 'true',
        }
      }
    )
  }
}