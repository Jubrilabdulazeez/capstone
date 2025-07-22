"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Download, ExternalLink, CheckCircle, Clock, DollarSign, FileText, AlertTriangle } from "lucide-react";

type Country = "rwanda" | "ghana" | "south-africa";

interface Subject {
  name: string;
  grade: string;
  required?: boolean;
}

interface GradeResultsProps {
  country: Country;
  qualification: "WAEC" | "NECO";
  year: string;
  subjects: Subject[];
  onBack: () => void;
  onStartOver: () => void;
}

// Grade conversion mappings
const gradeConversions = {
  rwanda: {
    A1: { grade: "A", points: "18-20", description: "Distinction", eligible: true },
    B2: { grade: "B+", points: "15-17", description: "Upper Credit", eligible: true },
    B3: { grade: "B", points: "12-14", description: "Credit", eligible: true },
    C4: { grade: "C+", points: "10-11", description: "Lower Credit", eligible: true },
    C5: { grade: "C", points: "8-9", description: "Pass", eligible: true },
    C6: { grade: "C-", points: "6-7", description: "Weak Pass", eligible: true },
    D7: { grade: "D+", points: "4-5", description: "Weak Pass", eligible: false },
    E8: { grade: "D", points: "2-3", description: "Fail", eligible: false },
    F9: { grade: "E", points: "0-1", description: "Fail", eligible: false }
  },
  ghana: {
    A1: { grade: "A1", points: "A1", description: "Excellent", eligible: true },
    B2: { grade: "B2", points: "B2", description: "Very Good", eligible: true },
    B3: { grade: "B3", points: "B3", description: "Good", eligible: true },
    C4: { grade: "C4", points: "C4", description: "Credit", eligible: true },
    C5: { grade: "C5", points: "C5", description: "Credit", eligible: true },
    C6: { grade: "C6", points: "C6", description: "Credit", eligible: true },
    D7: { grade: "D7", points: "D7", description: "Pass", eligible: false },
    E8: { grade: "E8", points: "E8", description: "Pass", eligible: false },
    F9: { grade: "F9", points: "F9", description: "Fail", eligible: false }
  },
  "south-africa": {
    A1: { grade: "Level 7", points: "80-100%", description: "Outstanding Achievement", eligible: true },
    B2: { grade: "Level 6", points: "70-79%", description: "Meritorious Achievement", eligible: true },
    B3: { grade: "Level 5", points: "60-69%", description: "Substantial Achievement", eligible: true },
    C4: { grade: "Level 4", points: "50-59%", description: "Adequate Achievement", eligible: true },
    C5: { grade: "Level 3", points: "40-49%", description: "Moderate Achievement", eligible: true },
    C6: { grade: "Level 2", points: "30-39%", description: "Elementary Achievement", eligible: false },
    D7: { grade: "Level 1", points: "0-29%", description: "Not Achieved", eligible: false },
    E8: { grade: "Level 1", points: "0-29%", description: "Not Achieved", eligible: false },
    F9: { grade: "Level 1", points: "0-29%", description: "Not Achieved", eligible: false }
  }
};

const countryData = {
  rwanda: {
    name: "Rwanda",
    flag: "🇷🇼",
    authority: "Rwanda Education Board (REB)",
    website: "www.reb.gov.rw",
    email: "info@reb.gov.rw",
    phone: "+250 788 381 205",
    address: "Kigali, Rwanda",
    fee: "$50 USD",
    processingTime: "4-6 weeks",
    type: "conversion",
    requirements: [
      "Original WAEC/NECO certificate",
      "Official transcripts",
      "Certified English translations (if applicable)",
      "Application form REB-EC-001",
      "Passport-size photographs (2)",
      "Copy of passport/national ID"
    ],
    process: [
      "Download application form from REB website",
      "Complete form with accurate details",
      "Gather all required documents",
      "Submit application with fee payment",
      "Wait for evaluation (4-6 weeks)",
      "Receive equivalency certificate"
    ]
  },
  ghana: {
    name: "Ghana",
    flag: "🇬🇭",
    authority: "National Accreditation Board (NAB)",
    website: "www.nab.gov.gh",
    email: "info@nab.gov.gh",
    phone: "+233 302 244 735",
    address: "Accra, Ghana",
    fee: "$30 USD",
    processingTime: "2-3 weeks",
    type: "verification",
    requirements: [
      "Original WAEC certificate",
      "WAEC statement of results",
      "Verification request letter",
      "Application form NAB-VER-001",
      "Passport-size photographs (2)",
      "Copy of passport/national ID"
    ],
    process: [
      "Submit verification request to NAB",
      "Provide original WAEC documents",
      "Pay verification fee",
      "NAB confirms document authenticity",
      "Receive verification certificate",
      "Documents returned with verification"
    ]
  },
  "south-africa": {
    name: "South Africa",
    flag: "🇿🇦",
    authority: "South African Qualifications Authority (SAQA)",
    website: "www.saqa.org.za",
    email: "info@saqa.org.za",
    phone: "+27 12 431 5070",
    address: "Pretoria, South Africa",
    fee: "$200 USD",
    processingTime: "8-12 weeks",
    type: "evaluation",
    requirements: [
      "Original WAEC/NECO certificate",
      "Official academic transcripts",
      "Certified English translations",
      "Application form SAQA-EVAL-001",
      "Curriculum/syllabus information",
      "Passport-size photographs (2)",
      "Copy of passport",
      "Proof of payment"
    ],
    process: [
      "Register on SAQA online portal",
      "Complete online application",
      "Upload all required documents",
      "Pay evaluation fee online",
      "Submit physical documents by post",
      "Track application progress online",
      "Receive evaluation certificate"
    ]
  }
};

const countryNames = {
  rwanda: "Rwanda",
  ghana: "Ghana",
  "south-africa": "South Africa"
};

export function GradeResults({ country, qualification, year, subjects, onBack, onStartOver }: GradeResultsProps) {
  const validSubjects = subjects.filter(s => s.name && s.grade);
  const conversions = gradeConversions[country];
  const info = countryData[country];

  const convertedSubjects = validSubjects.map(subject => ({
    ...subject,
    converted: conversions[subject.grade as keyof typeof conversions]
  }));

  const eligibleSubjects = convertedSubjects.filter(s => s.converted.eligible);
  const eligibleForUniversity = eligibleSubjects.length >= 5 &&
    eligibleSubjects.some(s => s.name === "English Language" && s.converted.eligible) &&
    eligibleSubjects.some(s => s.name === "Mathematics" && s.converted.eligible);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Edit Grades
        </Button>
        <div className="text-center">
          <h2 className="text-2xl font-bold">Step 3: Your Grade Equivalency</h2>
          <p className="text-muted-foreground">
            Results for <span className="font-medium">{countryNames[country]}</span>
          </p>
        </div>
        <Button variant="outline" onClick={onStartOver}>
          Start Over
        </Button>
      </div>

      {/* Summary Card */}
      <Card className={eligibleForUniversity ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"}>
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-full ${eligibleForUniversity ? 'bg-green-100' : 'bg-amber-100'}`}>
              {eligibleForUniversity ?
                <CheckCircle className="h-6 w-6 text-green-600" /> :
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              }
            </div>
            <div className="flex-1">
              <h3 className={`text-lg font-semibold mb-2 ${eligibleForUniversity ? 'text-green-800' : 'text-amber-800'}`}>
                {eligibleForUniversity ?
                  `✅ Eligible for University Admission in ${countryNames[country]}` :
                  `⚠️ Additional Requirements Needed for ${countryNames[country]}`
                }
              </h3>
              <p className={`text-sm ${eligibleForUniversity ? 'text-green-700' : 'text-amber-700'}`}>
                {eligibleForUniversity ?
                  `You have ${eligibleSubjects.length} qualifying subjects including English and Mathematics. You can proceed with university applications.` :
                  `You have ${eligibleSubjects.length} qualifying subjects. You may need additional qualifications or consider alternative pathways.`
                }
              </p>
              <div className="flex gap-2 mt-3">
                <Badge variant={eligibleForUniversity ? "default" : "secondary"}>
                  {eligibleSubjects.length} Qualifying Subjects
                </Badge>
                <Badge variant="outline">
                  {qualification} {year}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grade Conversion Table */}
      <Card>
        <CardHeader>
          <CardTitle>Grade Conversions</CardTitle>
          <CardDescription>
            Your Nigerian {qualification} grades converted to {countryNames[country]}'s system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Subject</th>
                  <th className="text-left p-3">Nigerian Grade</th>
                  <th className="text-left p-3">{countryNames[country]} Equivalent</th>
                  <th className="text-left p-3">Description</th>
                  <th className="text-left p-3">University Eligible</th>
                </tr>
              </thead>
              <tbody>
                {convertedSubjects.map((subject, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">
                      <div className="font-medium">{subject.name}</div>
                      {subject.required && (
                        <Badge variant="secondary" className="text-xs mt-1">Required</Badge>
                      )}
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">{subject.grade}</Badge>
                    </td>
                    <td className="p-3">
                      <Badge variant={subject.converted.eligible ? "default" : "destructive"}>
                        {subject.converted.grade}
                      </Badge>
                      {country === "rwanda" && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {subject.converted.points} points
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-sm text-muted-foreground">
                      {subject.converted.description}
                    </td>
                    <td className="p-3">
                      {subject.converted.eligible ? (
                        <span className="text-green-600 font-medium">✅ Yes</span>
                      ) : (
                        <span className="text-red-600 font-medium">❌ No</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Application Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Application Guidelines for {countryNames[country]}
          </CardTitle>
          <CardDescription>
            Step-by-step process to obtain official equivalency certificate
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Authority Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold">Education Authority</h4>
              <div className="space-y-2 text-sm">
                <p><strong>{info.authority}</strong></p>
                <p>{info.address}</p>
                <p>📧 {info.email}</p>
                <p>📞 {info.phone}</p>
                <p>🌐 {info.website}</p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Processing Details</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm"><strong>Fee:</strong> {info.fee}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm"><strong>Processing Time:</strong> {info.processingTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm"><strong>Process Type:</strong> {info.type}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Required Documents */}
          <div>
            <h4 className="font-semibold mb-3">Required Documents</h4>
            <div className="grid md:grid-cols-2 gap-2">
              {info.requirements.map((req, index) => (
                <div key={index} className="flex items-start space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Application Process */}
          <div>
            <h4 className="font-semibold mb-3">Application Process</h4>
            <div className="space-y-3">
              {info.process.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">{index + 1}</span>
                  </div>
                  <span className="text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Important Notes */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> This calculator provides preliminary conversions. Official equivalency certificates
              must be obtained from {info.authority} for university applications. Processing times may vary based on
              application volume and document completeness.
            </AlertDescription>
          </Alert>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4">
            <Button className="flex-1 min-w-[200px]">
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit {info.authority} Website
            </Button>
            <Button variant="outline" className="flex-1 min-w-[200px]">
              <Download className="h-4 w-4 mr-2" />
              Download Results as PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <h4 className="font-semibold text-blue-800 mb-3">Recommended Next Steps</h4>
          <div className="space-y-2 text-sm text-blue-700">
            <div className="flex items-start space-x-2">
              <span className="font-bold">1.</span>
              <span>Apply for official equivalency certificate from {info.authority}</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-bold">2.</span>
              <span>Research universities and programs in {countryNames[country]}</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-bold">3.</span>
              <span>Prepare additional application documents (personal statement, etc.)</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-bold">4.</span>
              <span>Apply for student visa and accommodation</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
