import { NextRequest, NextResponse } from 'next/server'
import { UniversityService } from '@/lib/database'
import { getServerSession } from 'next-auth'

// GET /api/universities/[id] - Get university by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const university = await UniversityService.getById(params.id)
    
    if (!university) {
      return NextResponse.json(
        { error: 'University not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(university)
  } catch (error) {
    console.error('Error fetching university:', error)
    return NextResponse.json(
      { error: 'Failed to fetch university' },
      { status: 500 }
    )
  }
}

// PUT /api/universities/[id] - Update university (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const university = await UniversityService.update(params.id, data)
    
    if (!university) {
      return NextResponse.json(
        { error: 'University not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(university)
  } catch (error) {
    console.error('Error updating university:', error)
    return NextResponse.json(
      { error: 'Failed to update university' },
      { status: 500 }
    )
  }
}

// DELETE /api/universities/[id] - Delete university (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    await UniversityService.delete(params.id)
    
    return NextResponse.json({ message: 'University deleted successfully' })
  } catch (error) {
    console.error('Error deleting university:', error)
    return NextResponse.json(
      { error: 'Failed to delete university' },
      { status: 500 }
    )
  }
}