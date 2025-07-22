"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import type { QuestionnaireData } from "@/app/questionnaire/flow/page";

interface LocationPreferencesStepProps {
  data: QuestionnaireData;
  updateData: (data: Partial<QuestionnaireData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const africanCountries = [
  "Ghana",
  "South Africa",
  "Kenya",
  "Rwanda",
  "Egypt",
  "Morocco",
  "Tanzania",
  "Uganda",
  "Botswana",
  "Namibia",
  "Senegal",
  "Ethiopia",
  "Tunisia",
  "Algeria",
  "Zambia",
  "Zimbabwe"
];

const languages = [
  "English",
  "French",
  "Arabic",
  "Portuguese",
  "Swahili",
  "Afrikaans"
];

const accommodationOptions = [
  "Required",
  "Not Required",
  "No Preference"
];

export function LocationPreferencesStep({ data, updateData, onNext, onPrev }: LocationPreferencesStepProps) {
  const [preferredCountries, setPreferredCountries] = useState<string[]>(data.preferredCountries);
  const [preferredLanguages, setPreferredLanguages] = useState<string[]>(data.preferredLanguages);
  const [accommodationPreference, setAccommodationPreference] = useState(data.accommodationPreference);

  const handleCountryToggle = (country: string) => {
    setPreferredCountries(prev =>
      prev.includes(country)
        ? prev.filter(c => c !== country)
        : [...prev, country]
    );
  };

  const handleLanguageToggle = (language: string) => {
    setPreferredLanguages(prev =>
      prev.includes(language)
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  const handleNext = () => {
    updateData({
      preferredCountries,
      preferredLanguages,
      accommodationPreference
    });
    onNext();
  };

  const isFormValid = preferredCountries.length > 0 && preferredLanguages.length > 0 && accommodationPreference;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center mb-2">
          <MapPin className="h-6 w-6 text-primary mr-2" />
          <CardTitle>Location Preferences</CardTitle>
        </div>
        <CardDescription>
          Tell us where you'd like to study and your accommodation needs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Preferred Countries */}
        <div className="space-y-3">
          <Label>Preferred Countries * (Select all that apply)</Label>
          <p className="text-sm text-muted-foreground mb-3">
            Choose the African countries where you'd like to study
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {africanCountries.map((country) => (
              <div key={country} className="flex items-center space-x-2">
                <Checkbox
                  id={`country-${country}`}
                  checked={preferredCountries.includes(country)}
                  onCheckedChange={() => handleCountryToggle(country)}
                />
                <Label htmlFor={`country-${country}`} className="text-sm cursor-pointer">
                  {country}
                </Label>
              </div>
            ))}
          </div>
          {preferredCountries.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium mb-2">Selected countries:</p>
              <div className="flex flex-wrap gap-2">
                {preferredCountries.map((country) => (
                  <Badge key={country} variant="secondary" className="cursor-pointer" onClick={() => handleCountryToggle(country)}>
                    {country} ×
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Language Preferences */}
        <div className="space-y-3">
          <Label>Languages of Instruction * (Select all that apply)</Label>
          <p className="text-sm text-muted-foreground mb-3">
            Select languages you're comfortable studying in
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {languages.map((language) => (
              <div key={language} className="flex items-center space-x-2">
                <Checkbox
                  id={`lang-${language}`}
                  checked={preferredLanguages.includes(language)}
                  onCheckedChange={() => handleLanguageToggle(language)}
                />
                <Label htmlFor={`lang-${language}`} className="text-sm cursor-pointer">
                  {language}
                </Label>
              </div>
            ))}
          </div>
          {preferredLanguages.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium mb-2">Selected languages:</p>
              <div className="flex flex-wrap gap-2">
                {preferredLanguages.map((language) => (
                  <Badge key={language} variant="secondary" className="cursor-pointer" onClick={() => handleLanguageToggle(language)}>
                    {language} ×
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Accommodation Preference */}
        <div className="space-y-2">
          <Label htmlFor="accommodation">Accommodation Preference *</Label>
          <Select value={accommodationPreference} onValueChange={setAccommodationPreference}>
            <SelectTrigger>
              <SelectValue placeholder="Select your accommodation preference" />
            </SelectTrigger>
            <SelectContent>
              {accommodationOptions.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Do you need the university to provide accommodation?
          </p>
        </div>

        {/* Country Information */}
        <div className="bg-muted/50 p-4 rounded-md">
          <h3 className="font-medium mb-3">Quick Country Guide:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-1">English-Speaking</h4>
              <p className="text-muted-foreground">Ghana, South Africa, Kenya, Rwanda, Uganda, Botswana, Namibia</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">French-Speaking</h4>
              <p className="text-muted-foreground">Morocco (partial), Senegal, Tunisia (partial)</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Arabic-Speaking</h4>
              <p className="text-muted-foreground">Egypt, Morocco, Tunisia, Algeria</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Most Affordable</h4>
              <p className="text-muted-foreground">Rwanda, Kenya, Ghana, Uganda</p>
            </div>
          </div>
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
