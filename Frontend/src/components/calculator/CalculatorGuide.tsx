"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, GraduationCap, Award, HelpCircle } from "lucide-react";

export function CalculatorGuide() {
  const waecGrades = [
    { grade: "A1", points: "9", description: "Excellent", percentage: "75-100%" },
    { grade: "B2", points: "8", description: "Very Good", percentage: "70-74%" },
    { grade: "B3", points: "7", description: "Good", percentage: "65-69%" },
    { grade: "C4", points: "6", description: "Credit", percentage: "60-64%" },
    { grade: "C5", points: "5", description: "Credit", percentage: "55-59%" },
    { grade: "C6", points: "4", description: "Credit", percentage: "50-54%" },
    { grade: "D7", points: "3", description: "Pass", percentage: "45-49%" },
    { grade: "E8", points: "2", description: "Pass", percentage: "40-44%" },
    { grade: "F9", points: "1", description: "Fail", percentage: "0-39%" },
  ];

  const necoGrades = [
    { grade: "A", points: "9", description: "Excellent", percentage: "75-100%" },
    { grade: "B", points: "7", description: "Good", percentage: "60-74%" },
    { grade: "C", points: "5", description: "Credit", percentage: "50-59%" },
    { grade: "D", points: "3", description: "Pass", percentage: "40-49%" },
    { grade: "E", points: "2", description: "Pass", percentage: "35-39%" },
    { grade: "F", points: "1", description: "Fail", percentage: "0-34%" },
  ];

  const classifications = [
    { gpa: "8.0 - 9.0", classification: "First Class Honours", color: "bg-green-100 text-green-800" },
    { gpa: "7.0 - 7.9", classification: "Second Class Upper", color: "bg-blue-100 text-blue-800" },
    { gpa: "6.0 - 6.9", classification: "Second Class Lower", color: "bg-yellow-100 text-yellow-800" },
    { gpa: "5.0 - 5.9", classification: "Third Class", color: "bg-orange-100 text-orange-800" },
    { gpa: "4.0 - 4.9", classification: "Pass", color: "bg-gray-100 text-gray-800" },
    { gpa: "Below 4.0", classification: "Fail", color: "bg-red-100 text-red-800" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="h-5 w-5 mr-2" />
            How It Works
          </CardTitle>
          <CardDescription>
            Understand the grade conversion process
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="p-1 rounded-full bg-primary/10">
                <span className="text-xs font-bold text-primary">1</span>
              </div>
              <div>
                <h4 className="font-medium text-sm">Select Exam Type</h4>
                <p className="text-xs text-muted-foreground">
                  Choose between WAEC or NECO examination
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-1 rounded-full bg-primary/10">
                <span className="text-xs font-bold text-primary">2</span>
              </div>
              <div>
                <h4 className="font-medium text-sm">Enter Subjects & Grades</h4>
                <p className="text-xs text-muted-foreground">
                  Add your subjects and corresponding grades
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-1 rounded-full bg-primary/10">
                <span className="text-xs font-bold text-primary">3</span>
              </div>
              <div>
                <h4 className="font-medium text-sm">Get Conversions</h4>
                <p className="text-xs text-muted-foreground">
                  View equivalent grades for Ghana, Rwanda, and South Africa
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Grade References
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="waec" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="waec">WAEC Grades</TabsTrigger>
              <TabsTrigger value="neco">NECO Grades</TabsTrigger>
            </TabsList>

            <TabsContent value="waec" className="space-y-2">
              {waecGrades.map((grade) => (
                <div key={grade.grade} className="flex items-center justify-between p-2 border rounded-md text-sm">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{grade.grade}</Badge>
                    <span className="font-medium">{grade.description}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{grade.points} points</div>
                    <div className="text-xs text-muted-foreground">{grade.percentage}</div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="neco" className="space-y-2">
              {necoGrades.map((grade) => (
                <div key={grade.grade} className="flex items-center justify-between p-2 border rounded-md text-sm">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{grade.grade}</Badge>
                    <span className="font-medium">{grade.description}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{grade.points} points</div>
                    <div className="text-xs text-muted-foreground">{grade.percentage}</div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Classifications
          </CardTitle>
          <CardDescription>
            Degree classification based on GPA
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {classifications.map((item, index) => (
            <div key={`${item.gpa}-${item.classification}-${index}`} className="flex items-center justify-between p-2 border rounded-md text-sm">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{item.gpa}</span>
              </div>
              <Badge className={item.color}>
                {item.classification}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
