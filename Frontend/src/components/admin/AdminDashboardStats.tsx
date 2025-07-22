"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  GraduationCap,
  FileText,
  DollarSign,
  TrendingUp,
  Calendar,
  Globe,
  Award
} from "lucide-react";

export function AdminDashboardStats() {
  // Mock admin statistics - in real app, this would come from API
  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12%",
      changeType: "increase" as const,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Registered students"
    },
    {
      title: "Universities",
      value: "24",
      change: "+3",
      changeType: "increase" as const,
      icon: GraduationCap,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Active institutions"
    },
    {
      title: "Applications",
      value: "156",
      change: "+8%",
      changeType: "increase" as const,
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "This month"
    },
    {
      title: "Scholarships",
      value: "45",
      change: "+5",
      changeType: "increase" as const,
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Available opportunities"
    },
    {
      title: "Counseling Sessions",
      value: "89",
      change: "+15%",
      changeType: "increase" as const,
      icon: Calendar,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      description: "Completed this month"
    },
    {
      title: "Countries",
      value: "3",
      change: "MVP",
      changeType: "neutral" as const,
      icon: Globe,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      description: "Rwanda, Ghana, South Africa"
    },
    {
      title: "Conversion Rate",
      value: "68%",
      change: "+3%",
      changeType: "increase" as const,
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      description: "Profile to application"
    },
    {
      title: "Success Rate",
      value: "84%",
      change: "+1%",
      changeType: "increase" as const,
      icon: Award,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      description: "Application acceptance"
    },
  ];

  const getChangeColor = (changeType: "increase" | "decrease" | "neutral") => {
    switch (changeType) {
      case "increase":
        return "text-green-700 bg-green-100";
      case "decrease":
        return "text-red-700 bg-red-100";
      case "neutral":
        return "text-gray-700 bg-gray-100";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${getChangeColor(stat.changeType)}`}
                  >
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>

            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/5 pointer-events-none" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
