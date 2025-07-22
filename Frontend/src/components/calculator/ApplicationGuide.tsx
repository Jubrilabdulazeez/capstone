"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  Phone,
  Globe,
  Calculator,
  ExternalLink,
  AlertCircle,
  Users,
  Mail
} from "lucide-react";

interface ApplicationGuideProps {
  country: string;
  onBackToResults: () => void;
  onNewCalculation: () => void;
}

const countryGuides = {
  rwanda: {
    name: "Rwanda",
    flag: "🇷🇼",
    authority: "Rwanda Education Board (REB)",
    website: "www.reb.gov.rw",
    fee: "$50 USD",
    currency: "50,000 Rwandan Francs",
    processingTime: "4-6 weeks",
    phone: "+250-788-300-000",
    email: "info@reb.gov.rw",
    type: "Conversion",
    steps: [
      {
        title: "Document Preparation",
        description: "Gather all required documents for your application",
        items: [
          "Original WAEC/NECO certificates (must be authenticated)",
          "Certified photocopies of all certificates",
          "Complete academic transcripts from secondary school",
          "Recent passport-size photographs (white background)",
          "Valid passport or national identification copy",
          "Birth certificate (certified copy)"
        ]
      },
      {
        title: "Authentication Process",
        description: "Authenticate your documents before submission",
        items: [
          "Visit the Nigerian Ministry of Education for authentication",
          "Get documents notarized by a public notary",
          "Obtain apostille certification if required",
          "Translate documents to English/French if necessary"
        ]
      },
      {
        title: "Application Submission",
        description: "Submit your complete application to REB",
        items: [
          "Download REB Equivalency Application Form from official website",
          "Complete the form with accurate information",
          "Pay application fee of $50 USD or 50,000 RWF",
          "Submit application in person or through authorized representative",
          "Get receipt confirmation of submission"
        ]
      },
      {
        title: "Follow-up and Collection",
        description: "Track your application and collect results",
        items: [
          "Wait for 4-6 weeks processing time",
          "Check application status online or by phone",
          "Collect equivalency certificate from REB office",
          "Verify all details on the certificate are correct",
          "Request certified copies if needed for multiple universities"
        ]
      }
    ],
    tips: [
      "Apply well in advance of university application deadlines",
      "Keep multiple certified copies of your equivalency certificate",
      "Contact REB directly for any clarification on requirements",
      "Consider applying for university admission while waiting for equivalency"
    ],
    officialLinks: [
      { title: "REB Official Website", url: "https://www.reb.gov.rw" },
      { title: "Rwanda Higher Education Council", url: "https://www.hec.gov.rw" },
      { title: "University of Rwanda", url: "https://www.ur.ac.rw" }
    ]
  },
  ghana: {
    name: "Ghana",
    flag: "🇬🇭",
    authority: "National Accreditation Board (NAB)",
    website: "www.nab.gov.gh",
    fee: "$30 USD",
    currency: "350 Ghana Cedis",
    processingTime: "2-3 weeks",
    phone: "+233-302-244870",
    email: "info@nab.gov.gh",
    type: "Verification",
    steps: [
      {
        title: "Verification Advantage",
        description: "Nigerian WAEC certificates are directly recognized in Ghana",
        items: [
          "No grade conversion required - WAEC grades maintain same values",
          "Simple verification process instead of full equivalency",
          "Faster processing due to shared examination system",
          "Cost-effective compared to other countries"
        ]
      },
      {
        title: "Document Requirements",
        description: "Prepare documents for verification process",
        items: [
          "Original WAEC certificate for inspection",
          "Certified photocopies of certificate",
          "Letter from intended Ghanaian institution",
          "Completed NAB verification application form",
          "Recent passport-size photographs",
          "Valid identification document"
        ]
      },
      {
        title: "Verification Process",
        description: "Submit application to NAB for verification",
        items: [
          "Download verification form from NAB website",
          "Pay verification fee of $30 USD or 350 GHS",
          "Submit application with required documents",
          "NAB verifies authenticity with WAEC directly",
          "Receive verification certificate"
        ]
      },
      {
        title: "University Application",
        description: "Use verified certificate for university admission",
        items: [
          "Submit verification certificate to chosen universities",
          "Apply directly to Ghanaian universities",
          "No additional grade conversion needed",
          "Follow standard university admission procedures"
        ]
      }
    ],
    tips: [
      "Ghana recognizes Nigerian WAEC directly - simplest process",
      "Consider multiple university applications simultaneously",
      "Contact universities directly about admission requirements",
      "Explore scholarship opportunities for Nigerian students"
    ],
    officialLinks: [
      { title: "NAB Official Website", url: "https://www.nab.gov.gh" },
      { title: "University of Ghana", url: "https://www.ug.edu.gh" },
      { title: "Ghana Scholarship Portal", url: "https://www.scholarships.gov.gh" }
    ]
  },
  "south-africa": {
    name: "South Africa",
    flag: "🇿🇦",
    authority: "South African Qualifications Authority (SAQA)",
    website: "www.saqa.org.za",
    fee: "$200 USD",
    currency: "3,500 South African Rand",
    processingTime: "8-12 weeks",
    phone: "+27-12-431-5000",
    email: "internationalservices@saqa.org.za",
    type: "Evaluation",
    steps: [
      {
        title: "Comprehensive Evaluation",
        description: "SAQA conducts complete qualification assessment",
        items: [
          "Detailed analysis of academic credentials",
          "Conversion to National Senior Certificate (NSC) levels",
          "Subject-by-subject evaluation and comparison",
          "University admission readiness assessment",
          "Equivalency determination for South African standards"
        ]
      },
      {
        title: "Document Collection",
        description: "Gather comprehensive documentation package",
        items: [
          "Original academic certificates and transcripts",
          "Detailed curriculum and syllabus information",
          "Official letter from Nigerian education authority",
          "Certified translations (if not in English)",
          "Proof of payment for evaluation fee",
          "Completed SAQA Application Form 4"
        ]
      },
      {
        title: "Application Submission",
        description: "Submit complete application to SAQA",
        items: [
          "Complete SAQA Form 4 (Foreign Qualification Evaluation)",
          "Pay evaluation fee of $200 USD or 3,500 ZAR",
          "Submit all required documents with certified copies",
          "Provide contact information for verification",
          "Wait for acknowledgment of receipt"
        ]
      },
      {
        title: "Evaluation and Results",
        description: "SAQA assessment and certificate issuance",
        items: [
          "SAQA conducts thorough evaluation (8-12 weeks)",
          "Verification with Nigerian education authorities",
          "NSC level determination for each subject",
          "Receive comprehensive evaluation report",
          "Get official SAQA equivalency certificate"
        ]
      }
    ],
    tips: [
      "Start application process early - longest processing time",
      "Ensure all documents are properly certified and translated",
      "Provide detailed curriculum information for accurate evaluation",
      "Keep multiple copies of SAQA certificate for university applications"
    ],
    officialLinks: [
      { title: "SAQA Official Website", url: "https://www.saqa.org.za" },
      { title: "University of Cape Town", url: "https://www.uct.ac.za" },
      { title: "Wits University", url: "https://www.wits.ac.za" },
      { title: "Study South Africa", url: "https://www.studysa.org" }
    ]
  }
};

export function ApplicationGuide({ country, onBackToResults, onNewCalculation }: ApplicationGuideProps) {
  const guide = countryGuides[country as keyof typeof countryGuides];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{guide.flag}</span>
              <div>
                <h2 className="text-2xl font-bold text-blue-800">
                  {guide.name} Application Guide
                </h2>
                <p className="text-blue-600">{guide.authority}</p>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
              {guide.type}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-semibold">{guide.fee}</p>
                <p className="text-sm text-muted-foreground">({guide.currency})</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="font-semibold">{guide.processingTime}</p>
                <p className="text-sm text-muted-foreground">Processing Time</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-semibold">{guide.website}</p>
                <p className="text-sm text-muted-foreground">Official Website</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="steps" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="steps">Step-by-Step</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
          <TabsTrigger value="tips">Tips & Links</TabsTrigger>
        </TabsList>

        <TabsContent value="steps" className="mt-6">
          <div className="space-y-6">
            {guide.steps.map((step, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      {index + 1}
                    </div>
                    {step.title}
                  </CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Required Documents Checklist
              </CardTitle>
              <CardDescription>
                Complete list of documents needed for your {guide.name} application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {guide.steps.map((step, stepIndex) => (
                  <div key={stepIndex}>
                    <h4 className="font-semibold mb-2 text-primary">{step.title}</h4>
                    <div className="grid gap-2">
                      {step.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-2 p-2 bg-muted/30 rounded-md">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Official Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{guide.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{guide.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-purple-600" />
                    <div>
                      <p className="font-medium">Website</p>
                      <p className="text-sm text-muted-foreground">{guide.website}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Office Hours & Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">Business Hours</p>
                  <p className="text-sm text-muted-foreground">Monday - Friday: 8:00 AM - 5:00 PM</p>
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">
                    {country === "rwanda" ? "Kigali, Rwanda - Main Office" :
                     country === "ghana" ? "Accra, Ghana - NAB Headquarters" :
                     "Pretoria, South Africa - SAQA Offices"}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Application Method</p>
                  <p className="text-sm text-muted-foreground">
                    In-person submission or authorized representative
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tips" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-yellow-600" />
                  Important Tips & Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {guide.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Useful Official Links
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {guide.officialLinks.map((link, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/30 transition-colors">
                      <span className="font-medium">{link.title}</span>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={onBackToResults} variant="outline" className="flex-1">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Results
        </Button>
        <Button onClick={onNewCalculation} variant="outline" className="flex-1">
          <Calculator className="h-4 w-4 mr-2" />
          New Calculation
        </Button>
        <Button className="flex-1">
          <FileText className="h-4 w-4 mr-2" />
          Download Complete Guide
        </Button>
      </div>
    </div>
  );
}
