"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Plus, Trash2, AlertCircle } from "lucide-react";
import { GradeResults } from "./GradeResults";

type Country = "rwanda" | "ghana" | "south-africa";

interface Subject {
  name: string;
  grade: string;
  required?: boolean;
}

interface GradeInputProps {
  country: Country;
  onBack: () => void;
}

const waecGrades = [
  { value: "A1", label: "A1 - Excellent (75-100%)" },
  { value: "B2", label: "B2 - Very Good (70-74%)" },
  { value: "B3", label: "B3 - Good (65-69%)" },
  { value: "C4", label: "C4 - Credit (60-64%)" },
  { value: "C5", label: "C5 - Credit (55-59%)" },
  { value: "C6", label: "C6 - Credit (50-54%)" },
  { value: "D7", label: "D7 - Pass (45-49%)" },
  { value: "E8", label: "E8 - Pass (40-44%)" },
  { value: "F9", label: "F9 - Fail (0-39%)" }
];

const commonSubjects = [
  "Biology", "Chemistry", "Physics", "Further Mathematics", "Agricultural Science",
  "Geography", "Government", "Economics", "Commerce", "Accounting",
  "Literature in English", "History", "Christian Religious Studies", "Islamic Religious Studies",
  "Civic Education", "French", "Igbo", "Yoruba", "Hausa",
  "Visual Arts", "Music", "Technical Drawing", "Computer Studies",
  "Food and Nutrition", "Home Economics", "Physical Education"
];

const countryNames = {
  rwanda: "Rwanda",
  ghana: "Ghana",
  "south-africa": "South Africa"
};

export function GradeInput({ country, onBack }: GradeInputProps) {
  const [qualification, setQualification] = useState<"WAEC" | "NECO">("WAEC");
  const [year, setYear] = useState<string>("");
  const [subjects, setSubjects] = useState<Subject[]>([
    { name: "English Language", grade: "", required: true },
    { name: "Mathematics", grade: "", required: true },
    { name: "", grade: "", required: false },
    { name: "", grade: "", required: false },
    { name: "", grade: "", required: false },
    { name: "", grade: "", required: false }
  ]);
  const [showResults, setShowResults] = useState(false);

  const updateSubject = (index: number, field: keyof Subject, value: string) => {
    const updated = [...subjects];
    updated[index] = { ...updated[index], [field]: value };
    setSubjects(updated);
  };

  const addSubject = () => {
    if (subjects.length < 12) {
      setSubjects([...subjects, { name: "", grade: "", required: false }]);
    }
  };

  const removeSubject = (index: number) => {
    if (!subjects[index].required && subjects.length > 2) {
      setSubjects(subjects.filter((_, i) => i !== index));
    }
  };

  const canCalculate = () => {
    const requiredSubjects = subjects.filter(s => s.required);
    const validRequiredSubjects = requiredSubjects.filter(s => s.name && s.grade);
    const validOptionalSubjects = subjects.filter(s => !s.required && s.name && s.grade);

    return validRequiredSubjects.length === 2 && validOptionalSubjects.length >= 4 && year;
  };

  const handleCalculate = () => {
    if (canCalculate()) {
      setShowResults(true);
    }
  };

  if (showResults) {
    return (
      <GradeResults
        country={country}
        qualification={qualification}
        year={year}
        subjects={subjects}
        onBack={() => setShowResults(false)}
        onStartOver={onBack}
      />
    );
  }

  const validSubjects = subjects.filter(s => s.name && s.grade);
  const requiredComplete = subjects.filter(s => s.required && s.name && s.grade).length === 2;
  const optionalComplete = validSubjects.filter(s => !s.required).length >= 4;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Countries
        </Button>
        <div className="text-center">
          <h2 className="text-2xl font-bold">Step 2: Enter Your Grades</h2>
          <p className="text-muted-foreground">
            Calculating equivalency for <span className="font-medium">{countryNames[country]}</span>
          </p>
        </div>
        <div className="w-24" /> {/* Spacer for alignment */}
      </div>

      {/* Qualification Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Qualification Information</CardTitle>
          <CardDescription>
            Select your examination type and year
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Examination Type *</Label>
              <Select value={qualification} onValueChange={(value: "WAEC" | "NECO") => setQualification(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WAEC">WAEC (West African Examinations Council)</SelectItem>
                  <SelectItem value="NECO">NECO (National Examinations Council)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Year Completed *</Label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => {
                    const currentYear = new Date().getFullYear();
                    const yearValue = currentYear - i;
                    return (
                      <SelectItem key={yearValue} value={yearValue.toString()}>
                        {yearValue}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subject Grades */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg">Subject Grades</CardTitle>
              <CardDescription>
                Enter your grades for English, Mathematics, and 4+ other subjects
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={addSubject} disabled={subjects.length >= 12}>
              <Plus className="h-4 w-4 mr-2" />
              Add Subject
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Progress Indicators */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${requiredComplete ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className="text-sm font-medium">Required Subjects</span>
              <Badge variant={requiredComplete ? "default" : "secondary"}>
                {subjects.filter(s => s.required && s.name && s.grade).length}/2
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${optionalComplete ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className="text-sm font-medium">Optional Subjects</span>
              <Badge variant={optionalComplete ? "default" : "secondary"}>
                {validSubjects.filter(s => !s.required).length}/4+
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${validSubjects.length >= 6 ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className="text-sm font-medium">Total Subjects</span>
              <Badge variant={validSubjects.length >= 6 ? "default" : "secondary"}>
                {validSubjects.length}
              </Badge>
            </div>
          </div>

          {/* Subject Input Grid */}
          <div className="space-y-3">
            {subjects.map((subject, index) => (
              <div key={index} className="grid md:grid-cols-12 gap-3 items-end">
                <div className="md:col-span-5">
                  {subject.required ? (
                    <div>
                      <Label className="text-sm font-medium">
                        {subject.name} *
                        <Badge variant="secondary" className="ml-2 text-xs">Required</Badge>
                      </Label>
                      <div className="mt-1 p-2 bg-muted/50 rounded border">
                        <span className="text-sm font-medium">{subject.name}</span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Label className="text-sm">Subject {index - 1}</Label>
                      <Select
                        value={subject.name}
                        onValueChange={(value) => updateSubject(index, "name", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {commonSubjects
                            .filter(s => !subjects.some(sub => sub.name === s))
                            .map(subjectName => (
                              <SelectItem key={subjectName} value={subjectName}>
                                {subjectName}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                <div className="md:col-span-5">
                  <Label className="text-sm">Grade *</Label>
                  <Select
                    value={subject.grade}
                    onValueChange={(value) => updateSubject(index, "grade", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {waecGrades.map(grade => (
                        <SelectItem key={grade.value} value={grade.value}>
                          {grade.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  {!subject.required && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeSubject(index)}
                      disabled={subjects.length <= 6}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Requirements Notice */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800 mb-1">Minimum Requirements:</p>
                  <ul className="text-blue-700 space-y-1">
                    <li>• English Language and Mathematics are mandatory</li>
                    <li>• At least 4 additional subjects required</li>
                    <li>• Minimum 6 subjects total for university admission</li>
                    <li>• Grades C6 and above are typically required for most programs</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calculate Button */}
          <div className="pt-4">
            <Button
              className="w-full"
              size="lg"
              onClick={handleCalculate}
              disabled={!canCalculate()}
            >
              {canCalculate() ? (
                <>
                  Calculate Equivalency for {countryNames[country]}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  Complete Required Fields
                  {!requiredComplete && " - Missing English/Math"}
                  {requiredComplete && !optionalComplete && " - Need 4+ Subjects"}
                  {!year && " - Select Year"}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
