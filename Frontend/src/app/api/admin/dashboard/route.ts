import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import University from '@/lib/models/University';
import Scholarship from '@/lib/models/Scholarship';
import Application from '@/lib/models/Application';
import { requireAdminAuth } from '@/lib/utils/adminAuth';

async function getDashboardStats() {
  try {
    await connectDB();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed:', error);
    // Return empty stats if database is not available
    return {
      universities: { total: 0, change: "0%", trend: "up" },
      students: { total: 0, change: "0%", trend: "up" },
      counselors: { total: 0, change: "0%", trend: "up" },
      scholarships: { total: 0, change: "0%", trend: "up" },
      applications: { total: 0, change: "0%", trend: "up" },
      revenue: { total: 0, change: "0%", trend: "up" }
    };
  }
  
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  
  try {
    // Get current counts
    const [
      universitiesTotal,
      studentsTotal,
      counselorsTotal,
      scholarshipsTotal,
      applicationsTotal,
      revenueTotal
    ] = await Promise.all([
      University.countDocuments({ isActive: true }).catch(() => 0),
      User.countDocuments({ role: 'STUDENT' }).catch(() => 0),
      User.countDocuments({ role: 'COUNSELOR' }).catch(() => 0),
      Scholarship.countDocuments({ isActive: true }).catch(() => 0),
      Application.countDocuments().catch(() => 0),
      Application.countDocuments({ 
        'paymentInfo.status': 'paid',
        'paymentInfo.paidAt': { $exists: true }
      }).catch(() => 0)
    ]);
    
    // Get last month counts for comparison
    const [
      universitiesLastMonth,
      studentsLastMonth,
      scholarshipsLastMonth,
      applicationsLastMonth
    ] = await Promise.all([
      University.countDocuments({ 
        isActive: true, 
        createdAt: { $gte: lastMonth } 
      }).catch(() => 0),
      User.countDocuments({ 
        role: 'STUDENT',
        createdAt: { $gte: lastMonth }
      }).catch(() => 0),
      Scholarship.countDocuments({ 
        isActive: true,
        createdAt: { $gte: lastMonth }
      }).catch(() => 0),
      Application.countDocuments({ 
        createdAt: { $gte: lastMonth }
      }).catch(() => 0)
    ]);
    
    // Calculate percentage changes
    const calculateChange = (current: number, lastMonth: number) => {
      if (current === 0) return "0%";
      const percentage = ((lastMonth / current) * 100).toFixed(0);
      return `+${percentage}%`;
    };
    
    // Calculate revenue (mock calculation - you can implement actual revenue logic)
    const revenue = await Application.aggregate([
      { 
        $match: { 
          'paymentInfo.status': 'paid',
          'paymentInfo.paidAt': { $exists: true }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$paymentInfo.amount' }
        }
      }
    ]).catch(() => []);
    
    const revenueAmount = revenue.length > 0 ? revenue[0].total : 0;
    
    return {
      universities: {
        total: universitiesTotal,
        change: calculateChange(universitiesTotal, universitiesLastMonth),
        trend: "up"
      },
      students: {
        total: studentsTotal,
        change: calculateChange(studentsTotal, studentsLastMonth),
        trend: "up"
      },
      counselors: {
        total: counselorsTotal,
        change: "+5%", // You can implement similar logic for counselors
        trend: "up"
      },
      scholarships: {
        total: scholarshipsTotal,
        change: calculateChange(scholarshipsTotal, scholarshipsLastMonth),
        trend: "up"
      },
      applications: {
        total: applicationsTotal,
        change: calculateChange(applicationsTotal, applicationsLastMonth),
        trend: "up"
      },
      revenue: {
        total: revenueAmount,
        change: "+15%", // You can implement actual revenue comparison
        trend: "up"
      }
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
}

interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  status: string;
}

async function getRecentActivity(): Promise<Activity[]> {
  try {
    await connectDB();
  } catch (error) {
    console.error('Database connection failed in getRecentActivity:', error);
    return [];
  }
  
  try {
    // Get recent applications
    const recentApplications = await Application.find()
      .populate('studentId', 'firstName lastName')
      .populate('targetId')
      .sort({ createdAt: -1 })
      .limit(5);
    
    // Get recent users
    const recentUsers = await User.find({ role: { $in: ['STUDENT', 'COUNSELOR'] } })
      .sort({ createdAt: -1 })
      .limit(3);
    
    // Get recent universities
    const recentUniversities = await University.find()
      .sort({ createdAt: -1 })
      .limit(2);
    
    const activities: Activity[] = [];
    
    // Add application activities
    recentApplications.forEach((app) => {
      const studentName = `${app.studentId.firstName} ${app.studentId.lastName}`;
      activities.push({
        id: app._id.toString(),
        title: `New ${app.type} Application`,
        description: `${studentName} applied for ${app.type === 'university' ? 'university admission' : 'scholarship'}`,
        time: getTimeAgo(app.createdAt),
        status: app.status === 'approved' ? 'success' : app.status === 'rejected' ? 'warning' : 'info'
      });
    });
    
    // Add user registration activities
    recentUsers.forEach((user) => {
      activities.push({
        id: user._id.toString(),
        title: `New ${user.role} Registration`,
        description: `${user.firstName} ${user.lastName} registered as a ${user.role}`,
        time: getTimeAgo(user.createdAt),
        status: 'success'
      });
    });
    
    // Add university activities
    recentUniversities.forEach((uni) => {
      activities.push({
        id: uni._id.toString(),
        title: "New University Added",
        description: `${uni.name} was added to the system`,
        time: getTimeAgo(uni.createdAt),
        status: 'success'
      });
    });
    
    // Sort by time and return top 10
    return activities
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 10);
      
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    return [];
  }
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);
  
  if (diffInHours < 1) {
    return "Just now";
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString();
  }
}

export async function GET(request: NextRequest) {
  const authResult = await requireAdminAuth(request);
  if (authResult) return authResult;
  try {
    // TODO: Add authentication check
    // const session = await getServerSession(authOptions);
    // if (!session || session.user.role !== 'admin') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const [dashboardStats, recentActivity] = await Promise.all([
      getDashboardStats(),
      getRecentActivity()
    ]);

    return NextResponse.json({
      success: true,
      data: {
        stats: dashboardStats,
        recentActivity
      }
    });

  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}