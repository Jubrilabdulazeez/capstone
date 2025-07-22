import { NextRequest, NextResponse } from 'next/server'
import { UserService } from '@/lib/database'
import { getServerSession } from 'next-auth'

// GET /api/users/profile - Get current user profile
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const user = await UserService.getByEmail(session.user.email)
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Remove sensitive information
    const { ...userProfile } = user
    
    return NextResponse.json(userProfile)
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    )
  }
}

// PUT /api/users/profile - Update current user profile
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const user = await UserService.getByEmail(session.user.email)
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const data = await request.json()
    
    // Remove fields that shouldn't be updated via this endpoint
    const { id, email, role, createdAt, updatedAt, ...updateData } = data
    
    const updatedUser = await UserService.update(user.id, updateData)
    
    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error updating user profile:', error)
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    )
  }
}