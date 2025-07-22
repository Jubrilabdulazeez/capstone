import { NextRequest, NextResponse } from 'next/server'
import { UniversityService } from '@/lib/database'

// GET /api/universities/search - Search universities
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      )
    }

    const universities = await UniversityService.search(query)
    
    return NextResponse.json({ universities })
  } catch (error) {
    console.error('Error searching universities:', error)
    return NextResponse.json(
      { error: 'Failed to search universities' },
      { status: 500 }
    )
  }
}