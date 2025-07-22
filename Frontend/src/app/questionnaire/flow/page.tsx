"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import { toast } from "sonner";

// Import questionnaire steps
import { PersonalInfoStep } from "@/components/questionnaire/PersonalInfoStep";
import { AcademicBackgroundStep } from "@/components/questionnaire/AcademicBackgroundStep";
import { StudyPreferencesStep } from "@/components/questionnaire/StudyPreferencesStep";
import { BudgetStep } from "@/components/questionnaire/BudgetStep";
import { LocationPreferencesStep } from "@/components/questionnaire/LocationPreferencesStep";
import { FinalStep } from "@/components/questionnaire/FinalStep";

export interface QuestionnaireData {
  // Personal Info
  dateOfBirth?: string;
  gender?: string;
  state?: string;
  city?: string;
  phoneNumber?: string;

  // Academic Background
  currentEducationLevel: string;
  qualifications: Array<{
    type: string;
    subjects: Array<{ subject: string; grade: string }>;
    yearCompleted: number;
    institution: string;
  }>;
  languageProficiencies: Array<{
    language: string;
    level: string;
    certification?: string;
  }>;

  // Study Preferences
  fieldsOfInterest: string[];
  preferredDegreeTypes: string[];
  studyMode: string;
  startDate: string;

  // Budget
  budgetRange: {
    min: number;
    max: number;
  };
  scholarshipRequired: boolean;

  // Location Preferences
  preferredCountries: string[];
  accommodationPreference: string;
  preferredLanguages: string[];
}

const steps = [
  { id: 1, name: "Personal Info", description: "Basic information about you" },
  { id: 2, name: "Academic Background", description: "Your educational qualifications" },
  { id: 3, name: "Study Preferences", description: "What you want to study" },
  { id: 4, name: "Budget", description: "Your financial preferences" },
  { id: 5, name: "Location", description: "Where you want to study" },
  { id: 6, name: "Review", description: "Review and submit" },
];

export default function QuestionnaireFlowPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData>({
    currentEducationLevel: "",
    qualifications: [],
    languageProficiencies: [{ language: "English", level: "Native" }],
    fieldsOfInterest: [],
    preferredDegreeTypes: [],
    studyMode: "Full-time",
    startDate: "Next Year",
    budgetRange: { min: 0, max: 20000 },
    scholarshipRequired: false,
    preferredCountries: [],
    accommodationPreference: "No Preference",
    preferredLanguages: ["English"],
  });

  const { user } = useAuth();
  const router = useRouter();

  const updateQuestionnaireData = (data: Partial<QuestionnaireData>) => {
    setQuestionnaireData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitQuestionnaire = async () => {
    // Here you would normally save to a database
    // For now, we'll update the user's preferences in localStorage
    if (user) {
      const updatedUser = {
        ...user,
        dateOfBirth: questionnaireData.dateOfBirth,
        gender: questionnaireData.gender,
        state: questionnaireData.state,
        city: questionnaireData.city,
        phoneNumber: questionnaireData.phoneNumber,
        qualifications: questionnaireData.qualifications,
        languageProficiencies: questionnaireData.languageProficiencies,
        studyPreferences: {
          fieldsOfInterest: questionnaireData.fieldsOfInterest,
          preferredCountries: questionnaireData.preferredCountries,
          preferredDegreeTypes: questionnaireData.preferredDegreeTypes,
          preferredLanguages: questionnaireData.preferredLanguages,
          budgetRange: questionnaireData.budgetRange,
          accommodationPreference: questionnaireData.accommodationPreference,
          startDate: questionnaireData.startDate,
          studyMode: questionnaireData.studyMode,
          scholarshipRequired: questionnaireData.scholarshipRequired,
        },
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem("educonnect_user", JSON.stringify(updatedUser));
      }
      toast.success("Your preferences have been saved! Finding your personalized matches...");

      // Redirect to personalized results
      router.push("/universities?personalized=true");
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            data={questionnaireData}
            updateData={updateQuestionnaireData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <AcademicBackgroundStep
            data={questionnaireData}
            updateData={updateQuestionnaireData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <StudyPreferencesStep
            data={questionnaireData}
            updateData={updateQuestionnaireData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <BudgetStep
            data={questionnaireData}
            updateData={updateQuestionnaireData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 5:
        return (
          <LocationPreferencesStep
            data={questionnaireData}
            updateData={updateQuestionnaireData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 6:
        return (
          <FinalStep
            data={questionnaireData}
            onPrev={prevStep}
            onSubmit={submitQuestionnaire}
          />
        );
      default:
        return null;
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <MainLayout>
      <div className="container py-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">University Matching Questionnaire</h1>
          <p className="text-muted-foreground">
            Help us find the perfect universities for you by answering a few questions
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <span className="text-sm font-medium">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />

          {/* Step indicators */}
          <div className="flex justify-between mt-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex flex-col items-center ${
                  step.id <= currentStep ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${
                    step.id < currentStep
                      ? "bg-primary text-primary-foreground"
                      : step.id === currentStep
                      ? "bg-primary/20 text-primary border-2 border-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.id < currentStep ? "✓" : step.id}
                </div>
                <span className="text-xs font-medium hidden sm:block">{step.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        <div className="mb-8">
          {renderCurrentStep()}
        </div>
      </div>
    </MainLayout>
  );
}
