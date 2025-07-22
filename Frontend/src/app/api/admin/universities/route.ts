import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import University from '@/lib/models/University';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const country = searchParams.get('country') || '';
    const status = searchParams.get('status') || 'all';

    // Build query
    const query: any = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } }
      ];
    }

    if (country) {
      query.country = { $regex: country, $options: 'i' };
    }

    if (status !== 'all') {
      if (status === 'active') {
        query.isActive = true;
      } else if (status === 'inactive') {
        query.isActive = false;
      } else if (status === 'verified') {
        query.isVerified = true;
      } else if (status === 'unverified') {
        query.isVerified = false;
      } else if (status === 'featured') {
        query.featured = true;
      }
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Fetch universities
    const [universities, totalCount] = await Promise.all([
      University.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      University.countDocuments(query)
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      success: true,
      data: {
        universities,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Universities API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch universities' },
      { status: 500 }
    );
  }
}