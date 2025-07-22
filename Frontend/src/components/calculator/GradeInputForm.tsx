"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Trash2, Calculator, AlertCircle } from "lucide-react";

interface GradeInputFormProps {
  country: string;
  onSubmit: (data: {
    subjects: Array<{ subject: string; grade: string }>;
    qualificationType: "WAEC" | "NECO";
  }) => void;
}

interface SubjectGrade {
  subject: string;
  grade: string;
}

const qualificationTypes = ["WAEC", "NECO"];

const commonSubjects = [
  "English Language",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Economics",
  "Government",
  "Literature in English",
  "Geography",
  "History",
  "Commerce",
  "Accounting",
  "Further Mathematics",
  "Computer Science",
  "Agricultural Science",
  "Technical Drawing",
  "Visual Arts",
  "Music",
  "Civic Education",
  "Christian Religious Studies",
  "Islamic Religious Studies",
  "French",
  "Igbo",
  "Hausa",
  "Yoruba"
];

const gradeOptions = {
  WAEC: [
    { value: "A1", label: "A1 (Excellent 75-100%)", points: 1 },
    { value: "B2", label: "B2 (Very Good 70-74%)", points: 2 },
    { value: "B3", label: "B3 (Good 65-69%)", points: 3 },
    { value: "C4", label: "C4 (Credit 60-64%)", points: 4 },
    { value: "C5", label: "C5 (Credit 55-59%)", points: 5 },
    { value: "C6", label: "C6 (Credit 50-54%)", points: 6 },
    { value: "D7", label: "D7 (Pass 45-49%)", points: 7 },
    { value: "E8", label: "E8 (Pass 40-44%)", points: 8 },
    { value: "F9", label: "F9 (Fail 0-39%)", points: 9 }
  ],
  NECO: [
    { value: "A", label: "A (Excellent 70-100%)", points: 1 },
    { value: "B", label: "B (Very Good 60-69%)", points: 2 },
    { value: "C", label: "C (Good 50-59%)", points: 3 },
    { value: "D", label: "D (Pass 45-49%)", points: 4 },
    { value: "E", label: "E (Pass 40-44%)", points: 5 },
    { value: "F", label: "F (Fail 0-39%)", points: 6 }
  ]
};

export function GradeInputForm({ country, onSubmit }: GradeInputFormProps) {
  const [qualificationType, setQualificationType] = useState<"WAEC" | "NECO">("WAEC");
  const [subjects, setSubjects] = useState<SubjectGrade[]>([
    { subject: "English Language", grade: "" },
    { subject: "Mathematics", grade: "" },
    { subject: "", grade: "" },
    { subject: "", grade: "" },
    { subject: "", grade: "" },
    { subject: "", grade: "" }
  ]);

  const handleSubjectChange = (index: number, subject: string) => {
    const updated = [...subjects];
    updated[index].subject = subject;
    setSubjects(updated);
  };

  const handleGradeChange = (index: number, grade: string) => {
    const updated = [...subjects];
    updated[index].grade = grade;
    setSubjects(updated);
  };

  const addSubject = () => {
    setSubjects([...subjects, { subject: "", grade: "" }]);
  };

  const removeSubject = (index: number) => {
    if (index > 1) { // Don't allow removal of English and Math
      setSubjects(subjects.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    const validSubjects = subjects.filter(s => s.subject && s.grade);

    if (validSubjects.length < 5) {
      alert("Please enter at least 5 subjects including English Language and Mathematics");
      return;
    }

    if (!validSubjects.find(s => s.subject === "English Language")) {
      alert("English Language is required");
      return;
    }

    if (!validSubjects.find(s => s.subject === "Mathematics")) {
      alert("Mathematics is required");
      return;
    }

    onSubmit({
      subjects: validSubjects,
      qualificationType
    });
  };

  const validSubjects = subjects.filter(s => s.subject && s.grade);
  const canSubmit = validSubjects.length >= 5 &&
    validSubjects.find(s => s.subject === "English Language") &&
    validSubjects.find(s => s.subject === "Mathematics");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="h-5 w-5 mr-2" />
            Enter Your Grades
          </CardTitle>
          <CardDescription>
            Input your {country === "south-africa" ? "WAEC/NECO" : "Nigerian qualification"} subject grades.
            English Language and Mathematics are required, plus at least 3 additional subjects.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Qualification Type Selection */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Qualification Type *</Label>
            <Select value={qualificationType} onValueChange={(value: "WAEC" | "NECO") => setQualificationType(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select qualification type" />
              </SelectTrigger>
              <SelectContent>
                {qualificationTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type} ({type === "WAEC" ? "West African Examinations Council" : "National Examinations Council"})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Grade Scale Reference */}
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3">{qualificationType} Grading Scale</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {gradeOptions[qualificationType].map((grade) => (
                  <div key={grade.value} className="text-sm">
                    <Badge variant="outline" className="mr-2">{grade.value}</Badge>
                    <span className="text-muted-foreground">{grade.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Subject and Grade Input */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-base font-medium">Subjects and Grades</Label>
              <Button variant="outline" size="sm" onClick={addSubject}>
                <Plus className="h-4 w-4 mr-2" />
                Add Subject
              </Button>
            </div>

            <div className="space-y-3">
              {subjects.map((subject, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                  <div className="space-y-2">
                    {index === 0 && <Label className="text-sm font-medium">Subject</Label>}
                    <Select
                      value={subject.subject}
                      onValueChange={(value) => handleSubjectChange(index, value)}
                      disabled={index < 2} // Disable English and Math from being changed
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {commonSubjects.map(subj => (
                          <SelectItem key={subj} value={subj}>{subj}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {index < 2 && (
                      <p className="text-xs text-muted-foreground">
                        {index === 0 ? "Required - English Language" : "Required - Mathematics"}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    {index === 0 && <Label className="text-sm font-medium">Grade</Label>}
                    <Select
                      value={subject.grade}
                      onValueChange={(value) => handleGradeChange(index, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {gradeOptions[qualificationType].map(grade => (
                          <SelectItem key={grade.value} value={grade.value}>
                            {grade.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end">
                    {index > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSubject(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Indicator */}
            <div className="bg-muted/30 p-4 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">
                  {validSubjects.length} of 5+ subjects entered
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((validSubjects.length / 5) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Validation Messages */}
            {!canSubmit && validSubjects.length > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {validSubjects.length < 5 ?
                    `Please enter at least ${5 - validSubjects.length} more subject(s).` :
                    "Please ensure English Language and Mathematics are included."
                  }
                </AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit}
                size="lg"
                className="min-w-[200px]"
              >
                Calculate Equivalency
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Notes */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Important Notes</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• English Language and Mathematics are mandatory for all university applications</li>
            <li>• Enter exactly the grades as they appear on your certificate</li>
            <li>• Include at least 5 subjects for accurate university eligibility assessment</li>
            <li>• Choose subjects relevant to your intended field of study</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
