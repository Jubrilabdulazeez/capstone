"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Server,
  Database,
  Zap,
  Clock,
  HardDrive,
  Wifi,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

export function SystemMetrics() {
  const systemMetrics = [
    {
      title: "Server Performance",
      metrics: [
        { label: "CPU Usage", value: 45, unit: "%", status: "good" },
        { label: "Memory Usage", value: 68, unit: "%", status: "warning" },
        { label: "Disk Usage", value: 32, unit: "%", status: "good" },
        { label: "Network I/O", value: 12, unit: "MB/s", status: "good" }
      ],
      icon: Server
    },
    {
      title: "Database Performance",
      metrics: [
        { label: "Active Connections", value: 24, unit: "", status: "good" },
        { label: "Query Response Time", value: 0.8, unit: "ms", status: "good" },
        { label: "Index Usage", value: 94, unit: "%", status: "good" },
        { label: "Cache Hit Rate", value: 87, unit: "%", status: "good" }
      ],
      icon: Database
    },
    {
      title: "Application Metrics",
      metrics: [
        { label: "Response Time", value: 1.2, unit: "s", status: "good" },
        { label: "Error Rate", value: 0.3, unit: "%", status: "good" },
        { label: "Throughput", value: 156, unit: "req/min", status: "good" },
        { label: "Uptime", value: 99.8, unit: "%", status: "good" }
      ],
      icon: Zap
    }
  ];

  const recentMetrics = [
    {
      name: "New User Registrations",
      value: "+23",
      change: "+12%",
      period: "vs last week",
      trend: "up"
    },
    {
      name: "University Applications",
      value: "+45",
      change: "+8%",
      period: "vs last week",
      trend: "up"
    },
    {
      name: "Page Load Time",
      value: "1.2s",
      change: "-0.3s",
      period: "vs last week",
      trend: "down"
    },
    {
      name: "Error Rate",
      value: "0.3%",
      change: "-0.1%",
      period: "vs last week",
      trend: "down"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-600";
      case "warning":
        return "text-yellow-600";
      case "critical":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "critical":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-3 w-3 text-green-600" />
    ) : (
      <div className="h-3 w-3 rotate-180">
        <TrendingUp className="h-3 w-3 text-green-600" />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* System Performance Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        {systemMetrics.map((category) => (
          <Card key={category.title}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base">
                <category.icon className="h-5 w-5 mr-2" />
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.metrics.map((metric) => (
                  <div key={metric.label} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{metric.label}</span>
                      <div className="flex items-center space-x-1">
                        <span className={`text-sm font-semibold ${getStatusColor(metric.status)}`}>
                          {metric.value}{metric.unit}
                        </span>
                        {metric.status === "warning" && (
                          <AlertTriangle className="h-3 w-3 text-yellow-600" />
                        )}
                      </div>
                    </div>
                    {metric.unit === "%" && (
                      <Progress
                        value={metric.value}
                        className="h-2"
                        style={{
                          backgroundColor: metric.status === "warning" ? "#fef3c7" :
                                          metric.status === "critical" ? "#fee2e2" : "#f0fdf4"
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Performance Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
          <CardDescription>
            Key metrics compared to previous week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {recentMetrics.map((metric) => (
              <div key={metric.name} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{metric.name}</h4>
                  {getTrendIcon(metric.trend)}
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <div className="flex items-center space-x-1">
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        metric.trend === "up" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {metric.change}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{metric.period}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            System Alerts
          </CardTitle>
          <CardDescription>
            Current system warnings and notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm text-yellow-800">Memory Usage High</h4>
                <p className="text-sm text-yellow-700">
                  Server memory usage is at 68%. Consider optimizing queries or scaling resources.
                </p>
                <p className="text-xs text-yellow-600 mt-1">Detected 2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
              <Wifi className="h-4 w-4 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm text-blue-800">Email Service Limited</h4>
                <p className="text-sm text-blue-700">
                  Email service is operating with reduced capacity. Some notifications may be delayed.
                </p>
                <p className="text-xs text-blue-600 mt-1">Started 6 hours ago</p>
              </div>
            </div>

            <div className="text-center py-4 text-muted-foreground">
              <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">All other systems are operating normally</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
