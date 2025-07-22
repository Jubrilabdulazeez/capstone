"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/context/AuthContext";
import { GraduationCap, MapPin, DollarSign, Calendar, BookOpen, Edit, Plus } from "lucide-react";
import Link from "next/link";

export function StudyPreferences() {
  const { user } = useAuth();

  if (!user) return null;

  const preferences = user.studyPreferences;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Fields of Interest */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Fields of Interest
              </CardTitle>
              <CardDescription>Academic subjects you want to study</CardDescription>
            </div>
            <Link href="/questionnaire/flow">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Update
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {preferences?.fieldsOfInterest?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {preferences.fieldsOfInterest.map((field) => (
                <Badge key={field} variant="secondary">
                  {field}
                </Badge>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No fields selected</h3>
              <p className="text-muted-foreground mb-4">
                Choose your academic interests to get relevant university recommendations.
              </p>
              <Link href="/questionnaire/flow">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Fields of Interest
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Location Preferences */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Location Preferences
              </CardTitle>
              <CardDescription>Countries and regions where you want to study</CardDescription>
            </div>
            <Link href="/questionnaire/flow">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Update
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {preferences?.preferredCountries?.length > 0 ? (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Preferred Countries:</h4>
                <div className="flex flex-wrap gap-2">
                  {preferences.preferredCountries.map((country) => (
                    <Badge key={country} variant="outline">
                      {country}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Languages of Instruction:</h4>
                <div className="flex flex-wrap gap-2">
                  {preferences.preferredLanguages?.map((language) => (
                    <Badge key={language} variant="secondary">
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-muted/30 rounded-md">
                <p className="text-sm">
                  <strong>Accommodation:</strong> {preferences.accommodationPreference}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No location preferences set</h3>
              <p className="text-muted-foreground mb-4">
                Select your preferred countries and regions to find suitable universities.
              </p>
              <Link href="/questionnaire/flow">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Set Preferences
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Degree Preferences */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <GraduationCap className="h-5 w-5 mr-2" />
                Degree Preferences
              </CardTitle>
              <CardDescription>Types of degrees and study modes you prefer</CardDescription>
            </div>
            <Link href="/questionnaire/flow">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Update
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {preferences?.preferredDegreeTypes?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Degree Types:</h4>
                <div className="flex flex-wrap gap-2">
                  {preferences.preferredDegreeTypes.map((type) => (
                    <Badge key={type} variant="outline">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Study Details:</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Study Mode:</strong> {preferences.studyMode}</p>
                  <p><strong>Start Date:</strong> {preferences.startDate}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No degree preferences set</h3>
              <p className="text-muted-foreground mb-4">
                Specify your preferred degree types and study modes.
              </p>
              <Link href="/questionnaire/flow">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Set Preferences
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Budget & Financial */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Budget & Financial Preferences
              </CardTitle>
              <CardDescription>Your budget range and scholarship interests</CardDescription>
            </div>
            <Link href="/questionnaire/flow">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Update
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {preferences?.budgetRange ? (
            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-md">
                <h4 className="font-medium mb-2">Annual Tuition Budget</h4>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(preferences.budgetRange.min)} - {formatCurrency(preferences.budgetRange.max)}
                </p>
                <p className="text-sm text-muted-foreground">Per year</p>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <h4 className="font-medium">Scholarship Interest</h4>
                  <p className="text-sm text-muted-foreground">
                    Looking for financial aid opportunities
                  </p>
                </div>
                <Badge variant={preferences.scholarshipRequired ? "default" : "secondary"}>
                  {preferences.scholarshipRequired ? "Yes" : "No"}
                </Badge>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No budget set</h3>
              <p className="text-muted-foreground mb-4">
                Set your budget range to find universities within your financial means.
              </p>
              <Link href="/questionnaire/flow">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Set Budget
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Matching Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            University Matching Status
          </CardTitle>
          <CardDescription>Based on your current preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-green-800">Profile Complete</h4>
                  <p className="text-sm text-green-600">
                    Your preferences are detailed enough for accurate matching
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  Active
                </Badge>
              </div>
            </div>

            <div className="text-center">
              <Link href="/universities?personalized=true">
                <Button>
                  View My University Matches
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
