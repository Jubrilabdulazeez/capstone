"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, X } from "lucide-react";
import type { UniversityRanking, UniversitySearchFilters } from "@/lib/types/university";

const countries = [
  "Ghana",
  "South Africa",
  "Kenya",
  "Rwanda",
  "Egypt",
  "Morocco",
  "Tanzania",
  "Uganda",
  "Botswana",
  "Namibia",
  "Senegal",
  "Ethiopia",
];

const programTypes = [
  "Bachelor",
  "Master",
  "PhD",
  "Diploma",
  "Certificate",
];

const languages = [
  "English",
  "French",
  "Arabic",
  "Portuguese",
  "Swahili",
];

const rankings: UniversityRanking[] = [
  "A+",
  "A",
  "B+",
  "B",
  "C+",
  "C",
  "Not Ranked",
];

interface UniversityFiltersProps {
  onFilterChange: (filters: UniversitySearchFilters) => void;
  initialFilters?: UniversitySearchFilters;
  className?: string;
}

export function UniversityFilters({
  onFilterChange,
  initialFilters,
  className,
}: UniversityFiltersProps) {
  const [filters, setFilters] = useState<UniversitySearchFilters>(
    initialFilters || {
      countries: [],
      programTypes: [],
      tuitionRange: {
        min: 0,
        max: 20000,
      },
      rankings: [],
      languages: [],
      accommodationRequired: false,
    }
  );

  const [expanded, setExpanded] = useState(false);

  const handleCheckboxChange = (
    filterType: keyof UniversitySearchFilters,
    value: string
  ) => {
    setFilters((prev) => {
      const currentArray = prev[filterType] as string[] || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];

      const newFilters = {
        ...prev,
        [filterType]: newArray,
      };

      // Auto-apply filters when changed
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleTuitionChange = (value: number[]) => {
    const newFilters = {
      ...filters,
      tuitionRange: {
        min: value[0],
        max: value[1],
      },
    };
    setFilters(newFilters);
    // Auto-apply tuition changes
    onFilterChange(newFilters);
  };

  const handleAccommodationChange = (checked: boolean) => {
    const newFilters = {
      ...filters,
      accommodationRequired: checked,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const resetFilters = {
      countries: [],
      programTypes: [],
      tuitionRange: {
        min: 0,
        max: 20000,
      },
      rankings: [],
      languages: [],
      accommodationRequired: false,
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const countActiveFilters = () => {
    let count = 0;
    if (filters.countries && filters.countries.length > 0) count++;
    if (filters.programTypes && filters.programTypes.length > 0) count++;
    if (filters.rankings && filters.rankings.length > 0) count++;
    if (filters.languages && filters.languages.length > 0) count++;
    if (filters.accommodationRequired) count++;
    if (
      filters.tuitionRange &&
      (filters.tuitionRange.min !== 0 || filters.tuitionRange.max !== 20000)
    )
      count++;
    return count;
  };

  return (
    <div className={className}>
      <div className="lg:hidden mb-4">
        <Button
          onClick={() => setExpanded(!expanded)}
          variant="outline"
          className="w-full justify-between"
        >
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {countActiveFilters() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {countActiveFilters()}
              </Badge>
            )}
          </div>
        </Button>
      </div>

      <Card className={`${expanded ? 'block' : 'hidden'} lg:block`}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Filter Universities</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="h-8 text-muted-foreground hover:text-foreground"
            >
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tuition Range */}
          <div>
            <Label className="font-medium mb-3 block">Tuition Range (USD)</Label>
            <div className="pt-4 px-2">
              <Slider
                value={[
                  filters.tuitionRange?.min || 0,
                  filters.tuitionRange?.max || 20000,
                ]}
                max={20000}
                step={500}
                onValueChange={handleTuitionChange}
                className="w-full"
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-muted-foreground">
                ${filters.tuitionRange?.min?.toLocaleString() || 0}
              </span>
              <span className="text-sm text-muted-foreground">
                ${filters.tuitionRange?.max?.toLocaleString() || 20000}
              </span>
            </div>
          </div>

          {/* Countries */}
          <div>
            <Label className="font-medium mb-3 block">Countries</Label>
            <div className="grid grid-cols-2 gap-2">
              {countries.map((country) => (
                <div key={country} className="flex items-center space-x-2">
                  <Checkbox
                    id={`country-${country}`}
                    checked={filters.countries?.includes(country) || false}
                    onCheckedChange={() => handleCheckboxChange("countries", country)}
                  />
                  <Label
                    htmlFor={`country-${country}`}
                    className="text-sm font-normal leading-none cursor-pointer"
                  >
                    {country}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Program Types */}
          <div>
            <Label className="font-medium mb-3 block">Program Types</Label>
            <div className="flex flex-wrap gap-2">
              {programTypes.map((type) => (
                <Badge
                  key={type}
                  variant={
                    filters.programTypes?.includes(type) ? "default" : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => handleCheckboxChange("programTypes", type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          {/* University Ranking */}
          <div>
            <Label className="font-medium mb-3 block">University Ranking</Label>
            <div className="flex flex-wrap gap-2">
              {rankings.map((rank) => (
                <Badge
                  key={rank}
                  variant={
                    filters.rankings?.includes(rank) ? "default" : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => handleCheckboxChange("rankings", rank)}
                >
                  {rank}
                </Badge>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <Label className="font-medium mb-3 block">Languages of Instruction</Label>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((language) => (
                <div key={language} className="flex items-center space-x-2">
                  <Checkbox
                    id={`language-${language}`}
                    checked={filters.languages?.includes(language) || false}
                    onCheckedChange={() => handleCheckboxChange("languages", language)}
                  />
                  <Label
                    htmlFor={`language-${language}`}
                    className="text-sm font-normal leading-none cursor-pointer"
                  >
                    {language}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Accommodation */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="accommodation"
              checked={filters.accommodationRequired || false}
              onCheckedChange={(checked) =>
                handleAccommodationChange(checked as boolean)
              }
            />
            <Label
              htmlFor="accommodation"
              className="font-normal cursor-pointer"
            >
              Accommodation Required
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
