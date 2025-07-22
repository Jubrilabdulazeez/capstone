import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Application from '@/lib/models/Application';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';
    const type = searchParams.get('type') || 'all';

    // Build query
    const query: any = {};
    
    if (search) {
      // We'll need to populate studentId to search by student name
      // For now, let's search by status or type
      query.$or = [
        { 'studentInfo.firstName': { $regex: search, $options: 'i' } },
        { 'studentInfo.lastName': { $regex: search, $options: 'i' } },
        { 'studentInfo.email': { $regex: search, $options: 'i' } }
      ];
    }

    if (status !== 'all') {
      query.status = status;
    }

    if (type !== 'all') {
      query.type = type;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Fetch applications
    const [applications, totalCount] = await Promise.all([
      Application.find(query)
        .populate('studentId', 'firstName lastName email profilePicture')
        .populate('targetId')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Application.countDocuments(query)
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      success: true,
      data: {
        applications,
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
    console.error('Applications API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}