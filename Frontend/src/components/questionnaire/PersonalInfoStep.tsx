"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, User } from "lucide-react";
import type { QuestionnaireData } from "@/app/questionnaire/flow/page";

interface PersonalInfoStepProps {
  data: QuestionnaireData;
  updateData: (data: Partial<QuestionnaireData>) => void;
  onNext: () => void;
}

const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo",
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
  "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
  "Yobe", "Zamfara"
];

export function PersonalInfoStep({ data, updateData, onNext }: PersonalInfoStepProps) {
  const [formData, setFormData] = useState({
    dateOfBirth: data.dateOfBirth || "",
    gender: data.gender || "",
    state: data.state || "",
    city: data.city || "",
    phoneNumber: data.phoneNumber || "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    updateData(formData);
    onNext();
  };

  const isFormValid = formData.dateOfBirth && formData.gender && formData.state;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center mb-2">
          <User className="h-6 w-6 text-primary mr-2" />
          <CardTitle>Personal Information</CardTitle>
        </div>
        <CardDescription>
          Tell us a bit about yourself to help us provide better recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth *</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender *</Label>
            <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="state">State of Origin *</Label>
            <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your state" />
              </SelectTrigger>
              <SelectContent>
                {nigerianStates.map((state) => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="Enter your city"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            placeholder="+234 xxx xxx xxxx"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Optional: We may use this to contact you about your applications
          </p>
        </div>

        <div className="bg-muted/50 p-4 rounded-md">
          <h3 className="font-medium mb-2">Why do we need this information?</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Age helps us recommend age-appropriate programs</li>
            <li>• Location helps us suggest nearby universities or regional programs</li>
            <li>• This information is kept private and secure</li>
          </ul>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleNext} disabled={!isFormValid}>
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
