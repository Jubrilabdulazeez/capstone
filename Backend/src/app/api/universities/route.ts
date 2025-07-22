import { NextRequest, NextResponse } from 'next/server'
import { UniversityService } from '@/lib/database'
import { getServerSession } from 'next-auth'

// GET /api/universities - Get all universities with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get('country') || undefined
    const ranking = searchParams.get('ranking') || undefined
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined

    const result = await UniversityService.getAll({
      country,
      ranking,
      limit,
      offset
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching universities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch universities' },
      { status: 500 }
    )
  }
}

// POST /api/universities - Create new university (Admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Check if user is admin (you'll need to implement this based on your auth)
    // if (session.user.role !== 'admin') {
    //   return NextResponse.json(
    //     { error: 'Admin access required' },
    //     { status: 403 }
    //   )
    // }

    const data = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'country', 'city', 'description', 'website', 'foundedYear', 'type']
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    const university = await UniversityService.create(data)
    
    return NextResponse.json(university, { status: 201 })
  } catch (error) {
    console.error('Error creating university:', error)
    return NextResponse.json(
      { error: 'Failed to create university' },
      { status: 500 }
    )
  }
}