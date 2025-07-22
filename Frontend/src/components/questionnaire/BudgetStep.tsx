"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, DollarSign } from "lucide-react";
import type { QuestionnaireData } from "@/app/questionnaire/flow/page";

interface BudgetStepProps {
  data: QuestionnaireData;
  updateData: (data: Partial<QuestionnaireData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function BudgetStep({ data, updateData, onNext, onPrev }: BudgetStepProps) {
  const [budgetRange, setBudgetRange] = useState(data.budgetRange);
  const [scholarshipRequired, setScholarshipRequired] = useState(data.scholarshipRequired);

  const handleBudgetChange = (values: number[]) => {
    setBudgetRange({ min: values[0], max: values[1] });
  };

  const handleNext = () => {
    updateData({
      budgetRange,
      scholarshipRequired
    });
    onNext();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center mb-2">
          <DollarSign className="h-6 w-6 text-primary mr-2" />
          <CardTitle>Budget & Financial Preferences</CardTitle>
        </div>
        <CardDescription>
          Help us recommend universities within your financial means
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Budget Range */}
        <div className="space-y-4">
          <Label>Annual Tuition Budget (USD)</Label>
          <p className="text-sm text-muted-foreground">
            Set your budget range for annual tuition fees. This doesn't include living expenses.
          </p>

          <div className="px-4 py-6">
            <Slider
              value={[budgetRange.min, budgetRange.max]}
              onValueChange={handleBudgetChange}
              max={25000}
              step={500}
              className="w-full"
            />
          </div>

          <div className="flex justify-between text-sm font-medium">
            <span>${budgetRange.min.toLocaleString()}</span>
            <span>${budgetRange.max.toLocaleString()}</span>
          </div>

          <div className="bg-muted/50 p-4 rounded-md">
            <h4 className="font-medium mb-2">Your selected budget range:</h4>
            <p className="text-lg font-semibold text-primary">
              ${budgetRange.min.toLocaleString()} - ${budgetRange.max.toLocaleString()} per year
            </p>
          </div>
        </div>

        {/* Scholarship Interest */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="scholarship"
              checked={scholarshipRequired}
              onCheckedChange={(checked) => setScholarshipRequired(checked as boolean)}
            />
            <Label htmlFor="scholarship" className="text-base font-medium cursor-pointer">
              I am interested in scholarships and financial aid
            </Label>
          </div>
          <p className="text-sm text-muted-foreground ml-6">
            Check this if you'd like us to prioritize universities with scholarship opportunities
          </p>
        </div>

        {/* Budget Guidelines */}
        <div className="bg-blue-50 p-4 rounded-md">
          <h3 className="font-medium mb-3">Budget Guidelines for African Universities:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-1">Low Cost ($1,000 - $3,000)</h4>
              <p className="text-muted-foreground">Rwanda, Kenya, Ghana (public universities)</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Medium Cost ($3,000 - $7,000)</h4>
              <p className="text-muted-foreground">South Africa, Ghana (private), Egypt (public)</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Higher Cost ($7,000 - $15,000)</h4>
              <p className="text-muted-foreground">Egypt (private), Morocco, premium programs</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Premium ($15,000+)</h4>
              <p className="text-muted-foreground">International programs, specialized schools</p>
            </div>
          </div>
        </div>

        {/* Additional Costs Info */}
        <div className="bg-muted/50 p-4 rounded-md">
          <h3 className="font-medium mb-2">Remember to budget for:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Living expenses ($2,000 - $6,000 per year)</li>
            <li>• Accommodation ($800 - $3,000 per year)</li>
            <li>• Visa and application fees ($200 - $500)</li>
            <li>• Travel and transport costs</li>
            <li>• Books and materials ($200 - $500 per year)</li>
          </ul>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onPrev}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button onClick={handleNext}>
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
