"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { UniversityCard as UniversityCardType } from "@/lib/types/university";
import Image from "next/image";
import { GraduationCap, MapPin, Users, DollarSign, Bookmark, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PersonalizedUniversityCardProps {
  university: UniversityCardType;
  matchPercentage: number;
  strengths: string[];
  isSaved?: boolean;
  onSave?: (id: string) => void;
}

export function PersonalizedUniversityCard({
  university,
  matchPercentage,
  strengths,
  isSaved = false,
  onSave,
}: PersonalizedUniversityCardProps) {
  const {
    id,
    name,
    country,
    city,
    logo,
    ranking,
    acceptanceRate,
    averageTuition,
    nigerianStudentsCount,
  } = university;

  const rankingColors = {
    'A+': 'bg-[#21aa47] text-white',
    'A': 'bg-[#2a8d42] text-white',
    'B+': 'bg-[#fdc500] text-black',
    'B': 'bg-[#fddf6d] text-black',
    'C+': 'bg-[#fa9949] text-white',
    'C': 'bg-[#ef4423] text-white',
    'Not Ranked': 'bg-gray-400 text-white',
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 85) return 'bg-[#21aa47] text-white';
    if (percentage >= 70) return 'bg-[#fdc500] text-black';
    if (percentage >= 55) return 'bg-[#fa9949] text-white';
    return 'bg-gray-400 text-white';
  };

  const formatTuition = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatAcceptanceRate = (rate: number) => {
    return `${(rate * 100).toFixed(0)}%`;
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-2 border-primary/20">
      {/* Match Percentage Header */}
      <div className={`${getMatchColor(matchPercentage)} py-2 px-4 font-bold text-center relative`}>
        <div className="flex items-center justify-center gap-2">
          <Star className="h-4 w-4" />
          <span>{matchPercentage}% Match</span>
        </div>
      </div>

      <div className="relative p-4 flex items-center space-x-4 bg-muted/30">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-border">
          {logo ? (
            <Image
              src={logo}
              alt={`${name} logo`}
              className="object-contain"
              fill
              sizes="80px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <GraduationCap className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg truncate">{name}</h3>
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span>{city}, {country}</span>
          </div>
          <div className="flex items-center mt-1 space-x-2">
            <Badge
              variant="outline"
              className={`${rankingColors[ranking as keyof typeof rankingColors]} border-none font-semibold`}
            >
              {ranking}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {formatAcceptanceRate(acceptanceRate)} Acceptance
            </Badge>
          </div>
        </div>
        {onSave && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 absolute top-3 right-3"
            onClick={() => onSave(id)}
            aria-label={isSaved ? "Remove from saved" : "Save university"}
          >
            <Bookmark
              className={`h-5 w-5 ${isSaved ? "fill-primary text-primary" : "text-muted-foreground"}`}
            />
          </Button>
        )}
      </div>

      <CardContent className="p-4 pt-3">
        <div className="space-y-3">
          {/* Match Strengths */}
          {strengths.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-primary mb-2">Why this is a great match:</h4>
              <div className="space-y-1">
                {strengths.map((strength) => (
                  <div key={strength} className="flex items-center text-sm">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full mr-2" />
                    <span className="text-muted-foreground">{strength}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Basic Info */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="font-medium">{formatTuition(averageTuition)}/year</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="font-medium">{nigerianStudentsCount} Nigerian students</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between">
        <Link href={`/universities/${id}`} passHref>
          <Button variant="default" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
