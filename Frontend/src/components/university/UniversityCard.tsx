"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { UniversityCard as UniversityCardType } from "@/lib/types/university";
import Image from "next/image";
import { GraduationCap, MapPin, Users, DollarSign, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface UniversityCardProps {
  university: UniversityCardType;
  isSaved?: boolean;
  onSave?: (id: string) => void;
  showMatchPercentage?: boolean;
  matchPercentage?: number;
}

export function UniversityCard({
  university,
  isSaved = false,
  onSave,
  showMatchPercentage = false,
  matchPercentage,
}: UniversityCardProps) {
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
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      {showMatchPercentage && matchPercentage && (
        <div className="bg-primary text-primary-foreground py-1 px-4 font-semibold text-right">
          {matchPercentage}% Match
        </div>
      )}
      <div className="relative p-4 flex items-center space-x-4 bg-muted/50">
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
        <div className="space-y-2">
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
