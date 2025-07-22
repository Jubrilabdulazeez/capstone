"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Calculator, BookOpen, Flag } from "lucide-react";
import { toast } from "sonner";

// Grade conversion data
const gradeConversions = {
  WAEC: {
    "A1": { points: 9, ghana: "A", rwanda: "A", southAfrica: "7", description: "Excellent" },
    "B2": { points: 8, ghana: "B+", rwanda: "B+", southAfrica: "6", description: "Very Good" },
    "B3": { points: 7, ghana: "B", rwanda: "B", southAfrica: "5", description: "Good" },
    "C4": { points: 6, ghana: "C+", rwanda: "C+", southAfrica: "4", description: "Credit" },
    "C5": { points: 5, ghana: "C", rwanda: "C", southAfrica: "4", description: "Credit" },
    "C6": { points: 4, ghana: "C-", rwanda: "C-", southAfrica: "3", description: "Credit" },
    "D7": { points: 3, ghana: "D+", rwanda: "D+", southAfrica: "3", description: "Pass" },
    "E8": { points: 2, ghana: "D", rwanda: "D", southAfrica: "2", description: "Pass" },
    "F9": { points: 1, ghana: "F", rwanda: "F", southAfrica: "1", description: "Fail" },
  },
  NECO: {
    "A": { points: 9, ghana: "A", rwanda: "A", southAfrica: "7", description: "Excellent" },
    "B": { points: 7, ghana: "B", rwanda: "B", southAfrica: "5", description: "Good" },
    "C": { points: 5, ghana: "C", rwanda: "C", southAfrica: "4", description: "Credit" },
    "D": { points: 3, ghana: "D", rwanda: "D", southAfrica: "3", description: "Pass" },
    "E": { points: 2, ghana: "D", rwanda: "D", southAfrica: "2", description: "Pass" },
    "F": { points: 1, ghana: "F", rwanda: "F", southAfrica: "1", description: "Fail" },
  }
};

const commonSubjects = [
  "English Language", "Mathematics", "Physics", "Chemistry", "Biology",
  "Economics", "Government", "Literature", "Geography", "History",
  "Commerce", "Accounting", "Further Mathematics", "Computer Science",
  "Agricultural Science", "Technical Drawing", "Visual Arts"
];

interface Subject {
  id: string;
  name: string;
  grade: string;
}

interface GradeConversion {
  points: number;
  ghana: string;
  rwanda: string;
  southAfrica: string;
  description: string;
}

interface ConvertedSubject {
  id: string;
  name: string;
  grade: string;
  conversion: GradeConversion;
}

interface CalculationResults {
  subjects: ConvertedSubject[];
  eligibility: {
    [country: string]: boolean;
  };
  examType: string;
  gpa: string;
  percentage: string;
  totalSubjects: number;
  classification: string;
}

export function GradeCalculator() {
  const [examType, setExamType] = useState<"WAEC" | "NECO">("WAEC");
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: "1", name: "", grade: "" },
  ]);
  const [results, setResults] = useState<CalculationResults | null>(null);

  const addSubject = () => {
    setSubjects([...subjects, { id: Date.now().toString(), name: "", grade: "" }]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter(subject => subject.id !== id));
    }
  };

  const updateSubject = (id: string, field: string, value: string) => {
    setSubjects(subjects.map(subject =>
      subject.id === id ? { ...subject, [field]: value } : subject
    ));
  };

  const calculateGrades = () => {
    const validSubjects = subjects.filter(s => s.name && s.grade);

    if (validSubjects.length === 0) {
      toast.error("Please add at least one subject with a grade");
      return;
    }

    const conversions = gradeConversions[examType];
    let totalPoints = 0;
    let validCount = 0;

    const convertedSubjects: ConvertedSubject[] = [];

    for (const subject of validSubjects) {
      const conversion = conversions[subject.grade as keyof typeof conversions] as GradeConversion;
      if (conversion?.points) {
        totalPoints += conversion.points;
        validCount++;
        convertedSubjects.push({
          ...subject,
          conversion
        });
      }
    }

    const gpa = validCount > 0 ? (totalPoints / validCount).toFixed(2) : "0.00";
    const percentage = validCount > 0 ? ((totalPoints / (validCount * 9)) * 100).toFixed(1) : "0.0";

    setResults({
      examType,
      subjects: convertedSubjects,
      gpa: gpa,
      percentage: percentage,
      totalSubjects: validCount,
      classification: getClassification(Number.parseFloat(gpa)),
      eligibility: {
        ghana: Number.parseFloat(gpa) >= 5.0,
        rwanda: Number.parseFloat(gpa) >= 5.0,
        southAfrica: Number.parseFloat(gpa) >= 5.0
      }
    });

    toast.success("Grades calculated successfully!");
  };

  const getClassification = (gpa: number) => {
    if (gpa >= 8) return "First Class Honours";
    if (gpa >= 7) return "Second Class Upper";
    if (gpa >= 6) return "Second Class Lower";
    if (gpa >= 5) return "Third Class";
    if (gpa >= 4) return "Pass";
    return "Fail";
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case "First Class Honours": return "bg-green-100 text-green-800";
      case "Second Class Upper": return "bg-blue-100 text-blue-800";
      case "Second Class Lower": return "bg-yellow-100 text-yellow-800";
      case "Third Class": return "bg-orange-100 text-orange-800";
      case "Pass": return "bg-gray-100 text-gray-800";
      default: return "bg-red-100 text-red-800";
    }
  };

  const resetCalculator = () => {
    setSubjects([{ id: "1", name: "", grade: "" }]);
    setResults(null);
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Enter Your Grades
          </CardTitle>
          <CardDescription>
            Select your examination type and enter your subject grades
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Examination Type</Label>
            <Select value={examType} onValueChange={(value: "WAEC" | "NECO") => setExamType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select examination type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WAEC">WAEC (West African Senior School Certificate)</SelectItem>
                <SelectItem value="NECO">NECO (National Examinations Council)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Subjects and Grades</Label>
              <Button onClick={addSubject} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Subject
              </Button>
            </div>

            {subjects.map((subject, index) => (
              <div key={subject.id} className="flex gap-3 items-end">
                <div className="flex-1">
                  <Label>Subject</Label>
                  <Select
                    value={subject.name}
                    onValueChange={(value) => updateSubject(subject.id, "name", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {commonSubjects.map(subj => (
                        <SelectItem key={subj} value={subj}>{subj}</SelectItem>
                      ))}
                      <SelectItem value="Other">Other Subject</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-24">
                  <Label>Grade</Label>
                  <Select
                    value={subject.grade}
                    onValueChange={(value) => updateSubject(subject.id, "grade", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(gradeConversions[examType]).map(grade => (
                        <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {subjects.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSubject(subject.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button onClick={calculateGrades} className="bg-gradient-green hover:opacity-90">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Equivalency
            </Button>
            <Button onClick={resetCalculator} variant="outline">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Conversion Results</CardTitle>
            <CardDescription>
              Your {results.examType} grades converted to international standards
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">GPA (9.0 Scale)</p>
                <p className="text-2xl font-bold text-primary">{results.gpa}</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Percentage</p>
                <p className="text-2xl font-bold text-primary">{results.percentage}%</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Subjects</p>
                <p className="text-2xl font-bold text-primary">{results.totalSubjects}</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Classification</p>
                <Badge className={getClassificationColor(results.classification)}>
                  {results.classification}
                </Badge>
              </div>
            </div>

            {/* Country-specific conversions */}
            <Tabs defaultValue="ghana" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="ghana" className="flex items-center">
                  <Flag className="h-4 w-4 mr-2" />
                  Ghana
                </TabsTrigger>
                <TabsTrigger value="rwanda" className="flex items-center">
                  <Flag className="h-4 w-4 mr-2" />
                  Rwanda
                </TabsTrigger>
                <TabsTrigger value="southAfrica" className="flex items-center">
                  <Flag className="h-4 w-4 mr-2" />
                  South Africa
                </TabsTrigger>
              </TabsList>

              {["ghana", "rwanda", "southAfrica"].map(country => (
                <TabsContent key={country} value={country}>
                  <div className="space-y-3">
                    <h4 className="font-medium">
                      Equivalent grades for {country === "southAfrica" ? "South Africa" : country.charAt(0).toUpperCase() + country.slice(1)}
                    </h4>
                    <div className="grid gap-2">
                      {results.subjects.map((subject: ConvertedSubject, index: number) => (
                        subject.conversion && (
                          <div key={`${subject.name}-${subject.grade}-${index}`} className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
                            <span className="font-medium">{subject.name}</span>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">{subject.grade}</Badge>
                              <span>→</span>
                              <Badge className="bg-green-100 text-green-800">
                                {subject.conversion[country as keyof typeof subject.conversion]}
                              </Badge>
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
