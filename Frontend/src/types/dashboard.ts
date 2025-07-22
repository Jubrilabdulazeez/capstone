export interface DashboardOverview {
  totalUsers: number;
  totalUniversities: number;
  totalApplications: number;
  totalSessions: number;
  period: number;
}

export interface DashboardGrowth {
  newUsers: number;
  newApplications: number;
  userGrowthRate: number;
  applicationGrowthRate: number;
}

export interface DistributionItem {
  role?: string;
  status?: string;
  country?: string;
  count: number;
}

export interface DashboardDistributions {
  usersByRole: DistributionItem[];
  applicationsByStatus: DistributionItem[];
  universitiesByCountry: DistributionItem[];
  sessionsByStatus: DistributionItem[];
}

export interface DashboardTrends {
  dailyRegistrations: Array<{ _id: string; count: number }>;
}

export interface DashboardActivity {
  id: string;
  title: string;
  description: string;
  time: string;
  status: string;
}

export interface DashboardData {
  overview: DashboardOverview;
  growth: DashboardGrowth;
  distributions: DashboardDistributions;
  trends: DashboardTrends;
  timestamp: string;
  recentActivity: DashboardActivity[];
} 