"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Building2,
  Users,
  GraduationCap,
  FileText,
  DollarSign,
  Eye,
  TrendingUp,
  TrendingDown,
  Plus,
  UserPlus,
  BookOpen,
  ClipboardList,
  Search,
  Loader2,
  RefreshCw
} from "lucide-react";
import Link from "next/link";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const quickActions = [
  {
    title: "Manage Students",
    description: "View and manage student accounts",
    href: "/admin/students",
    icon: Users,
    color: "bg-blue-500"
  },
  {
    title: "Manage Counselors",
    description: "View and manage counselor accounts",
    href: "/admin/counselors",
    icon: UserPlus,
    color: "bg-green-500"
  },
  {
    title: "Manage Universities",
    description: "View and manage university listings",
    href: "/admin/universities",
    icon: Building2,
    color: "bg-purple-500"
  },
  {
    title: "Manage Scholarships",
    description: "View and manage scholarship opportunities",
    href: "/admin/scholarships",
    icon: GraduationCap,
    color: "bg-orange-500"
  },
  {
    title: "View Applications",
    description: "Review and process applications",
    href: "/admin/applications",
    icon: FileText,
    color: "bg-red-500"
  },
  {
    title: "Add University",
    description: "Register a new university in the system",
    href: "/admin/universities/new",
    icon: Plus,
    color: "bg-indigo-500"
  }
];

export default function AdminDashboardPage() {
  const { data, loading, error, refetch } = useAdminDashboard();
  const router = useRouter();

  useEffect(() => {
    // Listen for route changes and refetch when returning to dashboard
    const handleRouteChange = (url: string) => {
      if (url.includes("/admin/dashboard")) {
        refetch();
      }
    };
    // @ts-ignore: router.events may not exist in app router, fallback for compatibility
    router.events?.on?.("routeChangeComplete", handleRouteChange);
    return () => {
      router.events?.off?.("routeChangeComplete", handleRouteChange);
    };
  }, [router, refetch]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-600";
      case "warning":
        return "bg-orange-100 text-orange-600";
      case "info":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome to EduConnect Africa Admin</h2>
          <p className="text-green-100">
            Manage universities, students, and applications from your centralized dashboard.
          </p>
        </div>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-green-600" />
            <p className="text-muted-foreground">Loading dashboard data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome to EduConnect Africa Admin</h2>
          <p className="text-green-100">
            Manage universities, students, and applications from your centralized dashboard.
          </p>
        </div>
        <Alert variant="destructive">
          <AlertDescription className="flex items-center justify-between">
            <span>Failed to load dashboard data: {error}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refetch}
              className="ml-4"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // No data state
  if (!data) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome to EduConnect Africa Admin</h2>
          <p className="text-green-100">
            Manage universities, students, and applications from your centralized dashboard.
          </p>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">No dashboard data available.</p>
          <Button onClick={refetch} className="mt-4">
            <RefreshCw className="h-4 w-4 mr-2" />
            Load Data
          </Button>
        </div>
      </div>
    );
  }

  const { overview, growth, distributions, trends, recentActivity } = data;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome to EduConnect Africa Admin</h2>
            <p className="text-green-100">
              Manage universities, students, and applications from your centralized dashboard.
            </p>
          </div>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={refetch}
            className="bg-white/10 hover:bg-white/20 text-white border-white/20"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Universities</p>
                <p className="text-3xl font-bold">{overview?.totalUniversities ?? 0}</p>
                {/* You can add growth/change info from growth or distributions if needed */}
              </div>
              <Building2 className="h-12 w-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Students</p>
                <p className="text-3xl font-bold">{overview?.totalUsers ?? 0}</p>
                <p className="text-xs text-muted-foreground">New: {growth?.newUsers ?? 0} ({growth?.userGrowthRate ?? 0}%)</p>
              </div>
              <Users className="h-12 w-12 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Applications</p>
                <p className="text-3xl font-bold">{overview?.totalApplications ?? 0}</p>
                <p className="text-xs text-muted-foreground">New: {growth?.newApplications ?? 0} ({growth?.applicationGrowthRate ?? 0}%)</p>
              </div>
              <FileText className="h-12 w-12 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sessions</p>
                <p className="text-3xl font-bold">{overview?.totalSessions ?? 0}</p>
              </div>
              <BookOpen className="h-12 w-12 text-indigo-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions and Recent Activity remain unchanged */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action) => (
              <Link key={action.title} href={action.href}>
                <div className="flex items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className={`p-2 rounded-full ${action.color} text-white mr-4`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{action.title}</h4>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                  <Plus className="h-5 w-5 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest system events and user actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`p-1 rounded-full ${getStatusIcon(activity.status)}`}>
                    <div className="h-2 w-2 rounded-full bg-current" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/admin/activity">
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}