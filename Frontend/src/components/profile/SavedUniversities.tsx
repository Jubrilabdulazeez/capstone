"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/context/AuthContext";
import { sampleUniversities } from "@/lib/data/universities";
import { Heart, ExternalLink, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function SavedUniversities() {
  const { user } = useAuth();

  if (!user) return null;

  // Get saved universities from sample data
  const savedUniversities = sampleUniversities.filter(uni =>
    user.savedUniversities.includes(uni.id)
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const rankingColors = {
    'A+': 'bg-[#21aa47] text-white',
    'A': 'bg-[#2a8d42] text-white',
    'B+': 'bg-[#fdc500] text-black',
    'B': 'bg-[#fddf6d] text-black',
    'C+': 'bg-[#fa9949] text-white',
    'C': 'bg-[#ef4423] text-white',
    'Not Ranked': 'bg-gray-400 text-white',
  };

  const handleRemoveFromSaved = (universityId: string) => {
    // In a real app, this would update the user's saved universities
    console.log("Remove from saved:", universityId);
  };

  return (
    <div className="space-y-6">
      {savedUniversities.length > 0 ? (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Saved Universities</h2>
              <p className="text-muted-foreground">
                You have {savedUniversities.length} saved universities
              </p>
            </div>
            <Link href="/universities">
              <Button variant="outline">
                Discover More Universities
              </Button>
            </Link>
          </div>

          <div className="grid gap-6">
            {savedUniversities.map((university) => (
              <Card key={university.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* University Image/Logo */}
                    <div className="md:w-48 h-48 md:h-auto relative bg-muted flex items-center justify-center">
                      {university.logo ? (
                        <Image
                          src={university.logo}
                          alt={`${university.name} logo`}
                          className="object-contain p-4"
                          fill
                          sizes="192px"
                        />
                      ) : (
                        <div className="text-center">
                          <Heart className="h-12 w-12 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground mt-2">
                            {university.name}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* University Details */}
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{university.name}</h3>
                          <p className="text-muted-foreground flex items-center">
                            📍 {university.city}, {university.country}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={`${rankingColors[university.ranking]} border-none font-semibold`}
                          >
                            {university.ranking}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {university.description}
                      </p>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Tuition</p>
                          <p className="font-semibold">{formatCurrency(university.averageTuition)}/year</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Acceptance Rate</p>
                          <p className="font-semibold">{Math.round(university.acceptanceRate * 100)}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Students</p>
                          <p className="font-semibold">{university.studentsCount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Nigerian Students</p>
                          <p className="font-semibold">{university.nigerianStudentsCount}</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Link href={`/universities/${university.id}`}>
                          <Button variant="default">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </Link>
                        <Link href={university.website} target="_blank">
                          <Button variant="outline">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Visit Website
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          onClick={() => handleRemoveFromSaved(university.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Similar Universities</CardTitle>
              <CardDescription>
                Based on your saved universities, you might also like these
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We'll recommend similar universities based on your preferences and saved institutions.
              </p>
              <Link href="/universities?personalized=true">
                <Button variant="outline">
                  View Personalized Recommendations
                </Button>
              </Link>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Saved Universities</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start exploring universities and save your favorites to keep track of institutions you're interested in.
            </p>
            <div className="flex justify-center gap-3">
              <Link href="/universities">
                <Button>
                  Browse Universities
                </Button>
              </Link>
              <Link href="/universities?personalized=true">
                <Button variant="outline">
                  View My Matches
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
