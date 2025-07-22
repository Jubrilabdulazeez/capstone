"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/context/AuthContext";
import { AlertCircle, CheckCircle, Clock, Star, TrendingUp } from "lucide-react";
import Link from "next/link";

export function ProfileOverview() {
  const { user } = useAuth();

  if (!user) return null;

  const profileCompletion = calculateProfileCompletion(user);
  const recentActivities = getRecentActivities(user);
  const recommendations = getRecommendations(user);

  return (
    <div className="space-y-6">
      {/* Profile Completion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Profile Completion
          </CardTitle>
          <CardDescription>
            Complete your profile to get better university recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{profileCompletion}%</span>
            </div>
            <Progress value={profileCompletion} className="h-2" />

            {profileCompletion < 100 && (
              <div className="bg-muted/50 p-4 rounded-md">
                <h4 className="font-medium mb-2">To complete your profile:</h4>
                <ul className="text-sm space-y-1">
                  {getIncompleteFields(user).map((field, index) => (
                    <li key={index} className="flex items-center">
                      <AlertCircle className="h-3 w-3 text-orange-500 mr-2" />
                      {field}
                    </li>
                  ))}
                </ul>
                <Link href="/profile/settings">
                  <Button size="sm" className="mt-3">
                    Complete Profile
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">University Matches</p>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-green-600">3 new this week</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Application Status</p>
                <p className="text-2xl font-bold">{user.applications.length}</p>
                <p className="text-xs text-blue-600">Active applications</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Next Session</p>
                <p className="text-2xl font-bold">--</p>
                <p className="text-xs text-muted-foreground">No upcoming sessions</p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Your latest actions on EduConnect Africa</CardDescription>
        </CardHeader>
        <CardContent>
          {recentActivities.length > 0 ? (
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-md">
                  <activity.icon className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                  <Badge variant="outline">{activity.type}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">No recent activities</p>
          )}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommendations for You</CardTitle>
          <CardDescription>Personalized suggestions to improve your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 border rounded-md">
                <rec.icon className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium">{rec.title}</h4>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                </div>
                <Link href={rec.link}>
                  <Button size="sm" variant="outline">
                    {rec.action}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
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

function getIncompleteFields(user: any): string[] {
  const incomplete = [];

  if (!user.dateOfBirth) incomplete.push("Add your date of birth");
  if (!user.gender) incomplete.push("Specify your gender");
  if (!user.state) incomplete.push("Add your state of origin");
  if (!user.phoneNumber) incomplete.push("Add your phone number");
  if (user.qualifications.length === 0) incomplete.push("Add your qualifications");
  if (!user.studyPreferences?.fieldsOfInterest?.length) incomplete.push("Select fields of interest");
  if (!user.studyPreferences?.preferredCountries?.length) incomplete.push("Choose preferred countries");

  return incomplete;
}

function getRecentActivities(user: any) {
  // Mock recent activities - in a real app this would come from a database
  return [
    {
      icon: Star,
      description: "Completed university matching questionnaire",
      date: "2 days ago",
      type: "Profile"
    },
    {
      icon: CheckCircle,
      description: "Created your EduConnect Africa account",
      date: "1 week ago",
      type: "Account"
    }
  ];
}

function getRecommendations(user: any) {
  const recommendations = [];

  if (user.qualifications.length === 0) {
    recommendations.push({
      icon: Star,
      title: "Add Your Qualifications",
      description: "Adding your academic qualifications helps us recommend suitable universities.",
      action: "Add Now",
      link: "/profile/settings"
    });
  }

  if (!user.studyPreferences?.fieldsOfInterest?.length) {
    recommendations.push({
      icon: TrendingUp,
      title: "Complete Study Preferences",
      description: "Tell us what you want to study to get personalized university matches.",
      action: "Complete",
      link: "/questionnaire/flow"
    });
  }

  if (user.savedUniversities.length === 0) {
    recommendations.push({
      icon: CheckCircle,
      title: "Explore Universities",
      description: "Browse our database of African universities and save your favorites.",
      action: "Explore",
      link: "/universities"
    });
  }

  return recommendations;
}
