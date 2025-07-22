"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink, MapPin, Building, DollarSign, Clock } from "lucide-react";
import { GradeInput } from "./GradeInput";

type Country = "rwanda" | "ghana" | "south-africa";

const countryData = {
  rwanda: {
    name: "Rwanda",
    flag: "🇷🇼",
    authority: "Rwanda Education Board (REB)",
    website: "www.reb.gov.rw",
    system: "REB 20-Point System",
    description: "Convert to Rwanda's 20-point grading system for university admission",
    gradingScale: [
      { grade: "A", points: "18-20", description: "Distinction" },
      { grade: "B+", points: "15-17", description: "Upper Credit" },
      { grade: "B", points: "12-14", description: "Credit" },
      { grade: "C+", points: "10-11", description: "Lower Credit" },
      { grade: "C", points: "8-9", description: "Pass" },
      { grade: "C-", points: "6-7", description: "Weak Pass" },
      { grade: "D+", points: "4-5", description: "Weak Pass" },
      { grade: "D", points: "2-3", description: "Fail" },
      { grade: "E", points: "0-1", description: "Fail" }
    ],
    applicationFee: "$50 USD",
    processingTime: "4-6 weeks",
    type: "conversion"
  },
  ghana: {
    name: "Ghana",
    flag: "🇬🇭",
    authority: "National Accreditation Board (NAB)",
    website: "www.nab.gov.gh",
    system: "WASSCE Direct Recognition",
    description: "Nigerian WAEC grades are directly recognized - verification only required",
    gradingScale: [
      { grade: "A1", points: "A1", description: "Excellent" },
      { grade: "B2", points: "B2", description: "Very Good" },
      { grade: "B3", points: "B3", description: "Good" },
      { grade: "C4", points: "C4", description: "Credit" },
      { grade: "C5", points: "C5", description: "Credit" },
      { grade: "C6", points: "C6", description: "Credit" },
      { grade: "D7", points: "D7", description: "Pass" },
      { grade: "E8", points: "E8", description: "Pass" },
      { grade: "F9", points: "F9", description: "Fail" }
    ],
    applicationFee: "$30 USD",
    processingTime: "2-3 weeks",
    type: "verification"
  },
  "south-africa": {
    name: "South Africa",
    flag: "🇿🇦",
    authority: "South African Qualifications Authority (SAQA)",
    website: "www.saqa.org.za",
    system: "National Senior Certificate (NSC)",
    description: "Convert to NSC achievement levels for university admission",
    gradingScale: [
      { grade: "Level 7", points: "80-100%", description: "Outstanding Achievement" },
      { grade: "Level 6", points: "70-79%", description: "Meritorious Achievement" },
      { grade: "Level 5", points: "60-69%", description: "Substantial Achievement" },
      { grade: "Level 4", points: "50-59%", description: "Adequate Achievement" },
      { grade: "Level 3", points: "40-49%", description: "Moderate Achievement" },
      { grade: "Level 2", points: "30-39%", description: "Elementary Achievement" },
      { grade: "Level 1", points: "0-29%", description: "Not Achieved" }
    ],
    applicationFee: "$200 USD",
    processingTime: "8-12 weeks",
    type: "evaluation"
  }
};

export function CountrySelection() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  if (selectedCountry) {
    return <GradeInput country={selectedCountry} onBack={() => setSelectedCountry(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Step 1: Select Your Target Country</h2>
        <p className="text-muted-foreground">
          Choose the country where you plan to study to see the specific conversion requirements
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {Object.entries(countryData).map(([key, country]) => (
          <Card
            key={key}
            className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50 relative overflow-hidden"
            onClick={() => setSelectedCountry(key as Country)}
          >
            <div className="absolute top-4 right-4 text-2xl">
              {country.flag}
            </div>

            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span>{country.name}</span>
              </CardTitle>
              <CardDescription className="text-sm">
                {country.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Education Authority */}
              <div className="flex items-start space-x-2">
                <Building className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">{country.authority}</p>
                  <p className="text-xs text-muted-foreground">{country.website}</p>
                </div>
              </div>

              {/* Grading System */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Grading System</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {country.system}
                </Badge>
              </div>

              {/* Sample Grades */}
              <div>
                <p className="text-sm font-medium mb-2">Sample Conversions:</p>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div className="bg-muted/50 p-1 rounded text-center">
                    <span className="text-muted-foreground">A1 →</span> {country.gradingScale[0].grade}
                  </div>
                  <div className="bg-muted/50 p-1 rounded text-center">
                    <span className="text-muted-foreground">B2 →</span> {country.gradingScale[1].grade}
                  </div>
                </div>
              </div>

              {/* Application Details */}
              <div className="space-y-2 pt-2 border-t">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-3 w-3" />
                    <span>Fee:</span>
                  </div>
                  <span className="font-medium">{country.applicationFee}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>Processing:</span>
                  </div>
                  <span className="font-medium">{country.processingTime}</span>
                </div>
              </div>

              {/* Action Button */}
              <Button className="w-full mt-4" size="sm">
                Calculate for {country.name}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Information */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 p-1 rounded-full flex-shrink-0">
              <ExternalLink className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Need More Information?</h4>
              <p className="text-sm text-blue-700 mb-3">
                Visit the official education authority websites for the most up-to-date requirements and guidelines.
              </p>
              <div className="flex flex-wrap gap-2">
                {Object.values(countryData).map((country) => (
                  <Badge key={country.name} variant="outline" className="text-blue-700 border-blue-300">
                    {country.website}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
