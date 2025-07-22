"use client";

import { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { UniversityCard } from "@/components/university/UniversityCard";
import { sampleUniversities } from "@/lib/data/universities";
import type { UniversityCard as UniversityCardType, UniversityMatchResult } from "@/lib/types/university";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Lock, Star, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/context/AuthContext";
import type { PreferredCountry } from "@/lib/types/user";
import Link from "next/link";
import { PersonalizedUniversityCard } from "@/components/university/PersonalizedUniversityCard";
import { QuickQuestionnaireDialog } from "@/components/university/QuickQuestionnaireDialog";

interface QuickFilters {
  countries: string[];
  budgetMax: number;
  ranking: string;
}

// Component that uses useSearchParams - wrapped in Suspense
function UniversitiesContent() {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const personalized = searchParams.get("personalized") === "true";

  const [searchTerm, setSearchTerm] = useState("");
  const [quickFilters, setQuickFilters] = useState<QuickFilters>({
    countries: [],
    budgetMax: 20000,
    ranking: "all",
  });
  const [showQuickQuestionnaire, setShowQuickQuestionnaire] = useState(false);

  // Personalized matching algorithm
  const getPersonalizedMatches = useCallback((universities: UniversityCardType[]): UniversityMatchResult[] => {
    if (!user?.studyPreferences) {
      return universities.map(uni => ({
        university: uni,
        matchPercentage: 0,
        strengths: [],
        matchFactors: { academic: 0, financial: 0, location: 0, community: 0 }
      }));
    }

    return universities.map(university => {
      const factors = {
        academic: 0,
        financial: 0,
        location: 0,
        community: 0,
      };

      const strengths: string[] = [];

      // Location match (30% weight)
      if (user.studyPreferences.preferredCountries.includes(university.country as PreferredCountry)) {
        factors.location = 30;
        strengths.push("Perfect location match");
      }

      // Academic match (25% weight)
      if (user.studyPreferences.fieldsOfInterest.length > 0) {
        factors.academic = 25;
        strengths.push("Good academic fit");
      }

      // Financial match (25% weight)
      if (university.averageTuition <= user.studyPreferences.budgetRange.max) {
        factors.financial = 25;
        strengths.push("Within budget");
      }

      // Community match (20% weight) - Based on Nigerian student presence
      if (university.nigerianStudentsCount > 100) {
        factors.community = 20;
        strengths.push("Strong Nigerian student community");
      }

      const matchPercentage = factors.academic + factors.financial + factors.location + factors.community;

      return {
        university,
        matchPercentage,
        strengths,
        matchFactors: factors,
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage);
  }, [user]);

  // Filtering logic
  const filteredUniversities = useMemo(() => {
    let filtered = sampleUniversities;

    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(uni =>
        uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply quick filters
    if (quickFilters.countries.length > 0) {
      filtered = filtered.filter(uni => quickFilters.countries.includes(uni.country));
    }

    if (quickFilters.ranking !== "all") {
      filtered = filtered.filter(uni => uni.ranking === quickFilters.ranking);
    }

    // Budget filter
    filtered = filtered.filter(uni => uni.averageTuition <= quickFilters.budgetMax);

    return filtered;
  }, [searchTerm, quickFilters]);

  const personalizedResults = useMemo(() => {
    if (personalized && user) {
      return getPersonalizedMatches(filteredUniversities);
    }
    return filteredUniversities.map(uni => ({
      university: uni,
      matchPercentage: 0,
      strengths: [],
      matchFactors: { academic: 0, financial: 0, location: 0, community: 0 }
    }));
  }, [filteredUniversities, personalized, user, getPersonalizedMatches]);

  const handleCountryFilter = (country: string) => {
    setQuickFilters(prev => ({
      ...prev,
      countries: prev.countries.includes(country)
        ? prev.countries.filter(c => c !== country)
        : [...prev.countries, country]
    }));
  };

  const clearFilters = () => {
    setQuickFilters({
      countries: [],
      budgetMax: 20000,
      ranking: "all",
    });
    setSearchTerm("");
  };

  const uniqueCountries = [...new Set(sampleUniversities.map(uni => uni.country))];

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Header Section */}
        <div className="mb-8">
          {personalized && user ? (
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                <h1 className="text-3xl font-bold mb-2">
                  Your Personalized University Matches
                </h1>
                <p className="text-muted-foreground mb-4">
                  Based on your preferences, here are the universities that match your profile
                </p>
                <div className="flex justify-center gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Star className="h-3 w-3 mr-1" />
                    {personalizedResults.filter(r => r.matchPercentage >= 70).length} High Matches
                  </Badge>
                  <Badge variant="outline">
                    {personalizedResults.filter(r => r.matchPercentage >= 40 && r.matchPercentage < 70).length} Good Matches
                  </Badge>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Discover Universities</h1>
              <p className="text-muted-foreground">
                Find the perfect university for your academic journey in Africa
              </p>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search universities, countries, or programs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {!personalized && !user && (
              <Button
                onClick={() => setShowQuickQuestionnaire(true)}
                className="bg-gradient-green hover:opacity-90"
              >
                <Star className="h-4 w-4 mr-2" />
                Get Personalized Matches
              </Button>
            )}
          </div>

          {/* Quick Filters */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Quick Filters
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Country filters */}
              <div>
                <h3 className="font-medium mb-2">Countries</h3>
                <div className="flex flex-wrap gap-2">
                  {uniqueCountries.map(country => (
                    <Badge
                      key={country}
                      variant={quickFilters.countries.includes(country) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleCountryFilter(country)}
                    >
                      {country}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Budget slider */}
              <div>
                <h3 className="font-medium mb-2">Maximum Tuition: ${quickFilters.budgetMax.toLocaleString()}</h3>
                <input
                  type="range"
                  min="5000"
                  max="30000"
                  step="1000"
                  value={quickFilters.budgetMax}
                  onChange={(e) => setQuickFilters(prev => ({ ...prev, budgetMax: Number.parseInt(e.target.value) }))}
                  className="w-full"
                />
              </div>

              {/* Ranking filter */}
              <div>
                <h3 className="font-medium mb-2">University Ranking</h3>
                <div className="flex flex-wrap gap-2">
                  {["all", "A+", "A", "B+", "B"].map(rank => (
                    <Badge
                      key={rank}
                      variant={quickFilters.ranking === rank ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setQuickFilters(prev => ({ ...prev, ranking: rank }))}
                    >
                      {rank === "all" ? "All Rankings" : rank}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {personalizedResults.length} {personalizedResults.length === 1 ? 'University' : 'Universities'} Found
            </h2>

            {personalized && user && (
              <Link href="/universities">
                <Button variant="outline">
                  View All Universities
                </Button>
              </Link>
            )}
          </div>

          {personalizedResults.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {personalizedResults.map((result, index) => (
                personalized && user ? (
                  <PersonalizedUniversityCard
                    key={result.university.id}
                    university={result.university}
                    matchPercentage={result.matchPercentage}
                    strengths={result.strengths}
                  />
                ) : (
                  <UniversityCard
                    key={result.university.id}
                    university={result.university}
                  />
                )
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No universities found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Call to Action for non-authenticated users */}
        {!user && (
          <Card className="bg-gradient-green-light border-green-200">
            <CardContent className="text-center py-8">
              <Lock className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Get Personalized Recommendations</h3>
              <p className="text-muted-foreground mb-4">
                Create an account to get AI-powered university matches based on your academic profile, preferences, and goals.
              </p>
              <div className="flex justify-center gap-3">
                <Link href="/auth/signup">
                  <Button className="bg-gradient-green hover:opacity-90">
                    Sign Up Free
                  </Button>
                </Link>
                <Link href="/auth/signin">
                  <Button variant="outline">
                    Sign In
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick Questionnaire Dialog */}
      <QuickQuestionnaireDialog
        open={showQuickQuestionnaire}
        onOpenChange={setShowQuickQuestionnaire}
        onFiltersApply={(filters) => {
          if (filters) {
            setQuickFilters(filters);
          }
          setShowQuickQuestionnaire(false);
        }}
      />
    </MainLayout>
  );
}

// Main component with Suspense boundary
export default function UniversitiesPage() {
  return (
    <Suspense fallback={
      <MainLayout>
        <div className="container py-8">
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        </div>
      </MainLayout>
    }>
      <UniversitiesContent />
    </Suspense>
  );
}
