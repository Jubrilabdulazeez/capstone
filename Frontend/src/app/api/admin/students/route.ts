import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { requireAdminAuth } from '@/lib/utils/adminAuth';

type StudentQuery = {
  role: string;
  $or?: Array<{ [key: string]: any }>;
  verified?: boolean;
};

export async function GET(request: NextRequest) {
  const authResult = await requireAdminAuth(request);
  if (authResult) return authResult;
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';

    // Build query
    const query: StudentQuery = { role: 'STUDENT' };
    
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (status !== 'all') {
      if (status === 'verified') {
        query.verified = true;
      } else if (status === 'unverified') {
        query.verified = false;
      }
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Fetch students
    const [students, totalCount] = await Promise.all([
      User.find(query)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      User.countDocuments(query)
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      success: true,
      data: {
        students,
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
    console.error('Students API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}