import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { AuthUtils, UserRole, Permission, PasswordUtils } from '@/lib/auth'
import { PasswordGenerator } from '@/lib/password-generator'

// GET /api/admin/users - Get all users (Admin only)
export async function GET(request: NextRequest) {
  try {
    // Check admin permissions
    await AuthUtils.requirePermission(request, Permission.MANAGE_USERS)

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const role = searchParams.get('role') as UserRole | null
    const search = searchParams.get('search') || ''

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (role) {
      where.role = role
    }
    
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          verified: true,
          createdAt: true,
          nationality: true,
          _count: {
            select: {
              applications: true,
              counselingSessions: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({ where })
    ])

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching users:', error)
    
    if (error instanceof Error) {
      if (error.message === 'Authentication required') {
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
      }
      if (error.message === 'Insufficient permissions') {
        return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
      }
    }

    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// POST /api/admin/users - Create user (Admin only)
export async function POST(request: NextRequest) {
  try {
    await AuthUtils.requirePermission(request, Permission.MANAGE_USERS)

    const data = await request.json()
    
    // Validate required fields
    const requiredFields = ['email', 'firstName', 'lastName', 'role']
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    let userData: any = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      name: `${data.firstName} ${data.lastName}`,
      role: data.role,
      nationality: data.nationality || '',
      verified: data.verified || false
    }

    let generatedPassword: string | undefined

    // Generate password for counselors
    if (data.role === UserRole.COUNSELOR) {
      generatedPassword = PasswordGenerator.generateTemporaryPassword()
      userData.password = await PasswordUtils.hash(generatedPassword)
      userData.requirePasswordChange = true
    }

    // Create user
    const user = await prisma.user.create({
      data: userData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        verified: true,
        requirePasswordChange: true,
        createdAt: true
      }
    })

    const response: any = user
    
    // Include generated password in response for counselors
    if (generatedPassword) {
      response.tempPassword = generatedPassword
    }

    return NextResponse.json(response, { status: 201 })

  } catch (error) {
    console.error('Error creating user:', error)
    
    if (error instanceof Error) {
      if (error.message === 'Authentication required') {
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
      }
      if (error.message === 'Insufficient permissions') {
        return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
      }
    }

    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}