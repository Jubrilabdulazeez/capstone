"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  DollarSign,
  Calculator,
  FileText,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Calendar,
  HelpCircle
} from "lucide-react";
import Link from "next/link";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navigationItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      description: "Overview and statistics"
    },
    {
      title: "Universities",
      href: "/admin/universities",
      icon: GraduationCap,
      description: "Manage university database"
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
      description: "User management"
    },
    {
      title: "Scholarships",
      href: "/admin/scholarships",
      icon: DollarSign,
      description: "Scholarship management"
    },
    {
      title: "Calculator",
      href: "/admin/calculator",
      icon: Calculator,
      description: "Grade conversion settings"
    },
    {
      title: "Resources",
      href: "/admin/resources",
      icon: BookOpen,
      description: "External resources & guides"
    },
    {
      title: "Applications",
      href: "/admin/applications",
      icon: FileText,
      description: "Application monitoring"
    },
    {
      title: "Counseling",
      href: "/admin/counseling",
      icon: Calendar,
      description: "Counseling sessions"
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
      description: "Platform analytics"
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
      description: "System configuration"
    },
    {
      title: "Help",
      href: "/admin/help",
      icon: HelpCircle,
      description: "Documentation & support"
    },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname?.startsWith(href);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] bg-white border-r border-border transition-all duration-200",
          isOpen || !collapsed ? "w-64" : "w-16",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Collapse Toggle (Desktop only) */}
          <div className="hidden lg:flex justify-end p-2 border-b">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="h-8 w-8"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive(item.href) ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start h-auto p-3",
                      collapsed && "px-2",
                      isActive(item.href) && "bg-gradient-green text-white shadow-green"
                    )}
                    onClick={() => {
                      // Close mobile sidebar when item is clicked
                      if (window.innerWidth < 1024) {
                        onClose();
                      }
                    }}
                  >
                    <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
                    {!collapsed && (
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{item.title}</span>
                        <span className="text-xs opacity-70">{item.description}</span>
                      </div>
                    )}
                  </Button>
                </Link>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            {!collapsed && (
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  EduConnect Africa Admin
                </p>
                <p className="text-xs text-muted-foreground">
                  v1.0.0
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
