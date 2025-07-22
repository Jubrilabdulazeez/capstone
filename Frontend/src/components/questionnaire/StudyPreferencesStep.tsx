"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, GraduationCap } from "lucide-react";
import type { QuestionnaireData } from "@/app/questionnaire/flow/page";

interface StudyPreferencesStepProps {
  data: QuestionnaireData;
  updateData: (data: Partial<QuestionnaireData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const fieldsOfStudy = [
  "Business & Management",
  "Engineering & Technology",
  "Medicine & Health Sciences",
  "Arts & Humanities",
  "Natural Sciences",
  "Social Sciences",
  "Computer Science & IT",
  "Education",
  "Law",
  "Agriculture & Environmental Sciences",
  "Media & Communications",
  "Architecture & Construction",
  "Mathematics & Statistics",
  "Psychology",
  "International Relations",
  "Economics & Finance",
  "Other"
];

const degreeTypes = [
  "Certificate",
  "Diploma",
  "Bachelor",
  "Master",
  "PhD"
];

const studyModes = [
  "Full-time",
  "Part-time",
  "Online",
  "Hybrid",
  "No Preference"
];

const startDates = [
  "Immediate",
  "Next 3 Months",
  "Next 6 Months",
  "Next Year",
  "Flexible"
];

export function StudyPreferencesStep({ data, updateData, onNext, onPrev }: StudyPreferencesStepProps) {
  const [fieldsOfInterest, setFieldsOfInterest] = useState<string[]>(data.fieldsOfInterest);
  const [preferredDegreeTypes, setPreferredDegreeTypes] = useState<string[]>(data.preferredDegreeTypes);
  const [studyMode, setStudyMode] = useState(data.studyMode);
  const [startDate, setStartDate] = useState(data.startDate);

  const handleFieldToggle = (field: string) => {
    setFieldsOfInterest(prev =>
      prev.includes(field)
        ? prev.filter(f => f !== field)
        : [...prev, field]
    );
  };

  const handleDegreeTypeToggle = (type: string) => {
    setPreferredDegreeTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleNext = () => {
    updateData({
      fieldsOfInterest,
      preferredDegreeTypes,
      studyMode,
      startDate
    });
    onNext();
  };

  const isFormValid = fieldsOfInterest.length > 0 && preferredDegreeTypes.length > 0 && studyMode && startDate;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center mb-2">
          <GraduationCap className="h-6 w-6 text-primary mr-2" />
          <CardTitle>Study Preferences</CardTitle>
        </div>
        <CardDescription>
          Tell us what you want to study and how you prefer to study
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Fields of Interest */}
        <div className="space-y-3">
          <Label>Fields of Interest * (Select all that apply)</Label>
          <p className="text-sm text-muted-foreground mb-3">
            Choose the subjects or areas you're interested in studying
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {fieldsOfStudy.map((field) => (
              <div key={field} className="flex items-center space-x-2">
                <Checkbox
                  id={`field-${field}`}
                  checked={fieldsOfInterest.includes(field)}
                  onCheckedChange={() => handleFieldToggle(field)}
                />
                <Label htmlFor={`field-${field}`} className="text-sm cursor-pointer">
                  {field}
                </Label>
              </div>
            ))}
          </div>
          {fieldsOfInterest.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium mb-2">Selected fields:</p>
              <div className="flex flex-wrap gap-2">
                {fieldsOfInterest.map((field) => (
                  <Badge key={field} variant="secondary" className="cursor-pointer" onClick={() => handleFieldToggle(field)}>
                    {field} ×
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Preferred Degree Types */}
        <div className="space-y-3">
          <Label>Preferred Degree Types * (Select all that apply)</Label>
          <p className="text-sm text-muted-foreground mb-3">
            What level of education are you looking for?
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {degreeTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`degree-${type}`}
                  checked={preferredDegreeTypes.includes(type)}
                  onCheckedChange={() => handleDegreeTypeToggle(type)}
                />
                <Label htmlFor={`degree-${type}`} className="text-sm cursor-pointer">
                  {type}
                </Label>
              </div>
            ))}
          </div>
          {preferredDegreeTypes.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium mb-2">Selected types:</p>
              <div className="flex flex-wrap gap-2">
                {preferredDegreeTypes.map((type) => (
                  <Badge key={type} variant="secondary" className="cursor-pointer" onClick={() => handleDegreeTypeToggle(type)}>
                    {type} ×
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Study Mode */}
        <div className="space-y-2">
          <Label htmlFor="studyMode">Preferred Study Mode *</Label>
          <Select value={studyMode} onValueChange={setStudyMode}>
            <SelectTrigger>
              <SelectValue placeholder="Select your preferred study mode" />
            </SelectTrigger>
            <SelectContent>
              {studyModes.map((mode) => (
                <SelectItem key={mode} value={mode}>{mode}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Choose how you prefer to attend classes and complete your studies
          </p>
        </div>

        {/* Start Date */}
        <div className="space-y-2">
          <Label htmlFor="startDate">When do you want to start? *</Label>
          <Select value={startDate} onValueChange={setStartDate}>
            <SelectTrigger>
              <SelectValue placeholder="Select when you want to start your studies" />
            </SelectTrigger>
            <SelectContent>
              {startDates.map((date) => (
                <SelectItem key={date} value={date}>{date}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            This helps us recommend programs with suitable application deadlines
          </p>
        </div>

        {/* Information Box */}
        <div className="bg-muted/50 p-4 rounded-md">
          <h3 className="font-medium mb-2">Why do we ask about your study preferences?</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• We match you with universities that offer your preferred fields of study</li>
            <li>• Different degree types have different admission requirements</li>
            <li>• Study mode affects program availability and format</li>
            <li>• Timeline helps us recommend programs with upcoming intakes</li>
          </ul>
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
