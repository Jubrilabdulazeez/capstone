"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  BarChart3,
  Calculator,
  BookOpen,
  CalendarClock,
  Award,
  Compass,
  FileText,
} from "lucide-react";

export function FeatureHighlights() {
  const features = [
    {
      title: "Personalized University Matching",
      description: "Complete a detailed questionnaire about your preferences and qualifications to receive AI-powered university recommendations tailored to your needs.",
      icon: Search,
    },
    {
      title: "University Comparison",
      description: "Compare universities side-by-side based on tuition costs, acceptance rates, ranking, and Nigerian student community size.",
      icon: BarChart3,
    },
    {
      title: "Qualification Equivalency Calculator",
      description: "Convert your Nigerian qualifications to international standards and see which universities accept your qualification level.",
      icon: Calculator,
    },
    {
      title: "Comprehensive University Database",
      description: "Access detailed information on over 250 accredited African universities including programs, costs, and admission requirements.",
      icon: BookOpen,
    },
    {
      title: "Professional Counseling Services",
      description: "Book one-on-one sessions with education consultants specializing in various countries and academic fields.",
      icon: CalendarClock,
    },
    {
      title: "Scholarship Information Center",
      description: "Discover scholarships available at African universities with personalized matches based on your profile.",
      icon: Award,
    },
    {
      title: "Visa and Travel Guidance",
      description: "Access country-specific visa requirements, application procedures, and pre-departure information.",
      icon: Compass,
    },
    {
      title: "Application Support Tools",
      description: "Track application deadlines, manage documents, and monitor your application status across multiple universities.",
      icon: FileText,
    },
  ];

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything You Need to Study in Africa
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            EduConnect Africa provides comprehensive tools and resources to help Nigerian students find and apply to universities across Africa.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={feature.title} className="border-border/60 transition-all duration-200 hover:shadow-md hover:border-border">
              <CardHeader className="pb-2">
                <feature.icon className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-sm">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
