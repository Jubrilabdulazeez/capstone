"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/context/AuthContext";
import { BookOpen, Award, Globe, Plus, Edit } from "lucide-react";
import Link from "next/link";

export function AcademicInfo() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Current Education Level */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Current Education Level
              </CardTitle>
              <CardDescription>Your current academic status</CardDescription>
            </div>
            <Link href="/profile/settings">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {user.qualifications.length > 0 ? (
            <div className="p-4 bg-muted/30 rounded-md">
              <p className="font-medium">Secondary School Graduate</p>
              <p className="text-sm text-muted-foreground">
                Based on your qualifications and profile information
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No education level specified</h3>
              <p className="text-muted-foreground mb-4">
                Add your current education level to help us provide better recommendations.
              </p>
              <Link href="/profile/settings">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education Level
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Qualifications */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Academic Qualifications
              </CardTitle>
              <CardDescription>Your certificates and examination results</CardDescription>
            </div>
            <Link href="/profile/settings">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Qualification
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {user.qualifications.length > 0 ? (
            <div className="space-y-4">
              {user.qualifications.map((qualification, index) => (
                <Card key={index} className="border border-border/60">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{qualification.type}</h3>
                        <p className="text-sm text-muted-foreground">
                          {qualification.institution} • {qualification.yearCompleted}
                        </p>
                      </div>
                      <Badge variant="outline">{qualification.yearCompleted}</Badge>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Subjects & Grades:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {qualification.subjects.map((subject, subIndex) => (
                          <div key={subIndex} className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                            <span className="text-sm">{subject.subject}</span>
                            <Badge variant="secondary" className="ml-2">
                              {subject.grade}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No qualifications added</h3>
              <p className="text-muted-foreground mb-4">
                Add your WAEC, NECO, or other academic qualifications to get accurate university recommendations.
              </p>
              <Link href="/profile/settings">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Qualification
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Language Proficiencies */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Language Proficiencies
              </CardTitle>
              <CardDescription>Languages you can speak and understand</CardDescription>
            </div>
            <Link href="/profile/settings">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Language
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {user.languageProficiencies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.languageProficiencies.map((language, index) => (
                <div key={index} className="p-4 border rounded-md">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{language.language}</h3>
                    <Badge variant={
                      language.level === "Native" ? "default" :
                      language.level === "Advanced" ? "secondary" :
                      "outline"
                    }>
                      {language.level}
                    </Badge>
                  </div>
                  {language.certification && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Certified: {language.certification}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No languages specified</h3>
              <p className="text-muted-foreground mb-4">
                Add your language proficiencies to find universities that offer programs in languages you understand.
              </p>
              <Link href="/profile/settings">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Language
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Academic Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Goals & Achievements</CardTitle>
          <CardDescription>Track your academic progress and set goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-md">
              <h4 className="font-medium mb-2">Current Goals</h4>
              <ul className="text-sm space-y-1">
                <li className="flex items-center">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mr-2" />
                  Complete university applications by March 2025
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 bg-green-500 rounded-full mr-2" />
                  Secure scholarship funding
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 bg-orange-500 rounded-full mr-2" />
                  Improve English proficiency score
                </li>
              </ul>
            </div>

            <div className="text-center">
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Set Academic Goals
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
