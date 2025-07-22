import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { TokenUtils } from '@/lib/auth'

// GET /api/admin/analytics - Get system analytics (Admin only)
export async function GET(request: NextRequest) {
  // Manual JWT authentication
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Missing or invalid Authorization header' }, { status: 401 });
  }
  const token = authHeader.replace('Bearer ', '').trim();
  let decoded;
  try {
    decoded = TokenUtils.verifyToken(token);
    if (!decoded || (decoded.role !== 'ADMIN' && decoded.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }
  } catch (err) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30' // days
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - parseInt(period))

    // Parallel queries for performance
    const [
      totalUsers,
      totalUniversities,
      totalApplications,
      totalSessions,
      recentUsers,
      usersByRole,
      applicationsByStatus,
      universitiesByCountry,
      recentApplications,
      sessionsByStatus
    ] = await Promise.all([
      prisma.user.count(),
      prisma.university.count(),
      prisma.application.count(),
      prisma.counselingSession.count(),
      prisma.user.count({
        where: {
          createdAt: {
            gte: startDate
          }
        }
      }),
      prisma.user.groupBy({
        by: ['role'],
        _count: { id: true }
      }),
      prisma.application.groupBy({
        by: ['status'],
        _count: { id: true }
      }),
      prisma.university.groupBy({
        by: ['country'],
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 10
      }),
      prisma.application.count({
        where: {
          createdAt: {
            gte: startDate
          }
        }
      }),
      prisma.counselingSession.groupBy({
        by: ['status'],
        _count: { id: true }
      })
    ])

    // Growth metrics
    const previousPeriodStart = new Date()
    previousPeriodStart.setDate(previousPeriodStart.getDate() - (parseInt(period) * 2))
    previousPeriodStart.setDate(previousPeriodStart.getDate() + parseInt(period))

    const [
      previousPeriodUsers,
      previousPeriodApplications
    ] = await Promise.all([
      prisma.user.count({
        where: {
          createdAt: {
            gte: previousPeriodStart,
            lt: startDate
          }
        }
      }),
      prisma.application.count({
        where: {
          createdAt: {
            gte: previousPeriodStart,
            lt: startDate
          }
        }
      })
    ])

    // Calculate growth rates
    const userGrowthRate = previousPeriodUsers > 0 
      ? ((recentUsers - previousPeriodUsers) / previousPeriodUsers) * 100 
      : 0

    const applicationGrowthRate = previousPeriodApplications > 0 
      ? ((recentApplications - previousPeriodApplications) / previousPeriodApplications) * 100 
      : 0

    // Daily registrations for the past 30 days
    const dailyRegistrations = await prisma.user.aggregateRaw({
      pipeline: [
        { $match: { createdAt: { $gte: startDate } } },
        { $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]
    });

    const analytics = {
      overview: {
        totalUsers,
        totalUniversities,
        totalApplications,
        totalSessions,
        period: parseInt(period)
      },
      growth: {
        newUsers: recentUsers,
        newApplications: recentApplications,
        userGrowthRate: Math.round(userGrowthRate * 100) / 100,
        applicationGrowthRate: Math.round(applicationGrowthRate * 100) / 100
      },
      distributions: {
        usersByRole: usersByRole.map(item => ({
          role: item.role,
          count: item._count.id
        })),
        applicationsByStatus: applicationsByStatus.map(item => ({
          status: item.status,
          count: item._count.id
        })),
        universitiesByCountry: universitiesByCountry.map(item => ({
          country: item.country,
          count: item._count.id
        })),
        sessionsByStatus: sessionsByStatus.map(item => ({
          status: item.status,
          count: item._count.id
        }))
      },
      trends: {
        dailyRegistrations
      },
      timestamp: new Date().toISOString()
    }

    // Fetch recent activity
    const [recentApplicationsActivity, recentUsersActivity, recentUniversitiesActivity] = await Promise.all([
      prisma.application.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          user: { select: { firstName: true, lastName: true } }
        }
      }),
      prisma.user.findMany({
        where: { role: { in: ['STUDENT', 'COUNSELOR'] } },
        orderBy: { createdAt: 'desc' },
        take: 3
      }),
      prisma.university.findMany({
        orderBy: { createdAt: 'desc' },
        take: 2
      })
    ]);

    function getTimeAgo(date: Date): string {
      const now = new Date();
      const diffInMs = now.getTime() - date.getTime();
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInHours < 1) return 'Just now';
      if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
      if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
      return date.toLocaleDateString();
    }

    const recentActivity = [
      ...recentApplicationsActivity.map(app => ({
        id: app.id,
        title: `New Application`,
        description: `${app.user?.firstName || ''} ${app.user?.lastName || ''} applied for university` ,
        time: getTimeAgo(app.createdAt),
        status: app.status === 'APPROVED' ? 'success' : app.status === 'REJECTED' ? 'warning' : 'info'
      })),
      ...recentUsersActivity.map(user => ({
        id: user.id,
        title: `New ${user.role} Registration`,
        description: `${user.firstName} ${user.lastName} registered as a ${user.role}`,
        time: getTimeAgo(user.createdAt),
        status: 'success'
      })),
      ...recentUniversitiesActivity.map(uni => ({
        id: uni.id,
        title: 'New University Added',
        description: `${uni.name} was added to the system`,
        time: getTimeAgo(uni.createdAt),
        status: 'success'
      }))
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 10);

    return NextResponse.json({
      ...analytics,
      recentActivity
    })

  } catch (error) {
    console.error('Error fetching analytics:', error)
    if (error instanceof Error) {
      if (error.message === 'Authentication required') {
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
      }
      if (error.message === 'Insufficient permissions') {
        return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
      }
    }
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}