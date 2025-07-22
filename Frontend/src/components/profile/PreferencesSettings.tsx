"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/context/AuthContext";
import { GraduationCap, MapPin, DollarSign, Save } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const fieldsOfStudy = [
  "Business & Management", "Engineering & Technology", "Medicine & Health Sciences",
  "Arts & Humanities", "Natural Sciences", "Social Sciences", "Computer Science & IT",
  "Education", "Law", "Agriculture & Environmental Sciences", "Media & Communications",
  "Architecture & Construction", "Mathematics & Statistics", "Psychology",
  "International Relations", "Economics & Finance", "Other"
];

const africanCountries = [
  "Ghana", "South Africa", "Kenya", "Rwanda", "Egypt", "Morocco",
  "Tanzania", "Uganda", "Botswana", "Namibia", "Senegal", "Ethiopia",
  "Tunisia", "Algeria", "Zambia", "Zimbabwe"
];

const degreeTypes = ["Certificate", "Diploma", "Bachelor", "Master", "PhD"];
const languages = ["English", "French", "Arabic", "Portuguese", "Swahili", "Afrikaans"];
const studyModes = ["Full-time", "Part-time", "Online", "Hybrid", "No Preference"];
const startDates = ["Immediate", "Next 3 Months", "Next 6 Months", "Next Year", "Flexible"];
const accommodationOptions = ["Required", "Not Required", "No Preference"];

export function PreferencesSettings() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const preferences = user?.studyPreferences;

  const [fieldsOfInterest, setFieldsOfInterest] = useState<string[]>(preferences?.fieldsOfInterest || []);
  const [preferredCountries, setPreferredCountries] = useState<string[]>(preferences?.preferredCountries || []);
  const [preferredDegreeTypes, setPreferredDegreeTypes] = useState<string[]>(preferences?.preferredDegreeTypes || []);
  const [preferredLanguages, setPreferredLanguages] = useState<string[]>(preferences?.preferredLanguages || ["English"]);
  const [budgetRange, setBudgetRange] = useState({
    min: preferences?.budgetRange?.min || 0,
    max: preferences?.budgetRange?.max || 20000
  });
  const [accommodationPreference, setAccommodationPreference] = useState(preferences?.accommodationPreference || "No Preference");
  const [startDate, setStartDate] = useState(preferences?.startDate || "Flexible");
  const [studyMode, setStudyMode] = useState(preferences?.studyMode || "No Preference");
  const [scholarshipRequired, setScholarshipRequired] = useState(preferences?.scholarshipRequired || false);

  const handleFieldToggle = (field: string) => {
    setFieldsOfInterest(prev =>
      prev.includes(field)
        ? prev.filter(f => f !== field)
        : [...prev, field]
    );
  };

  const handleCountryToggle = (country: string) => {
    setPreferredCountries(prev =>
      prev.includes(country)
        ? prev.filter(c => c !== country)
        : [...prev, country]
    );
  };

  const handleDegreeTypeToggle = (type: string) => {
    setPreferredDegreeTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleLanguageToggle = (language: string) => {
    setPreferredLanguages(prev =>
      prev.includes(language)
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  const handleBudgetChange = (values: number[]) => {
    setBudgetRange({ min: values[0], max: values[1] });
  };

  const handleSave = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update user's study preferences
    if (user) {
      const updatedUser = {
        ...user,
        studyPreferences: {
          fieldsOfInterest,
          preferredCountries,
          preferredDegreeTypes,
          preferredLanguages,
          budgetRange,
          accommodationPreference,
          startDate,
          studyMode,
          scholarshipRequired
        }
      };
      localStorage.setItem("educonnect_user", JSON.stringify(updatedUser));
      toast.success("Study preferences updated successfully!");
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
      {/* Fields of Interest */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <GraduationCap className="h-5 w-5 mr-2" />
            Fields of Interest
          </CardTitle>
          <CardDescription>
            Select the academic fields you're interested in studying
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
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
            <div className="mt-4">
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
        </CardContent>
      </Card>

      {/* Location Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Location Preferences
          </CardTitle>
          <CardDescription>
            Choose your preferred countries and accommodation needs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-medium mb-3 block">Preferred Countries</Label>
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

          <div>
            <Label className="text-base font-medium mb-3 block">Languages of Instruction</Label>
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
          </div>

          <div>
            <Label className="text-base font-medium mb-2 block">Accommodation Preference</Label>
            <Select value={accommodationPreference} onValueChange={setAccommodationPreference}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select accommodation preference" />
              </SelectTrigger>
              <SelectContent>
                {accommodationOptions.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Degree Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Degree Preferences</CardTitle>
          <CardDescription>
            Specify the types of degrees and study modes you prefer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-medium mb-3 block">Preferred Degree Types</Label>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-base font-medium mb-2 block">Study Mode</Label>
              <Select value={studyMode} onValueChange={setStudyMode}>
                <SelectTrigger>
                  <SelectValue placeholder="Select study mode" />
                </SelectTrigger>
                <SelectContent>
                  {studyModes.map((mode) => (
                    <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium mb-2 block">Preferred Start Date</Label>
              <Select value={startDate} onValueChange={setStartDate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select start date" />
                </SelectTrigger>
                <SelectContent>
                  {startDates.map((date) => (
                    <SelectItem key={date} value={date}>{date}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            Budget & Financial Preferences
          </CardTitle>
          <CardDescription>
            Set your budget range and scholarship preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-medium mb-4 block">Annual Tuition Budget (USD)</Label>
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
            <div className="bg-muted/50 p-4 rounded-md mt-4">
              <p className="text-lg font-semibold text-primary">
                ${budgetRange.min.toLocaleString()} - ${budgetRange.max.toLocaleString()} per year
              </p>
            </div>
          </div>

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
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Take action based on your updated preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Link href="/universities?personalized=true">
              <Button variant="outline">
                View My University Matches
              </Button>
            </Link>
            <Link href="/scholarships">
              <Button variant="outline">
                Find Scholarships
              </Button>
            </Link>
            <Link href="/questionnaire/flow">
              <Button variant="outline">
                Retake Full Questionnaire
              </Button>
            </Link>
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
              Save Preferences
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
