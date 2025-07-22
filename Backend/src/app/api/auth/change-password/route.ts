import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { AuthUtils, PasswordUtils } from '@/lib/auth'

// POST /api/auth/change-password - Change user password
export async function POST(request: NextRequest) {
  try {
    // Get current user
    const user = await AuthUtils.getCurrentUser(request)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const { currentPassword, newPassword } = data

    // Validate required fields
    if (!newPassword) {
      return NextResponse.json(
        { error: 'New password is required' },
        { status: 400 }
      )
    }

    // For first-time password change, current password may not be required
    if (!user.requirePasswordChange && !currentPassword) {
      return NextResponse.json(
        { error: 'Current password is required' },
        { status: 400 }
      )
    }

    // Validate current password if user is not forced to change
    if (!user.requirePasswordChange && user.password) {
      const isCurrentPasswordValid = await PasswordUtils.verify(
        currentPassword,
        user.password
      )

      if (!isCurrentPasswordValid) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 400 }
        )
      }
    }

    // Validate new password strength
    const passwordValidation = PasswordUtils.validateStrength(newPassword)
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { 
          error: 'Password does not meet requirements',
          details: passwordValidation.errors
        },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedNewPassword = await PasswordUtils.hash(newPassword)

    // Update user password and reset requirePasswordChange flag
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedNewPassword,
        requirePasswordChange: false
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        requirePasswordChange: true
      }
    })

    return NextResponse.json({
      message: 'Password changed successfully',
      user: updatedUser
    })

  } catch (error) {
    console.error('Error changing password:', error)
    
    return NextResponse.json(
      { error: 'Failed to change password' },
      { status: 500 }
    )
  }
}