"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Complete the Questionnaire",
      description:
        "Share your academic background, interests, budget, and location preferences through our detailed questionnaire.",
      image: "/images/questionnaire.svg",
    },
    {
      number: "02",
      title: "Get Personalized Matches",
      description:
        "Our AI-powered matching system analyzes your profile and provides personalized university recommendations.",
      image: "/images/matches.svg",
    },
    {
      number: "03",
      title: "Compare Universities",
      description:
        "Compare your top matches side-by-side based on key factors like tuition, programs, and student community.",
      image: "/images/compare.svg",
    },
    {
      number: "04",
      title: "Access Support Services",
      description:
        "Get guidance from education consultants, find scholarships, and receive application assistance.",
      image: "/images/support.svg",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            How EduConnect Africa Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our streamlined process helps you find and apply to the perfect university in just a few steps.
          </p>
        </div>

        <div className="grid gap-10 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative flex flex-col items-center text-center"
            >
              {/* Arrow connector (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[calc(100%-10px)] w-[calc(100%-60px)] h-0.5 bg-muted-foreground/20">
                  <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                </div>
              )}

              {/* Step number */}
              <div className="bg-primary/10 text-primary font-bold text-xl w-12 h-12 rounded-full flex items-center justify-center mb-6">
                {step.number}
              </div>

              {/* Image placeholder */}
              <div className="relative w-32 h-32 mb-6">
                <div className="absolute inset-0 rounded-full bg-muted flex items-center justify-center">
                  {/* Replace with actual images */}
                  <div className="text-muted-foreground">
                    {step.image ? (
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="p-4 object-contain"
                      />
                    ) : (
                      <svg
                        className="w-16 h-16"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <rect width="20" height="20" x="2" y="2" rx="5" />
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                        <path d="M17.5 6.5L19.5 4.5" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/questionnaire">
            <Button size="lg">
              Start Finding Universities
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
