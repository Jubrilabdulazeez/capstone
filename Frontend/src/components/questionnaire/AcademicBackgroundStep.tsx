"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, BookOpen, Plus, Trash2 } from "lucide-react";
import type { QuestionnaireData } from "@/app/questionnaire/flow/page";
import type { SubjectGrade } from "@/lib/types/user";

interface AcademicBackgroundStepProps {
  data: QuestionnaireData;
  updateData: (data: Partial<QuestionnaireData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const qualificationTypes = [
  "WAEC",
  "NECO",
  "IGCSE",
  "A-Levels",
  "IB",
  "Nigerian Diploma",
  "Nigerian Degree",
  "Other"
];

const commonSubjects = [
  "English Language", "Mathematics", "Physics", "Chemistry", "Biology",
  "Economics", "Government", "Literature", "Geography", "History",
  "Commerce", "Accounting", "Further Mathematics", "Computer Science",
  "Agricultural Science", "Technical Drawing", "Visual Arts", "Music"
];

const gradeOptions = {
  WAEC: ["A1", "B2", "B3", "C4", "C5", "C6", "D7", "E8", "F9"],
  NECO: ["A", "B", "C", "D", "E", "F"],
  "A-Levels": ["A*", "A", "B", "C", "D", "E"],
  IB: ["7", "6", "5", "4", "3", "2", "1"],
  Other: ["Excellent", "Very Good", "Good", "Fair", "Pass", "Fail"]
};

const languageLevels = ["Beginner", "Intermediate", "Advanced", "Native", "Certified"];

export function AcademicBackgroundStep({ data, updateData, onNext, onPrev }: AcademicBackgroundStepProps) {
  const [currentEducationLevel, setCurrentEducationLevel] = useState(data.currentEducationLevel);
  const [qualifications, setQualifications] = useState(data.qualifications);
  const [languageProficiencies, setLanguageProficiencies] = useState(data.languageProficiencies);

  const addQualification = () => {
    setQualifications([
      ...qualifications,
      {
        type: "",
        subjects: [{ subject: "", grade: "" }],
        yearCompleted: new Date().getFullYear(),
        institution: ""
      }
    ]);
  };

  const removeQualification = (index: number) => {
    setQualifications(qualifications.filter((_, i) => i !== index));
  };

  const updateQualification = (index: number, field: string, value: string | number | SubjectGrade[]) => {
    setQualifications(qualifications.map((qual, i) =>
      i === index ? { ...qual, [field]: value } : qual
    ));
  };

  const addSubject = (qualIndex: number) => {
    const updated = [...qualifications];
    updated[qualIndex].subjects.push({ subject: "", grade: "" });
    setQualifications(updated);
  };

  const removeSubject = (qualIndex: number, subjectIndex: number) => {
    const updated = [...qualifications];
    updated[qualIndex].subjects = updated[qualIndex].subjects.filter((_, i) => i !== subjectIndex);
    setQualifications(updated);
  };

  const updateSubject = (qualIndex: number, subjectIndex: number, field: string, value: string) => {
    const updated = [...qualifications];
    updated[qualIndex].subjects[subjectIndex] = {
      ...updated[qualIndex].subjects[subjectIndex],
      [field]: value
    };
    setQualifications(updated);
  };

  const addLanguage = () => {
    setLanguageProficiencies([
      ...languageProficiencies,
      { language: "", level: "Intermediate" }
    ]);
  };

  const removeLanguage = (index: number) => {
    setLanguageProficiencies(languageProficiencies.filter((_, i) => i !== index));
  };

  const updateLanguage = (index: number, field: string, value: string) => {
    setLanguageProficiencies(languageProficiencies.map((lang, i) =>
      i === index ? { ...lang, [field]: value } : lang
    ));
  };

  const handleNext = () => {
    updateData({
      currentEducationLevel,
      qualifications,
      languageProficiencies
    });
    onNext();
  };

  const isFormValid = currentEducationLevel && qualifications.length > 0 &&
    qualifications.every(q => q.type && q.subjects.every(s => s.subject && s.grade));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center mb-2">
          <BookOpen className="h-6 w-6 text-primary mr-2" />
          <CardTitle>Academic Background</CardTitle>
        </div>
        <CardDescription>
          Tell us about your educational qualifications and language proficiency
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Education Level */}
        <div className="space-y-2">
          <Label htmlFor="educationLevel">Current Education Level *</Label>
          <Select value={currentEducationLevel} onValueChange={setCurrentEducationLevel}>
            <SelectTrigger>
              <SelectValue placeholder="Select your current education level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Secondary School Graduate">Secondary School Graduate</SelectItem>
              <SelectItem value="Diploma Student">Diploma Student</SelectItem>
              <SelectItem value="Undergraduate Student">Undergraduate Student</SelectItem>
              <SelectItem value="Graduate">Graduate</SelectItem>
              <SelectItem value="Postgraduate Student">Postgraduate Student</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Qualifications */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Educational Qualifications *</Label>
            <Button type="button" variant="outline" size="sm" onClick={addQualification}>
              <Plus className="h-4 w-4 mr-2" />
              Add Qualification
            </Button>
          </div>

          {qualifications.map((qualification, qualIndex) => (
            <Card key={`qualification-${qualIndex}-${qualification.type}-${qualification.yearCompleted}`} className="border border-border/60">
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Qualification {qualIndex + 1}</h4>
                  {qualifications.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQualification(qualIndex)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Type *</Label>
                    <Select
                      value={qualification.type}
                      onValueChange={(value) => updateQualification(qualIndex, "type", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {qualificationTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Year Completed *</Label>
                    <Input
                      type="number"
                      min="1990"
                      max={new Date().getFullYear() + 1}
                      value={qualification.yearCompleted}
                      onChange={(e) => updateQualification(qualIndex, "yearCompleted", Number.parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Institution</Label>
                    <Input
                      placeholder="School/Institution name"
                      value={qualification.institution}
                      onChange={(e) => updateQualification(qualIndex, "institution", e.target.value)}
                    />
                  </div>
                </div>

                {/* Subjects */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Subjects & Grades *</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addSubject(qualIndex)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Subject
                    </Button>
                  </div>

                  {qualification.subjects.map((subject, subjectIndex) => (
                    <div key={`${qualIndex}-subject-${subjectIndex}-${subject.subject}`} className="flex gap-2 items-end">
                      <div className="flex-1">
                        <Select
                          value={subject.subject}
                          onValueChange={(value) => updateSubject(qualIndex, subjectIndex, "subject", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {commonSubjects.map(subj => (
                              <SelectItem key={subj} value={subj}>{subj}</SelectItem>
                            ))}
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-24">
                        <Select
                          value={subject.grade}
                          onValueChange={(value) => updateSubject(qualIndex, subjectIndex, "grade", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Grade" />
                          </SelectTrigger>
                          <SelectContent>
                            {(gradeOptions[qualification.type as keyof typeof gradeOptions] || gradeOptions.Other).map(grade => (
                              <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {qualification.subjects.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSubject(qualIndex, subjectIndex)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Language Proficiency */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Language Proficiency</Label>
            <Button type="button" variant="outline" size="sm" onClick={addLanguage}>
              <Plus className="h-4 w-4 mr-2" />
              Add Language
            </Button>
          </div>

          {languageProficiencies.map((language, index) => (
            <div key={`language-${index}-${language.language}-${language.level}`} className="flex gap-2 items-end">
              <div className="flex-1">
                <Input
                  placeholder="Language"
                  value={language.language}
                  onChange={(e) => updateLanguage(index, "language", e.target.value)}
                />
              </div>
              <div className="w-32">
                <Select
                  value={language.level}
                  onValueChange={(value) => updateLanguage(index, "level", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languageLevels.map(level => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {languageProficiencies.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeLanguage(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onPrev}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button onClick={handleNext} disabled={!isFormValid}>
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
