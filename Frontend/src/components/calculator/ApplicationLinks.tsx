"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Flag, FileText, Globe, Info } from "lucide-react";

export function ApplicationLinks() {
  const applicationPortals = [
    {
      country: "Ghana",
      flag: "🇬🇭",
      description: "Apply to universities in Ghana through official portals",
      portals: [
        {
          name: "Ghana Universities Application Portal",
          url: "https://www.ghanauniversitiesportal.com",
          description: "Central application system for public universities",
          type: "Official"
        },
        {
          name: "University of Ghana Application",
          url: "https://www.ug.edu.gh/admissions",
          description: "Direct application to University of Ghana",
          type: "University"
        },
        {
          name: "KNUST Application Portal",
          url: "https://www.knust.edu.gh/admissions",
          description: "Kwame Nkrumah University of Science and Technology",
          type: "University"
        }
      ],
      requirements: [
        "WAEC/NECO certificate with at least 6 credits including English and Math",
        "Completed application form with personal statement",
        "Two passport photographs",
        "Application fee payment"
      ]
    },
    {
      country: "Rwanda",
      flag: "🇷🇼",
      description: "Apply to universities in Rwanda through official channels",
      portals: [
        {
          name: "Rwanda Higher Education Council",
          url: "https://www.hec.gov.rw",
          description: "Official higher education information portal",
          type: "Official"
        },
        {
          name: "University of Rwanda Application",
          url: "https://www.ur.ac.rw/admissions",
          description: "Main public university application portal",
          type: "University"
        },
        {
          name: "Rwanda Education Board",
          url: "https://www.reb.gov.rw",
          description: "National education coordination body",
          type: "Official"
        }
      ],
      requirements: [
        "Secondary school certificate equivalent to A-Level",
        "English proficiency (IELTS 6.0 or equivalent)",
        "Completed online application form",
        "Academic transcripts and certificates",
        "Passport copy and visa documents"
      ]
    },
    {
      country: "South Africa",
      flag: "🇿🇦",
      description: "Apply to universities in South Africa through centralized systems",
      portals: [
        {
          name: "Central Applications Clearing House (CATCH)",
          url: "https://www.catch.org.za",
          description: "Centralized application system for universities",
          type: "Official"
        },
        {
          name: "University of Cape Town Application",
          url: "https://www.uct.ac.za/apply",
          description: "Direct application to UCT",
          type: "University"
        },
        {
          name: "University of the Witwatersrand",
          url: "https://www.wits.ac.za/admissions",
          description: "Wits University application portal",
          type: "University"
        },
        {
          name: "University of Stellenbosch",
          url: "https://www.sun.ac.za/admissions",
          description: "Stellenbosch University applications",
          type: "University"
        }
      ],
      requirements: [
        "National Senior Certificate (NSC) with university exemption",
        "WAEC/NECO with minimum requirements for specific programs",
        "English proficiency test results",
        "Motivation letter and personal statement",
        "Study permit and visa documentation"
      ]
    }
  ];

  const getPortalTypeColor = (type: string) => {
    switch (type) {
      case "Official":
        return "bg-green-100 text-green-800";
      case "University":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Official Application Portals
          </CardTitle>
          <CardDescription>
            Direct links to university application systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {applicationPortals.map((country) => (
              <div key={country.country} className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{country.flag}</span>
                  <h3 className="text-lg font-semibold">{country.country}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{country.description}</p>

                <div className="space-y-3">
                  {country.portals.map((portal, index) => (
                    <div key={`${portal.name}-${portal.type}-${index}`} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-sm">{portal.name}</h4>
                            <Badge className={getPortalTypeColor(portal.type)}>
                              {portal.type}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{portal.description}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(portal.url, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Visit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Application Requirements
          </CardTitle>
          <CardDescription>
            Common requirements by country
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {applicationPortals.map((country) => (
              <div key={country.country} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{country.flag}</span>
                  <h4 className="font-medium">{country.country} Requirements</h4>
                </div>
                <div className="space-y-2">
                  {country.requirements.map((requirement, index) => (
                    <div key={`${requirement.slice(0, 30)}-${index}`} className="flex items-start space-x-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                      <span>{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50/30">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Important Tips</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Always check specific university requirements as they may vary</li>
                <li>• Start your application process early to meet deadlines</li>
                <li>• Ensure all documents are properly certified and translated if needed</li>
                <li>• Consider applying to multiple universities to increase your chances</li>
                <li>• Contact university admissions offices directly for specific queries</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
