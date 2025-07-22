"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, GraduationCap, School, Users, BookOpen, Award } from "lucide-react";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Background with overlay */}
      <div className="absolute inset-0 -z-10 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-32 sm:px-6 lg:flex lg:items-center lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            <span className="block text-primary">EduConnect Africa</span>
            <span className="block">Connecting Nigerian Students with African Universities</span>
          </h1>

          <p className="mt-6 text-xl text-white">
            Discover personalized university recommendations, qualification equivalency information, and education counseling services across Africa.
          </p>

          <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link href="/questionnaire">
              <Button size="lg" className="w-full sm:w-auto">
                Find Your Match
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/universities">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/20">
                Browse Universities
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4">
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <div className="mt-2 text-2xl font-bold text-white">250+</div>
              <div className="text-sm text-white/80 text-center">
                Accredited Universities
              </div>
            </div>
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <School className="h-8 w-8 text-primary" />
              <div className="mt-2 text-2xl font-bold text-white">12</div>
              <div className="text-sm text-white/80 text-center">
                African Countries
              </div>
            </div>
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Users className="h-8 w-8 text-primary" />
              <div className="mt-2 text-2xl font-bold text-white">5,000+</div>
              <div className="text-sm text-white/80 text-center">
                Nigerian Students Placed
              </div>
            </div>
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Award className="h-8 w-8 text-primary" />
              <div className="mt-2 text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-white/80 text-center">
                Scholarships Available
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
