"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CallToAction() {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
          Ready to Find Your Perfect University Match?
        </h2>
        <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-10">
          Take the first step toward your international education journey within Africa.
          Complete our questionnaire and discover universities that match your academic goals,
          budget, and preferences.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/questionnaire">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              Start Questionnaire
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white/10"
            >
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
