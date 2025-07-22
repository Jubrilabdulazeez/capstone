import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Scholarship from '@/lib/models/Scholarship';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const country = searchParams.get('country') || '';
    const type = searchParams.get('type') || '';
    const status = searchParams.get('status') || 'all';

    // Build query
    const query: any = {};
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { provider: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } }
      ];
    }

    if (country) {
      query.country = { $regex: country, $options: 'i' };
    }

    if (type) {
      query.type = type;
    }

    if (status !== 'all') {
      if (status === 'active') {
        query.isActive = true;
      } else if (status === 'inactive') {
        query.isActive = false;
      } else if (status === 'featured') {
        query.featured = true;
      } else if (status === 'expired') {
        query.applicationDeadline = { $lt: new Date() };
      } else if (status === 'open') {
        query.applicationDeadline = { $gte: new Date() };
      }
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Fetch scholarships
    const [scholarships, totalCount] = await Promise.all([
      Scholarship.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Scholarship.countDocuments(query)
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      success: true,
      data: {
        scholarships,
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
    console.error('Scholarships API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch scholarships' },
      { status: 500 }
    );
  }
}