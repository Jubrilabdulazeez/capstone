"use client";

import { useState, useEffect } from 'react';

interface DashboardStats {
  universities: {
    total: number;
    change: string;
    trend: string;
  };
  students: {
    total: number;
    change: string;
    trend: string;
  };
  counselors: {
    total: number;
    change: string;
    trend: string;
  };
  scholarships: {
    total: number;
    change: string;
    trend: string;
  };
  applications: {
    total: number;
    change: string;
    trend: string;
  };
  revenue: {
    total: number;
    change: string;
    trend: string;
  };
}

interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  status: string;
}

interface DashboardData {
  stats: DashboardStats;
  recentActivity: Activity[];
}

export function useAdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = typeof window !== 'undefined' ? localStorage.getItem('educonnect_admin_token') : null;
      const response = await fetch('http://localhost:3001/api/admin/analytics', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // The backend now returns stats and recentActivity at the top level
      setData({
        stats: result.overview || {},
        recentActivity: result.recentActivity || []
      });
    } catch (err) {
      console.error('Dashboard data fetch error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchDashboardData
  };
}