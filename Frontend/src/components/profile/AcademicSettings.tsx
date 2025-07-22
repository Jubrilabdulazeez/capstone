"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/lib/context/AuthContext";
import { BookOpen, Plus, Trash2, Save, Award, Globe } from "lucide-react";
import { toast } from "sonner";

const qualificationTypes = [
  "WAEC", "NECO", "IGCSE", "A-Levels", "IB", "Nigerian Diploma", "Nigerian Degree", "Other"
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

export function AcademicSettings() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [qualifications, setQualifications] = useState(user?.qualifications || []);
  const [languageProficiencies, setLanguageProficiencies] = useState(user?.languageProficiencies || []);

  // Qualification functions
  const addQualification = () => {
    setQualifications([
      ...qualifications,
      {
        id: `qual-${Date.now()}`,
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

  const updateQualification = (index: number, field: string, value: any) => {
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

  // Language functions
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

  const handleSave = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update user's academic information
    if (user) {
      const updatedUser = {
        ...user,
        qualifications,
        languageProficiencies
      };
      localStorage.setItem("educonnect_user", JSON.stringify(updatedUser));
      toast.success("Academic information updated successfully!");
    }

    setIsLoading(false);
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Please sign in to access settings.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Academic Qualifications */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Academic Qualifications
              </CardTitle>
              <CardDescription>
                Add and manage your educational qualifications and certificates
              </CardDescription>
            </div>
            <Button onClick={addQualification} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Qualification
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {qualifications.map((qualification, qualIndex) => (
            <Card key={qualIndex} className="border border-border/60">
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Qualification {qualIndex + 1}</h4>
                  {qualifications.length > 1 && (
                    <Button
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
                      variant="outline"
                      size="sm"
                      onClick={() => addSubject(qualIndex)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Subject
                    </Button>
                  </div>

                  {qualification.subjects.map((subject, subjectIndex) => (
                    <div key={subjectIndex} className="flex gap-2 items-end">
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

          {qualifications.length === 0 && (
            <div className="text-center py-8">
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No qualifications added</h3>
              <p className="text-muted-foreground mb-4">
                Add your academic qualifications to improve university matching accuracy.
              </p>
              <Button onClick={addQualification}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Qualification
              </Button>
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
              <CardDescription>
                Specify languages you can speak and your proficiency levels
              </CardDescription>
            </div>
            <Button onClick={addLanguage} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Language
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {languageProficiencies.map((language, index) => (
            <div key={index} className="flex gap-3 items-end p-4 border rounded-md">
              <div className="flex-1">
                <Label>Language</Label>
                <Input
                  placeholder="e.g., English, French, Arabic"
                  value={language.language}
                  onChange={(e) => updateLanguage(index, "language", e.target.value)}
                />
              </div>
              <div className="w-40">
                <Label>Proficiency Level</Label>
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
              <div className="flex-1">
                <Label>Certification (Optional)</Label>
                <Input
                  placeholder="e.g., IELTS 7.0, TOEFL 100"
                  value={language.certification || ""}
                  onChange={(e) => updateLanguage(index, "certification", e.target.value)}
                />
              </div>
              {languageProficiencies.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeLanguage(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}

          {languageProficiencies.length === 0 && (
            <div className="text-center py-8">
              <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No languages specified</h3>
              <p className="text-muted-foreground mb-4">
                Add your language proficiencies to find universities with suitable instruction languages.
              </p>
              <Button onClick={addLanguage}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Language
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Education Level */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Current Education Level
          </CardTitle>
          <CardDescription>
            Specify your current academic status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Education Level</Label>
              <Select defaultValue="Secondary School Graduate">
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

            <div className="p-4 bg-muted/30 rounded-md">
              <h4 className="font-medium mb-2">Education Level Guide:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• <strong>Secondary School Graduate:</strong> Completed WAEC/NECO, ready for university</li>
                <li>• <strong>Diploma Student:</strong> Currently pursuing or completed a diploma</li>
                <li>• <strong>Undergraduate Student:</strong> Currently pursuing a bachelor's degree</li>
                <li>• <strong>Graduate:</strong> Completed a bachelor's degree</li>
                <li>• <strong>Postgraduate Student:</strong> Pursuing or completed master's/PhD</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading} size="lg">
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Academic Information
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
