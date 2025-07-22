"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit,
  BarChart3,
  Users,
  DollarSign,
  GraduationCap,
  Calculator,
  BookOpen,
  Calendar,
  Settings
} from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  const quickActions = [
    {
      title: "Add University",
      description: "Add new institution to database",
      href: "/admin/universities/new",
      icon: Plus,
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "Manage Users",
      description: "View and edit user accounts",
      href: "/admin/users",
      icon: Users,
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "Add Scholarship",
      description: "Create new scholarship entry",
      href: "/admin/scholarships/new",
      icon: DollarSign,
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      title: "Update Calculator",
      description: "Modify grade conversion tables",
      href: "/admin/calculator",
      icon: Calculator,
      color: "bg-orange-500 hover:bg-orange-600"
    },
    {
      title: "Manage Resources",
      description: "Edit external resources",
      href: "/admin/resources",
      icon: BookOpen,
      color: "bg-indigo-500 hover:bg-indigo-600"
    },
    {
      title: "View Analytics",
      description: "Platform performance metrics",
      href: "/admin/analytics",
      icon: BarChart3,
      color: "bg-cyan-500 hover:bg-cyan-600"
    }
  ];

  const systemTasks = [
    {
      title: "System Settings",
      description: "Configure platform settings",
      href: "/admin/settings",
      icon: Settings,
      urgent: false
    },
    {
      title: "Counseling Schedule",
      description: "Manage counselor availability",
      href: "/admin/counseling",
      icon: Calendar,
      urgent: true
    },
    {
      title: "University Updates",
      description: "Review pending changes",
      href: "/admin/universities?status=pending",
      icon: Edit,
      urgent: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common administrative tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3">
            {quickActions.map((action) => (
              <Link key={action.title} href={action.href}>
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors group cursor-pointer">
                  <div className={`p-2 rounded-md ${action.color} text-white transition-colors group-hover:scale-105`}>
                    <action.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{action.title}</h3>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>System Tasks</CardTitle>
          <CardDescription>
            Administrative tasks requiring attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {systemTasks.map((task) => (
              <Link key={task.title} href={task.href}>
                <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-md bg-muted">
                      <task.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-sm">{task.title}</h4>
                        {task.urgent && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Urgent
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{task.description}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Platform Status */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Database</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Healthy
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">API Services</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Online
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">File Storage</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Available
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Email Service</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Limited
              </span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t">
            <Link href="/admin/settings/system">
              <Button variant="outline" size="sm" className="w-full">
                System Health Details
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
