"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GradeInputForm } from "./GradeInputForm";
import { ResultsDisplay } from "./ResultsDisplay";
import { ApplicationGuide } from "./ApplicationGuide";
import { ArrowLeft, Calculator, FileText, HelpCircle } from "lucide-react";
import Link from "next/link";

interface CalculatorInterfaceProps {
  country: string;
}

interface GradeData {
  subjects: Array<{
    subject: string;
    grade: string;
  }>;
  qualificationType: "WAEC" | "NECO";
}

export function CalculatorInterface({ country }: CalculatorInterfaceProps) {
  const [currentStep, setCurrentStep] = useState<"input" | "results" | "guide">("input");
  const [gradeData, setGradeData] = useState<GradeData | null>(null);

  const countryInfo = {
    rwanda: {
      name: "Rwanda",
      flag: "🇷🇼",
      authority: "Rwanda Education Board (REB)",
      gradingSystem: "20-Point System",
      description: "Convert your WAEC/NECO grades to Rwanda's official grading scale"
    },
    ghana: {
      name: "Ghana",
      flag: "🇬🇭",
      authority: "National Accreditation Board (NAB)",
      gradingSystem: "WASSCE System",
      description: "Verify your WAEC certificate recognition status in Ghana"
    },
    "south-africa": {
      name: "South Africa",
      flag: "🇿🇦",
      authority: "South African Qualifications Authority (SAQA)",
      gradingSystem: "NSC Level System",
      description: "Evaluate your qualifications for South African university admission"
    }
  };

  const currentCountry = countryInfo[country as keyof typeof countryInfo];

  const handleGradeSubmission = (data: GradeData) => {
    setGradeData(data);
    setCurrentStep("results");
  };

  const handleViewGuide = () => {
    setCurrentStep("guide");
  };

  const handleNewCalculation = () => {
    setGradeData(null);
    setCurrentStep("input");
  };

  const steps = [
    { id: "input", title: "Grade Input", icon: Calculator },
    { id: "results", title: "Results", icon: FileText },
    { id: "guide", title: "Application Guide", icon: HelpCircle }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/calculator">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Country Selection
            </Button>
          </Link>

          <Badge variant="outline" className="px-3 py-1">
            Equivalency Calculator
          </Badge>
        </div>

        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <span className="text-4xl">{currentCountry.flag}</span>
            <div className="text-left">
              <h1 className="text-3xl font-bold">{currentCountry.name} Calculator</h1>
              <p className="text-muted-foreground">{currentCountry.authority}</p>
            </div>
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {currentCountry.description}
          </p>

          <div className="flex justify-center">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
              {currentCountry.gradingSystem}
            </Badge>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center space-x-2 ${
                  currentStep === step.id ? 'text-primary' :
                  steps.findIndex(s => s.id === currentStep) > index ? 'text-green-600' : 'text-muted-foreground'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep === step.id ? 'bg-primary text-white' :
                    steps.findIndex(s => s.id === currentStep) > index ? 'bg-green-600 text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    {steps.findIndex(s => s.id === currentStep) > index ? (
                      <span className="text-sm">✓</span>
                    ) : (
                      <step.icon className="h-4 w-4" />
                    )}
                  </div>
                  <span className="font-medium">{step.title}</span>
                </div>

                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    steps.findIndex(s => s.id === currentStep) > index ? 'bg-green-600' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <div className="min-h-[600px]">
        {currentStep === "input" && (
          <GradeInputForm
            country={country}
            onSubmit={handleGradeSubmission}
          />
        )}

        {currentStep === "results" && gradeData && (
          <ResultsDisplay
            country={country}
            gradeData={gradeData}
            onViewGuide={handleViewGuide}
            onNewCalculation={handleNewCalculation}
          />
        )}

        {currentStep === "guide" && (
          <ApplicationGuide
            country={country}
            onBackToResults={() => setCurrentStep("results")}
            onNewCalculation={handleNewCalculation}
          />
        )}
      </div>

      {/* Help Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold">Need Help?</h3>
            <p className="text-muted-foreground">
              If you have questions about the equivalency process or need assistance with your calculation,
              our education consultants are here to help.
            </p>
            <div className="flex justify-center gap-3">
              <Button variant="outline">
                <HelpCircle className="h-4 w-4 mr-2" />
                FAQ
              </Button>
              <Link href="/counseling">
                <Button>
                  Book Consultation
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
