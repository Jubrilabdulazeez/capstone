"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, CheckCircle, Globe, FileText, Users, Clock } from "lucide-react";

export function CalculatorHero() {
  const features = [
    {
      icon: Calculator,
      title: "Accurate Conversions",
      description: "Official grading system conversions aligned with education authorities"
    },
    {
      icon: Globe,
      title: "3 Target Countries",
      description: "Rwanda, Ghana, and South Africa equivalency calculations"
    },
    {
      icon: FileText,
      title: "Application Guidelines",
      description: "Step-by-step guides for official equivalency certificates"
    },
    {
      icon: Clock,
      title: "Processing Times",
      description: "Clear timelines and fee structures for each country"
    }
  ];

  const supportedQualifications = [
    "WAEC (West African Examinations Council)",
    "NECO (National Examinations Council)",
    "Nigerian O-Level Certificates"
  ];

  return (
    <div className="space-y-8 mb-12">
      {/* Main Hero Section */}
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm font-semibold">
            <Calculator className="h-4 w-4 mr-2" />
            Qualification Equivalency Calculator
          </Badge>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Convert Your Nigerian
            <span className="text-primary block">Qualifications</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get official equivalency conversions for your WAEC/NECO grades to study in Rwanda, Ghana,
            and South Africa. Includes comprehensive application guides for official certification.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {supportedQualifications.map((qual, index) => (
            <Badge key={index} variant="outline" className="px-3 py-1">
              <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
              {qual}
            </Badge>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="border border-border/60 hover:border-primary/20 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Process Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-600" />
            How It Works
          </CardTitle>
          <CardDescription>
            Simple 3-step process to get your qualification equivalency
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                1
              </div>
              <h4 className="font-semibold mb-2">Select Target Country</h4>
              <p className="text-sm text-muted-foreground">
                Choose Rwanda, Ghana, or South Africa for your equivalency calculation
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                2
              </div>
              <h4 className="font-semibold mb-2">Input Your Grades</h4>
              <p className="text-sm text-muted-foreground">
                Enter your WAEC/NECO subject grades with our easy-to-use interface
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                3
              </div>
              <h4 className="font-semibold mb-2">Get Results & Guide</h4>
              <p className="text-sm text-muted-foreground">
                Receive converted grades and step-by-step application guidelines
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Notice */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 font-bold text-sm">!</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Important Notice</h4>
              <p className="text-sm text-yellow-700">
                This calculator provides accurate grade conversions based on official standards. However,
                for university applications, you must obtain official equivalency certificates from the
                respective education authorities. Our guides will show you exactly how to do this.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
