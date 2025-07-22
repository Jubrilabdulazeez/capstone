"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  GraduationCap,
  FileText,
  DollarSign,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import Link from "next/link";

export function RecentActivities() {
  const recentActivities = [
    {
      id: 1,
      type: "user",
      title: "New user registration",
      description: "Adaora Okafor from Lagos State completed profile setup",
      time: "2 minutes ago",
      status: "new",
      actionUrl: "/admin/users",
      icon: User
    },
    {
      id: 2,
      type: "application",
      title: "Application submitted",
      description: "Application to University of Ghana for Computer Science",
      time: "15 minutes ago",
      status: "pending",
      actionUrl: "/admin/applications",
      icon: FileText
    },
    {
      id: 3,
      type: "university",
      title: "University information updated",
      description: "University of Cape Town updated admission requirements",
      time: "1 hour ago",
      status: "updated",
      actionUrl: "/admin/universities",
      icon: GraduationCap
    },
    {
      id: 4,
      type: "scholarship",
      title: "New scholarship added",
      description: "Rwanda Excellence Scholarship for Engineering students",
      time: "2 hours ago",
      status: "new",
      actionUrl: "/admin/scholarships",
      icon: DollarSign
    },
    {
      id: 5,
      type: "counseling",
      title: "Counseling session completed",
      description: "45-minute session with Michael Okonkwo",
      time: "3 hours ago",
      status: "completed",
      actionUrl: "/admin/counseling",
      icon: Calendar
    },
    {
      id: 6,
      type: "system",
      title: "System maintenance",
      description: "Database optimization completed successfully",
      time: "4 hours ago",
      status: "completed",
      actionUrl: "/admin/settings",
      icon: CheckCircle
    },
    {
      id: 7,
      type: "user",
      title: "Profile verification",
      description: "Kwame Asante verified email and phone number",
      time: "5 hours ago",
      status: "verified",
      actionUrl: "/admin/users",
      icon: User
    },
    {
      id: 8,
      type: "error",
      title: "Calculator error logged",
      description: "WAEC to GPA conversion failed for unsupported grade",
      time: "6 hours ago",
      status: "error",
      actionUrl: "/admin/calculator",
      icon: AlertCircle
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "updated":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-emerald-100 text-emerald-800";
      case "verified":
        return "bg-purple-100 text-purple-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-3 w-3" />;
      case "completed":
      case "verified":
        return <CheckCircle className="h-3 w-3" />;
      case "error":
        return <AlertCircle className="h-3 w-3" />;
      default:
        return <div className="h-3 w-3 rounded-full bg-current" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>
          Latest platform activities and system events
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex-shrink-0">
                <div className="p-2 rounded-full bg-muted">
                  <activity.icon className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-medium">{activity.title}</h4>
                  <Badge variant="secondary" className={`text-xs ${getStatusColor(activity.status)}`}>
                    {getStatusIcon(activity.status)}
                    <span className="ml-1 capitalize">{activity.status}</span>
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>

              <div className="flex-shrink-0">
                <Link href={activity.actionUrl}>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t">
          <Link href="/admin/activities">
            <Button variant="outline" className="w-full">
              View All Activities
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
