"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/context/AuthContext";
import { BookOpen, Heart, FileText, Calendar, Award, TrendingUp } from "lucide-react";

export function ProfileStats() {
  const { user } = useAuth();

  if (!user) return null;

  const stats = [
    {
      title: "Saved Universities",
      value: user.savedUniversities.length,
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Applications",
      value: user.applications.length,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Counseling Sessions",
      value: user.counselingSessions.length,
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Qualifications",
      value: user.qualifications.length,
      icon: Award,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Languages",
      value: user.languageProficiencies.length,
      icon: BookOpen,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Profile Completion",
      value: `${calculateProfileCompletion(user)}%`,
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function calculateProfileCompletion(user: any): number {
  let completedFields = 0;
  const totalFields = 15;

  // Basic info
  if (user.firstName) completedFields++;
  if (user.lastName) completedFields++;
  if (user.email) completedFields++;
  if (user.dateOfBirth) completedFields++;
  if (user.gender) completedFields++;
  if (user.state) completedFields++;
  if (user.city) completedFields++;
  if (user.phoneNumber) completedFields++;

  // Academic info
  if (user.qualifications.length > 0) completedFields++;
  if (user.languageProficiencies.length > 0) completedFields++;

  // Study preferences
  if (user.studyPreferences?.fieldsOfInterest?.length > 0) completedFields++;
  if (user.studyPreferences?.preferredCountries?.length > 0) completedFields++;
  if (user.studyPreferences?.preferredDegreeTypes?.length > 0) completedFields++;
  if (user.studyPreferences?.budgetRange) completedFields++;
  if (user.studyPreferences?.accommodationPreference) completedFields++;

  return Math.round((completedFields / totalFields) * 100);
}
