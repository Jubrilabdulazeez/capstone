"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import type { QuestionnaireData } from "@/app/questionnaire/flow/page";
import { useState } from "react";

interface FinalStepProps {
  data: QuestionnaireData;
  onPrev: () => void;
  onSubmit: () => void;
}

export function FinalStep({ data, onPrev, onSubmit }: FinalStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    onSubmit();
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center mb-2">
          <CheckCircle className="h-6 w-6 text-primary mr-2" />
          <CardTitle>Review Your Preferences</CardTitle>
        </div>
        <CardDescription>
          Please review your information before we find your personalized university matches
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-2">
          <h3 className="font-semibold">Personal Information</h3>
          <div className="bg-muted/50 p-3 rounded-md">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><strong>Date of Birth:</strong> {data.dateOfBirth || "Not provided"}</div>
              <div><strong>Gender:</strong> {data.gender || "Not provided"}</div>
              <div><strong>State:</strong> {data.state || "Not provided"}</div>
              <div><strong>City:</strong> {data.city || "Not provided"}</div>
            </div>
          </div>
        </div>

        {/* Academic Background */}
        <div className="space-y-2">
          <h3 className="font-semibold">Academic Background</h3>
          <div className="bg-muted/50 p-3 rounded-md">
            <div className="text-sm mb-2">
              <strong>Current Level:</strong> {data.currentEducationLevel}
            </div>
            <div className="text-sm mb-2">
              <strong>Qualifications:</strong> {data.qualifications.length} qualification(s)
            </div>
            <div className="text-sm">
              <strong>Languages:</strong> {data.languageProficiencies.map(l => `${l.language} (${l.level})`).join(", ")}
            </div>
          </div>
        </div>

        {/* Study Preferences */}
        <div className="space-y-2">
          <h3 className="font-semibold">Study Preferences</h3>
          <div className="bg-muted/50 p-3 rounded-md space-y-2">
            <div>
              <strong className="text-sm block mb-1">Fields of Interest:</strong>
              <div className="flex flex-wrap gap-1">
                {data.fieldsOfInterest.map(field => (
                  <Badge key={field} variant="outline" className="text-xs">{field}</Badge>
                ))}
              </div>
            </div>
            <div>
              <strong className="text-sm block mb-1">Degree Types:</strong>
              <div className="flex flex-wrap gap-1">
                {data.preferredDegreeTypes.map(type => (
                  <Badge key={type} variant="outline" className="text-xs">{type}</Badge>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><strong>Study Mode:</strong> {data.studyMode}</div>
              <div><strong>Start Date:</strong> {data.startDate}</div>
            </div>
          </div>
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <h3 className="font-semibold">Budget</h3>
          <div className="bg-muted/50 p-3 rounded-md">
            <div className="text-sm">
              <strong>Tuition Budget:</strong> ${data.budgetRange.min.toLocaleString()} - ${data.budgetRange.max.toLocaleString()} per year
            </div>
            <div className="text-sm">
              <strong>Scholarship Interest:</strong> {data.scholarshipRequired ? "Yes" : "No"}
            </div>
          </div>
        </div>

        {/* Location Preferences */}
        <div className="space-y-2">
          <h3 className="font-semibold">Location Preferences</h3>
          <div className="bg-muted/50 p-3 rounded-md space-y-2">
            <div>
              <strong className="text-sm block mb-1">Preferred Countries:</strong>
              <div className="flex flex-wrap gap-1">
                {data.preferredCountries.map(country => (
                  <Badge key={country} variant="outline" className="text-xs">{country}</Badge>
                ))}
              </div>
            </div>
            <div>
              <strong className="text-sm block mb-1">Languages:</strong>
              <div className="flex flex-wrap gap-1">
                {data.preferredLanguages.map(language => (
                  <Badge key={language} variant="outline" className="text-xs">{language}</Badge>
                ))}
              </div>
            </div>
            <div className="text-sm">
              <strong>Accommodation:</strong> {data.accommodationPreference}
            </div>
          </div>
        </div>

        {/* What happens next */}
        <div className="bg-primary/5 border border-primary/20 p-4 rounded-md">
          <h3 className="font-semibold mb-2">What happens next?</h3>
          <ul className="text-sm space-y-1">
            <li>✓ We'll analyze your preferences and qualifications</li>
            <li>✓ Find universities that match your criteria</li>
            <li>✓ Calculate match percentages based on your profile</li>
            <li>✓ Show you personalized recommendations with detailed information</li>
            <li>✓ Highlight scholarship opportunities you're eligible for</li>
          </ul>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onPrev} disabled={isSubmitting}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting} size="lg">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Finding Your Matches...
              </>
            ) : (
              "Find My University Matches"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
