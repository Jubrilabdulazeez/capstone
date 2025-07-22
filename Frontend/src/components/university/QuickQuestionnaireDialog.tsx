"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Filter, Search } from "lucide-react";
import Link from "next/link";

interface QuickFilters {
  countries: string[];
  budgetMax: number;
  ranking: string;
}

interface QuickQuestionnaireDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFiltersApply: (filters: QuickFilters | null) => void;
}

const countries = [
  "Ghana", "South Africa", "Kenya", "Rwanda", "Egypt", "Morocco",
  "Tanzania", "Uganda", "Botswana", "Namibia", "Senegal", "Ethiopia"
];

const rankings = ["A+", "A", "B+", "B", "C+"];

export function QuickQuestionnaireDialog({ open, onOpenChange, onFiltersApply }: QuickQuestionnaireDialogProps) {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [budgetMax, setBudgetMax] = useState(10000);
  const [minRanking, setMinRanking] = useState("");

  const handleCountryToggle = (country: string) => {
    setSelectedCountries(prev =>
      prev.includes(country)
        ? prev.filter(c => c !== country)
        : [...prev, country]
    );
  };

  const handleApplyFilters = () => {
    const filters = {
      countries: selectedCountries,
      budgetMax: budgetMax,
      ranking: minRanking,
    };
    onFiltersApply(filters);
    onOpenChange(false);
  };

  const handleReset = () => {
    setSelectedCountries([]);
    setBudgetMax(10000);
    setMinRanking("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Quick University Filter
          </DialogTitle>
          <DialogDescription>
            Apply basic filters to find universities that match your preferences.
            For personalized recommendations, create an account and complete the full questionnaire.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Countries */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Preferred Countries</Label>
            <p className="text-sm text-muted-foreground">Select countries where you'd like to study</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {countries.map((country) => (
                <div key={country} className="flex items-center space-x-2">
                  <Checkbox
                    id={`quick-country-${country}`}
                    checked={selectedCountries.includes(country)}
                    onCheckedChange={() => handleCountryToggle(country)}
                  />
                  <Label htmlFor={`quick-country-${country}`} className="text-sm cursor-pointer">
                    {country}
                  </Label>
                </div>
              ))}
            </div>
            {selectedCountries.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedCountries.map((country) => (
                  <Badge
                    key={country}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => handleCountryToggle(country)}
                  >
                    {country} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Budget */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Maximum Budget (USD per year)</Label>
            <p className="text-sm text-muted-foreground">Set your maximum tuition budget</p>
            <div className="px-4 py-2">
              <Slider
                value={[budgetMax]}
                onValueChange={(values) => setBudgetMax(values[0])}
                max={20000}
                min={1000}
                step={1000}
                className="w-full"
              />
            </div>
            <div className="text-center">
              <span className="text-lg font-semibold text-primary">
                Up to ${budgetMax.toLocaleString()} per year
              </span>
            </div>
          </div>

          {/* Minimum Ranking */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Minimum University Ranking</Label>
            <p className="text-sm text-muted-foreground">Filter by university quality ranking</p>
            <Select value={minRanking} onValueChange={setMinRanking}>
              <SelectTrigger>
                <SelectValue placeholder="Select minimum ranking (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any ranking</SelectItem>
                {rankings.map((rank) => (
                  <SelectItem key={rank} value={rank}>{rank} and above</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Info Box */}
          <Card className="bg-muted/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Search className="h-4 w-4" />
                Want More Personalized Results?
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-3">
                Create an account to get personalized university matches based on your academic background,
                study preferences, and detailed requirements.
              </p>
              <div className="flex gap-2">
                <Link href="/auth/signup">
                  <Button variant="outline" size="sm">
                    Create Account
                  </Button>
                </Link>
                <Link href="/questionnaire">
                  <Button variant="outline" size="sm">
                    Take Full Questionnaire
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handleReset}>
              Reset Filters
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleApplyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
