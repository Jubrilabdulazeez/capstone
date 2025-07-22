import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sampleUniversities } from "@/lib/data/universities";
import {
  MapPin,
  Globe,
  Calendar,
  Users,
  DollarSign,
  GraduationCap,
  Award,
  ExternalLink,
  Mail,
  Phone,
  BookOpen
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return sampleUniversities.map((university) => ({
    id: university.id,
  }));
}

export default async function UniversityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const university = sampleUniversities.find(u => u.id === id);

  if (!university) {
    notFound();
  }

  const rankingColors = {
    'A+': 'bg-[#21aa47] text-white',
    'A': 'bg-[#2a8d42] text-white',
    'B+': 'bg-[#fdc500] text-black',
    'B': 'bg-[#fddf6d] text-black',
    'C+': 'bg-[#fa9949] text-white',
    'C': 'bg-[#ef4423] text-white',
    'Not Ranked': 'bg-gray-400 text-white',
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <MainLayout>
      <div className="container py-8 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* University Logo */}
            <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
              {university.logo ? (
                <Image
                  src={university.logo}
                  alt={`${university.name} logo`}
                  className="object-contain p-4"
                  fill
                  sizes="128px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <GraduationCap className="h-16 w-16 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* University Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{university.name}</h1>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{university.city}, {university.country}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge
                      className={`${rankingColors[university.ranking]} border-none font-semibold`}
                    >
                      Ranking: {university.ranking}
                    </Badge>
                    <Badge variant="outline">{university.type} University</Badge>
                    <Badge variant="outline">Founded {university.foundedYear}</Badge>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">
                {university.description}
              </p>

              <div className="flex gap-3">
                <Link href={university.website} target="_blank">
                  <Button>
                    <Globe className="h-4 w-4 mr-2" />
                    Visit Website
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{university.studentsCount.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Students</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{university.nigerianStudentsCount.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Nigerian Students</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{formatCurrency(university.averageTuition)}</div>
              <div className="text-sm text-muted-foreground">Average Tuition</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <GraduationCap className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{Math.round(university.acceptanceRate * 100)}%</div>
              <div className="text-sm text-muted-foreground">Acceptance Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="programs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="admissions">Admissions</TabsTrigger>
            <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
            <TabsTrigger value="facilities">Facilities</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="programs">
            <Card>
              <CardHeader>
                <CardTitle>Available Programs</CardTitle>
                <CardDescription>
                  Explore the academic programs offered at {university.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {university.programs.map((program) => (
                    <Card key={program.id} className="border border-border/60">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{program.name}</h3>
                          <Badge variant="outline">{program.degreeType}</Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Duration:</span>
                            <span>{program.durationYears} years</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Annual Tuition:</span>
                            <span className="font-medium">{formatCurrency(program.annualTuition)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Language:</span>
                            <span>{program.language}</span>
                          </div>
                          {program.hasScholarship && (
                            <div className="flex items-center">
                              <Award className="h-4 w-4 text-primary mr-1" />
                              <span className="text-primary text-sm">Scholarships Available</span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-3">
                          {program.description}
                        </p>
                        <div className="mt-3 p-3 bg-muted/40 rounded-md">
                          <p className="text-sm">
                            <strong>Entry Requirements:</strong> {program.entryRequirements}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admissions">
            <Card>
              <CardHeader>
                <CardTitle>Admission Requirements</CardTitle>
                <CardDescription>
                  Information about admission requirements and deadlines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">General Requirements</h3>
                  <p className="text-muted-foreground">{university.admissionRequirements.general}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">International Student Requirements</h3>
                  <p className="text-muted-foreground">{university.admissionRequirements.international}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Nigerian Student Requirements</h3>
                  <p className="text-muted-foreground">{university.admissionRequirements.nigerian}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Application Deadlines</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-primary mr-2" />
                      <span><strong>Fall Semester:</strong> {university.admissionDeadlines.fall}</span>
                    </div>
                    {university.admissionDeadlines.spring && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-primary mr-2" />
                        <span><strong>Spring Semester:</strong> {university.admissionDeadlines.spring}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Tuition Range</h3>
                  <div className="p-4 bg-muted/40 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <span>Minimum:</span>
                      <span className="font-semibold">{formatCurrency(university.tuitionRange.min)}/year</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Maximum:</span>
                      <span className="font-semibold">{formatCurrency(university.tuitionRange.max)}/year</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scholarships">
            <Card>
              <CardHeader>
                <CardTitle>Available Scholarships</CardTitle>
                <CardDescription>
                  Scholarship opportunities at {university.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {university.scholarships.map((scholarship) => (
                    <Card key={scholarship.id} className="border border-border/60">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{scholarship.name}</h3>
                          <Badge variant={scholarship.coverage === 'Full' ? 'default' : 'secondary'}>
                            {scholarship.coverage} Coverage
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {scholarship.description}
                        </p>
                        <div className="space-y-2 text-sm">
                          <div>
                            <strong>Coverage Details:</strong> {scholarship.coverageDetails}
                          </div>
                          <div>
                            <strong>Eligibility:</strong> {scholarship.eligibilityCriteria}
                          </div>
                          <div>
                            <strong>Application Deadline:</strong> {scholarship.applicationDeadline}
                          </div>
                        </div>
                        <div className="mt-3">
                          <Link href={scholarship.link} target="_blank">
                            <Button variant="outline" size="sm">
                              Learn More
                              <ExternalLink className="h-4 w-4 ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="facilities">
            <Card>
              <CardHeader>
                <CardTitle>Facilities & Services</CardTitle>
                <CardDescription>
                  Campus facilities and student services available
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Campus Facilities</h3>
                    <div className="grid gap-2 md:grid-cols-2">
                      {university.facilitiesAndServices.map((facility, index) => (
                        <div key={facility} className="flex items-center">
                          <div className="h-2 w-2 bg-primary rounded-full mr-3" />
                          <span>{facility}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">University Strengths</h3>
                    <div className="grid gap-2 md:grid-cols-2">
                      {university.strengths.map((strength, index) => (
                        <div key={strength} className="flex items-center">
                          <Award className="h-4 w-4 text-primary mr-2" />
                          <span>{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {university.accommodationAvailable && (
                    <div>
                      <h3 className="font-semibold mb-3">Accommodation</h3>
                      <div className="p-4 bg-muted/40 rounded-md">
                        <p className="mb-2">On-campus accommodation is available.</p>
                        {university.accommodationCost && (
                          <div className="text-sm">
                            <strong>Cost Range:</strong> {formatCurrency(university.accommodationCost.min)} - {formatCurrency(university.accommodationCost.max)} per year
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Get in touch with {university.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium">Email</div>
                        <div className="text-muted-foreground">{university.contactInfo.email}</div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium">Phone</div>
                        <div className="text-muted-foreground">{university.contactInfo.phone}</div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium">Address</div>
                        <div className="text-muted-foreground">{university.contactInfo.address}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Globe className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium">Website</div>
                        <Link
                          href={university.website}
                          target="_blank"
                          className="text-primary hover:underline"
                        >
                          {university.website}
                        </Link>
                      </div>
                    </div>

                    {university.virtualTour && (
                      <div className="flex items-start">
                        <GraduationCap className="h-5 w-5 text-primary mr-3 mt-0.5" />
                        <div>
                          <div className="font-medium">Virtual Tour</div>
                          <Link
                            href={university.virtualTour}
                            target="_blank"
                            className="text-primary hover:underline"
                          >
                            Take a virtual campus tour
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-3">Accreditation</h3>
                  <div className="flex flex-wrap gap-2">
                    {university.accreditation.map((accred, index) => (
                      <Badge key={accred} variant="outline">{accred}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
