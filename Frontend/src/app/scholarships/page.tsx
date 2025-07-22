import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Calendar, Globe, GraduationCap, Search, Users } from "lucide-react";
import Link from "next/link";

export default function ScholarshipsPage() {
  // Sample scholarship data
  const scholarships = [
    {
      id: "sch-001",
      name: "MasterCard Foundation Scholars Program",
      countries: ["Ghana", "South Africa", "Rwanda", "Kenya"],
      eligibility: "Academically talented young people from economically disadvantaged communities",
      coverage: "Full",
      coverageDetails: "Tuition, accommodation, travel, and stipend",
      deadline: "February 15, 2026",
      fields: ["All Fields"],
      type: "Merit-based",
      recipients: 250,
    },
    {
      id: "sch-002",
      name: "Egypt-Nigeria Bilateral Education Scholarship",
      countries: ["Egypt"],
      eligibility: "Nigerian citizens with strong academic record, minimum of 5 credits in WAEC/NECO",
      coverage: "Partial",
      coverageDetails: "Tuition and monthly stipend",
      deadline: "December 10, 2025",
      fields: ["Engineering", "Medicine", "Agriculture", "Science"],
      type: "Government",
      recipients: 100,
    },
    {
      id: "sch-003",
      name: "University of Cape Town International Scholarship",
      countries: ["South Africa"],
      eligibility: "International students with exceptional academic achievements",
      coverage: "Partial",
      coverageDetails: "50-75% of tuition fees",
      deadline: "October 31, 2025",
      fields: ["All Fields"],
      type: "Merit-based",
      recipients: 50,
    },
    {
      id: "sch-004",
      name: "Pan-African Leadership Scholarship",
      countries: ["Multiple African Countries"],
      eligibility: "Students demonstrating leadership potential and community involvement",
      coverage: "Partial",
      coverageDetails: "Tuition reduction of 30-60%",
      deadline: "March 31, 2026",
      fields: ["Business", "Public Policy", "International Relations"],
      type: "Leadership",
      recipients: 75,
    },
    {
      id: "sch-005",
      name: "STEM Excellence Grant for Women",
      countries: ["Rwanda", "Kenya", "Ghana"],
      eligibility: "Female students pursuing STEM degrees with strong academic background",
      coverage: "Partial",
      coverageDetails: "Tuition support and mentorship program",
      deadline: "January 15, 2026",
      fields: ["Engineering", "Technology", "Mathematics", "Science"],
      type: "Women in STEM",
      recipients: 40,
    },
  ];

  return (
    <MainLayout>
      <div className="container py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Scholarship Information Center
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover scholarships available at African universities for Nigerian students
            </p>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-4">
            <Card className="md:col-span-3">
              <CardHeader className="pb-3">
                <CardTitle>Find Scholarships</CardTitle>
                <CardDescription>
                  Search for scholarships based on your qualifications and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by keyword, country, or field of study"
                      className="pl-9"
                    />
                  </div>
                  <Button>Search</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>My Profile</CardTitle>
                <CardDescription>
                  Get personalized matches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  Sign In to Match
                </Button>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-8 w-full">
              <TabsTrigger value="all">All Scholarships</TabsTrigger>
              <TabsTrigger value="full">Full Scholarships</TabsTrigger>
              <TabsTrigger value="partial">Partial Scholarships</TabsTrigger>
              <TabsTrigger value="women">Women in STEM</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {scholarships.map((scholarship) => (
                <Card key={scholarship.id} className="overflow-hidden">
                  <div className="border-l-8 border-primary h-full flex flex-col md:flex-row">
                    <div className="p-6 flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h3 className="font-bold text-lg">{scholarship.name}</h3>
                        <Badge
                          variant={scholarship.coverage === "Full" ? "default" : "secondary"}
                          className="mt-2 md:mt-0 w-fit"
                        >
                          {scholarship.coverage} Scholarship
                        </Badge>
                      </div>
                      <div className="grid gap-4 mb-4 md:grid-cols-2">
                        <div className="flex items-start">
                          <Globe className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Countries</p>
                            <p className="text-sm text-muted-foreground">
                              {scholarship.countries.join(", ")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <GraduationCap className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Fields of Study</p>
                            <p className="text-sm text-muted-foreground">
                              {scholarship.fields.join(", ")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Calendar className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Application Deadline</p>
                            <p className="text-sm text-muted-foreground">{scholarship.deadline}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Users className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Annual Recipients</p>
                            <p className="text-sm text-muted-foreground">
                              Approximately {scholarship.recipients} students
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-muted/40 p-4 rounded-md mb-4">
                        <p className="text-sm font-medium mb-1">Eligibility Criteria</p>
                        <p className="text-sm text-muted-foreground">{scholarship.eligibility}</p>
                      </div>
                      <div className="flex justify-end">
                        <Link href={`/scholarships/${scholarship.id}`}>
                          <Button variant="outline" className="mr-2">Learn More</Button>
                        </Link>
                        <Button>Apply Now</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="full" className="space-y-6">
              {scholarships
                .filter((s) => s.coverage === "Full")
                .map((scholarship) => (
                  <Card key={scholarship.id} className="overflow-hidden">
                    <div className="border-l-8 border-primary h-full flex flex-col md:flex-row">
                      <div className="p-6 flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <h3 className="font-bold text-lg">{scholarship.name}</h3>
                          <Badge variant="default" className="mt-2 md:mt-0 w-fit">
                            {scholarship.coverage} Scholarship
                          </Badge>
                        </div>
                        <div className="grid gap-4 mb-4 md:grid-cols-2">
                          <div className="flex items-start">
                            <Globe className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Countries</p>
                              <p className="text-sm text-muted-foreground">
                                {scholarship.countries.join(", ")}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <GraduationCap className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Fields of Study</p>
                              <p className="text-sm text-muted-foreground">
                                {scholarship.fields.join(", ")}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Calendar className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Application Deadline</p>
                              <p className="text-sm text-muted-foreground">{scholarship.deadline}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Users className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Annual Recipients</p>
                              <p className="text-sm text-muted-foreground">
                                Approximately {scholarship.recipients} students
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-muted/40 p-4 rounded-md mb-4">
                          <p className="text-sm font-medium mb-1">Eligibility Criteria</p>
                          <p className="text-sm text-muted-foreground">{scholarship.eligibility}</p>
                        </div>
                        <div className="flex justify-end">
                          <Link href={`/scholarships/${scholarship.id}`}>
                            <Button variant="outline" className="mr-2">Learn More</Button>
                          </Link>
                          <Button>Apply Now</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                {scholarships.filter((s) => s.coverage === "Full").length === 0 && (
                  <div className="text-center py-8">
                    <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Scholarships Found</h3>
                    <p className="text-muted-foreground">
                      No full scholarships match your current filter criteria.
                    </p>
                  </div>
                )}
            </TabsContent>

            <TabsContent value="partial" className="space-y-6">
              {scholarships
                .filter((s) => s.coverage === "Partial")
                .map((scholarship) => (
                  <Card key={scholarship.id} className="overflow-hidden">
                    <div className="border-l-8 border-primary h-full flex flex-col md:flex-row">
                      <div className="p-6 flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <h3 className="font-bold text-lg">{scholarship.name}</h3>
                          <Badge variant="secondary" className="mt-2 md:mt-0 w-fit">
                            {scholarship.coverage} Scholarship
                          </Badge>
                        </div>
                        <div className="grid gap-4 mb-4 md:grid-cols-2">
                          <div className="flex items-start">
                            <Globe className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Countries</p>
                              <p className="text-sm text-muted-foreground">
                                {scholarship.countries.join(", ")}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <GraduationCap className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Fields of Study</p>
                              <p className="text-sm text-muted-foreground">
                                {scholarship.fields.join(", ")}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Calendar className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Application Deadline</p>
                              <p className="text-sm text-muted-foreground">{scholarship.deadline}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Users className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Annual Recipients</p>
                              <p className="text-sm text-muted-foreground">
                                Approximately {scholarship.recipients} students
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-muted/40 p-4 rounded-md mb-4">
                          <p className="text-sm font-medium mb-1">Eligibility Criteria</p>
                          <p className="text-sm text-muted-foreground">{scholarship.eligibility}</p>
                        </div>
                        <div className="flex justify-end">
                          <Link href={`/scholarships/${scholarship.id}`}>
                            <Button variant="outline" className="mr-2">Learn More</Button>
                          </Link>
                          <Button>Apply Now</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                {scholarships.filter((s) => s.coverage === "Partial").length === 0 && (
                  <div className="text-center py-8">
                    <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Scholarships Found</h3>
                    <p className="text-muted-foreground">
                      No partial scholarships match your current filter criteria.
                    </p>
                  </div>
                )}
            </TabsContent>

            <TabsContent value="women" className="space-y-6">
              {scholarships
                .filter((s) => s.type === "Women in STEM")
                .map((scholarship) => (
                  <Card key={scholarship.id} className="overflow-hidden">
                    <div className="border-l-8 border-primary h-full flex flex-col md:flex-row">
                      <div className="p-6 flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <h3 className="font-bold text-lg">{scholarship.name}</h3>
                          <Badge variant="secondary" className="mt-2 md:mt-0 w-fit">
                            {scholarship.coverage} Scholarship
                          </Badge>
                        </div>
                        <div className="grid gap-4 mb-4 md:grid-cols-2">
                          <div className="flex items-start">
                            <Globe className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Countries</p>
                              <p className="text-sm text-muted-foreground">
                                {scholarship.countries.join(", ")}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <GraduationCap className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Fields of Study</p>
                              <p className="text-sm text-muted-foreground">
                                {scholarship.fields.join(", ")}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Calendar className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Application Deadline</p>
                              <p className="text-sm text-muted-foreground">{scholarship.deadline}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Users className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Annual Recipients</p>
                              <p className="text-sm text-muted-foreground">
                                Approximately {scholarship.recipients} students
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-muted/40 p-4 rounded-md mb-4">
                          <p className="text-sm font-medium mb-1">Eligibility Criteria</p>
                          <p className="text-sm text-muted-foreground">{scholarship.eligibility}</p>
                        </div>
                        <div className="flex justify-end">
                          <Link href={`/scholarships/${scholarship.id}`}>
                            <Button variant="outline" className="mr-2">Learn More</Button>
                          </Link>
                          <Button>Apply Now</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                {scholarships.filter((s) => s.type === "Women in STEM").length === 0 && (
                  <div className="text-center py-8">
                    <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Scholarships Found</h3>
                    <p className="text-muted-foreground">
                      No women in STEM scholarships match your current filter criteria.
                    </p>
                  </div>
                )}
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Scholarship Application Tips</CardTitle>
              <CardDescription>
                Maximize your chances of securing a scholarship with these expert tips
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-primary text-xs font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Start Early</h3>
                    <p className="text-sm text-muted-foreground">
                      Begin your scholarship search and application process at least 6-12 months before your intended start date. Many scholarships have early deadlines.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-primary text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Prepare Strong Documents</h3>
                    <p className="text-sm text-muted-foreground">
                      Invest time in crafting compelling personal statements and essays. Have them reviewed by teachers or mentors for feedback.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-primary text-xs font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Highlight Your Achievements</h3>
                    <p className="text-sm text-muted-foreground">
                      Emphasize academic excellence, leadership experience, community service, and specific skills related to your field of study.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-primary text-xs font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Follow Instructions Carefully</h3>
                    <p className="text-sm text-muted-foreground">
                      Pay close attention to application requirements, deadlines, and format specifications. Missing details can disqualify your application.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-primary text-xs font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Apply for Multiple Scholarships</h3>
                    <p className="text-sm text-muted-foreground">
                      Don't put all your hopes on one opportunity. Apply for multiple scholarships to increase your chances of receiving funding.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Book a Scholarship Consultation
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
