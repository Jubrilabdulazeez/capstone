import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { AuthUtils, Permission } from '@/lib/auth'

// GET /api/admin/users/[id] - Get user by ID (Admin only)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await AuthUtils.requirePermission(request, Permission.MANAGE_USERS)

    const user = await prisma.user.findUnique({
      where: { id: params.id },
      include: {
        qualifications: true,
        languageProficiencies: true,
        studyPreferences: true,
        applications: {
          include: {
            university: { select: { name: true } },
            program: { select: { name: true } }
          }
        },
        counselingSessions: {
          orderBy: { date: 'desc' },
          take: 10
        },
        _count: {
          select: {
            applications: true,
            counselingSessions: true,
            savedUniversities: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(user)

  } catch (error) {
    console.error('Error fetching user:', error)
    
    if (error instanceof Error) {
      if (error.message === 'Authentication required') {
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
      }
      if (error.message === 'Insufficient permissions') {
        return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
      }
    }

    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/users/[id] - Update user (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await AuthUtils.requirePermission(request, Permission.MANAGE_USERS)

    const data = await request.json()
    
    // Remove fields that shouldn't be updated
    const { id, email, createdAt, updatedAt, ...updateData } = data

    const user = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        verified: true,
        nationality: true,
        updatedAt: true
      }
    })

    return NextResponse.json(user)

  } catch (error) {
    console.error('Error updating user:', error)
    
    if (error instanceof Error) {
      if (error.message === 'Authentication required') {
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
      }
      if (error.message === 'Insufficient permissions') {
        return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
      }
    }

    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/users/[id] - Delete user (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await AuthUtils.requirePermission(request, Permission.MANAGE_USERS)

    // Get current user to prevent self-deletion
    const currentUser = await AuthUtils.getCurrentUser(request)
    
    if (currentUser?.id === params.id) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 400 }
      )
    }

    await prisma.user.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'User deleted successfully' })

  } catch (error) {
    console.error('Error deleting user:', error)
    
    if (error instanceof Error) {
      if (error.message === 'Authentication required') {
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
      }
      if (error.message === 'Insufficient permissions') {
        return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
      }
    }

    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}