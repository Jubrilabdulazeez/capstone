"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  TrendingUp,
  Download,
  Calculator,
  CheckCircle,
  AlertCircle,
  Star,
  GraduationCap
} from "lucide-react";

interface ResultsDisplayProps {
  country: string;
  gradeData: {
    subjects: Array<{ subject: string; grade: string }>;
    qualificationType: "WAEC" | "NECO";
  };
  onViewGuide: () => void;
  onNewCalculation: () => void;
}

interface ConvertedGrade {
  originalGrade: string;
  convertedGrade: string;
  points: number;
  description: string;
  subject: string;
}

// Conversion logic for each country
const gradeConversions = {
  rwanda: {
    WAEC: {
      A1: { grade: "A", points: 20, description: "Distinction (80-100%)" },
      B2: { grade: "B+", points: 17, description: "Upper Credit (70-79%)" },
      B3: { grade: "B", points: 15, description: "Credit (65-69%)" },
      C4: { grade: "C+", points: 12, description: "Lower Credit (60-64%)" },
      C5: { grade: "C", points: 10, description: "Pass (55-59%)" },
      C6: { grade: "C-", points: 8, description: "Weak Pass (50-54%)" },
      D7: { grade: "D", points: 5, description: "Below Standard (45-49%)" },
      E8: { grade: "E", points: 3, description: "Poor (40-44%)" },
      F9: { grade: "F", points: 0, description: "Fail (0-39%)" }
    },
    NECO: {
      A: { grade: "A", points: 20, description: "Distinction (80-100%)" },
      B: { grade: "B+", points: 17, description: "Upper Credit (70-79%)" },
      C: { grade: "B", points: 15, description: "Credit (65-69%)" },
      D: { grade: "C", points: 10, description: "Pass (55-59%)" },
      E: { grade: "D", points: 5, description: "Below Standard (45-49%)" },
      F: { grade: "F", points: 0, description: "Fail (0-39%)" }
    }
  },
  ghana: {
    WAEC: {
      A1: { grade: "A1", points: 1, description: "Excellent (80-100%)" },
      B2: { grade: "B2", points: 2, description: "Very Good (75-79%)" },
      B3: { grade: "B3", points: 3, description: "Good (70-74%)" },
      C4: { grade: "C4", points: 4, description: "Credit (65-69%)" },
      C5: { grade: "C5", points: 5, description: "Credit (60-64%)" },
      C6: { grade: "C6", points: 6, description: "Credit (55-59%)" },
      D7: { grade: "D7", points: 7, description: "Pass (50-54%)" },
      E8: { grade: "E8", points: 8, description: "Pass (45-49%)" },
      F9: { grade: "F9", points: 9, description: "Fail (0-44%)" }
    },
    NECO: {
      A: { grade: "A1", points: 1, description: "Excellent (80-100%)" },
      B: { grade: "B2", points: 2, description: "Very Good (70-79%)" },
      C: { grade: "C4", points: 4, description: "Credit (60-69%)" },
      D: { grade: "D7", points: 7, description: "Pass (50-59%)" },
      E: { grade: "E8", points: 8, description: "Pass (45-49%)" },
      F: { grade: "F9", points: 9, description: "Fail (0-44%)" }
    }
  },
  "south-africa": {
    WAEC: {
      A1: { grade: "Level 7", points: 7, description: "Outstanding Achievement (80-100%)" },
      B2: { grade: "Level 6", points: 6, description: "Meritorious Achievement (70-79%)" },
      B3: { grade: "Level 5", points: 5, description: "Substantial Achievement (60-69%)" },
      C4: { grade: "Level 4", points: 4, description: "Adequate Achievement (50-59%)" },
      C5: { grade: "Level 3", points: 3, description: "Moderate Achievement (40-49%)" },
      C6: { grade: "Level 2", points: 2, description: "Elementary Achievement (30-39%)" },
      D7: { grade: "Level 1", points: 1, description: "Not Achieved (0-29%)" },
      E8: { grade: "Level 1", points: 1, description: "Not Achieved (0-29%)" },
      F9: { grade: "Level 1", points: 1, description: "Not Achieved (0-29%)" }
    },
    NECO: {
      A: { grade: "Level 7", points: 7, description: "Outstanding Achievement (80-100%)" },
      B: { grade: "Level 6", points: 6, description: "Meritorious Achievement (70-79%)" },
      C: { grade: "Level 5", points: 5, description: "Substantial Achievement (60-69%)" },
      D: { grade: "Level 4", points: 4, description: "Adequate Achievement (50-59%)" },
      E: { grade: "Level 3", points: 3, description: "Moderate Achievement (40-49%)" },
      F: { grade: "Level 1", points: 1, description: "Not Achieved (0-39%)" }
    }
  }
};

export function ResultsDisplay({ country, gradeData, onViewGuide, onNewCalculation }: ResultsDisplayProps) {
  const conversions = gradeConversions[country as keyof typeof gradeConversions];
  const qualConversions = conversions[gradeData.qualificationType];

  const convertedGrades: ConvertedGrade[] = gradeData.subjects.map(subject => {
    const conversion = qualConversions[subject.grade as keyof typeof qualConversions];
    return {
      originalGrade: subject.grade,
      convertedGrade: conversion.grade,
      points: conversion.points,
      description: conversion.description,
      subject: subject.subject
    };
  });

  const calculateOverallPerformance = () => {
    const totalPoints = convertedGrades.reduce((sum, grade) => sum + grade.points, 0);
    const avgPoints = totalPoints / convertedGrades.length;

    if (country === "rwanda") {
      if (avgPoints >= 16) return { level: "Excellent", color: "text-green-600", eligibility: "Eligible for top universities" };
      if (avgPoints >= 12) return { level: "Good", color: "text-blue-600", eligibility: "Eligible for most universities" };
      if (avgPoints >= 8) return { level: "Satisfactory", color: "text-yellow-600", eligibility: "Eligible for some universities" };
      return { level: "Below Standard", color: "text-red-600", eligibility: "Limited university options" };
    } else if (country === "ghana") {
      if (avgPoints <= 3) return { level: "Excellent", color: "text-green-600", eligibility: "Eligible for all universities" };
      if (avgPoints <= 6) return { level: "Very Good", color: "text-blue-600", eligibility: "Eligible for most universities" };
      if (avgPoints <= 8) return { level: "Good", color: "text-yellow-600", eligibility: "Eligible for many universities" };
      return { level: "Needs Improvement", color: "text-red-600", eligibility: "Limited university options" };
    } else { // south-africa
      if (avgPoints >= 6) return { level: "Outstanding", color: "text-green-600", eligibility: "Eligible for top universities" };
      if (avgPoints >= 5) return { level: "Substantial", color: "text-blue-600", eligibility: "Eligible for most universities" };
      if (avgPoints >= 4) return { level: "Adequate", color: "text-yellow-600", eligibility: "Eligible for some universities" };
      return { level: "Below Standard", color: "text-red-600", eligibility: "Limited university options" };
    }
  };

  const performance = calculateOverallPerformance();
  const eligibilityPercentage = Math.max(20, Math.min(100, (performance.level === "Excellent" || performance.level === "Outstanding") ? 95 :
    (performance.level === "Very Good" || performance.level === "Good" || performance.level === "Substantial") ? 80 :
    (performance.level === "Satisfactory" || performance.level === "Adequate") ? 60 : 35));

  const countryInfo = {
    rwanda: { name: "Rwanda", flag: "🇷🇼", system: "20-Point System" },
    ghana: { name: "Ghana", flag: "🇬🇭", system: "WASSCE System" },
    "south-africa": { name: "South Africa", flag: "🇿🇦", system: "NSC Level System" }
  };

  const info = countryInfo[country as keyof typeof countryInfo];

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <span className="text-3xl">{info.flag}</span>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-800">Conversion Complete!</h2>
              <p className="text-green-700">
                Your {gradeData.qualificationType} grades have been converted to {info.name}'s {info.system}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Overall Performance Summary
          </CardTitle>
          <CardDescription>
            Your academic standing and university eligibility in {info.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 text-primary">
                {convertedGrades.length}
              </div>
              <p className="text-sm text-muted-foreground">Subjects Converted</p>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${performance.color}`}>
                {performance.level}
              </div>
              <p className="text-sm text-muted-foreground">Performance Level</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 text-blue-600">
                {eligibilityPercentage}%
              </div>
              <p className="text-sm text-muted-foreground">University Eligibility</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">University Admission Readiness</span>
              <span className="text-sm text-muted-foreground">{eligibilityPercentage}%</span>
            </div>
            <Progress value={eligibilityPercentage} className="h-3" />
            <p className="text-sm text-muted-foreground">{performance.eligibility}</p>
          </div>
        </CardContent>
      </Card>

      {/* Grade Conversion Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="h-5 w-5 mr-2" />
            Grade Conversion Results
          </CardTitle>
          <CardDescription>
            Detailed conversion of each subject grade to {info.name} standards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {convertedGrades.map((grade, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-md hover:bg-muted/30 transition-colors">
                <div>
                  <p className="font-medium">{grade.subject}</p>
                  <p className="text-sm text-muted-foreground">Subject</p>
                </div>
                <div className="text-center">
                  <Badge variant="outline" className="text-base">
                    {grade.originalGrade}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {gradeData.qualificationType} Grade
                  </p>
                </div>
                <div className="text-center">
                  <Badge className="text-base bg-primary">
                    {grade.convertedGrade}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {info.name} Equivalent
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">{grade.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {country === "rwanda" ? `${grade.points} points` :
                     country === "ghana" ? `Grade ${grade.points}` :
                     `Level ${grade.points}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* University Eligibility Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <GraduationCap className="h-5 w-5 mr-2" />
            University Eligibility Insights
          </CardTitle>
          <CardDescription>
            Programs and universities you may be eligible for
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {performance.level === "Excellent" || performance.level === "Outstanding" ? (
            <div className="space-y-3">
              <div className="flex items-center text-green-600">
                <Star className="h-5 w-5 mr-2" />
                <span className="font-semibold">Excellent Performance</span>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Eligible for competitive programs like Medicine, Engineering, and Law</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Strong candidate for merit-based scholarships</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Top-tier university admission likely</span>
                </li>
              </ul>
            </div>
          ) : performance.level === "Good" || performance.level === "Very Good" || performance.level === "Substantial" ? (
            <div className="space-y-3">
              <div className="flex items-center text-blue-600">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="font-semibold">Good Performance</span>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Eligible for most undergraduate programs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Competitive for many universities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Consider scholarship opportunities</span>
                </li>
              </ul>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center text-yellow-600">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span className="font-semibold">Room for Improvement</span>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Consider retaking some subjects to improve grades</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Focus on meeting minimum requirements</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Consider foundation or bridging programs</span>
                </li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button onClick={onViewGuide} className="w-full">
          <FileText className="h-4 w-4 mr-2" />
          View Application Guide
        </Button>
        <Button variant="outline" className="w-full">
          <Download className="h-4 w-4 mr-2" />
          Download Results PDF
        </Button>
        <Button variant="outline" onClick={onNewCalculation} className="w-full">
          <Calculator className="h-4 w-4 mr-2" />
          New Calculation
        </Button>
      </div>
    </div>
  );
}
