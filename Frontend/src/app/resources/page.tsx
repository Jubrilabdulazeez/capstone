import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Book, FileText, Globe, Lightbulb, MessageSquare, Plane } from "lucide-react";
import Link from "next/link";

export default function ResourcesPage() {
  // Sample country guides
  const countryGuides = [
    {
      id: "guide-001",
      title: "Study in Ghana: Complete Guide",
      description: "Everything Nigerian students need to know about studying in Ghana, from application requirements to student life and cultural tips.",
      icon: Globe,
      color: "bg-blue-50 text-blue-600",
    },
    {
      id: "guide-002",
      title: "South Africa Student Guide",
      description: "Comprehensive information on South African universities, visa requirements, living costs, and integration into South African student life.",
      icon: Globe,
      color: "bg-green-50 text-green-600",
    },
    {
      id: "guide-003",
      title: "Studying in Kenya",
      description: "Learn about Kenya's education system, top universities, accommodation options, and tips for Nigerian students adapting to Kenyan culture.",
      icon: Globe,
      color: "bg-red-50 text-red-600",
    },
    {
      id: "guide-004",
      title: "Egypt Education Guide",
      description: "Detailed information on Egyptian universities, application processes, Arabic language resources, and navigating student life in Egypt.",
      icon: Globe,
      color: "bg-yellow-50 text-yellow-600",
    },
  ];

  // Sample application tips
  const applicationTips = [
    {
      id: "tip-001",
      title: "Creating a Standout Application Essay",
      description: "Expert tips on crafting compelling personal statements and essays that highlight your unique qualities and academic goals.",
      icon: FileText,
      color: "bg-purple-50 text-purple-600",
    },
    {
      id: "tip-002",
      title: "Document Preparation Checklist",
      description: "Comprehensive list of documents needed for international university applications, with tips on proper preparation and authentication.",
      icon: FileText,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      id: "tip-003",
      title: "Acing Your Admission Interview",
      description: "Strategies and practice questions to help you prepare for university admission interviews, including virtual interview tips.",
      icon: MessageSquare,
      color: "bg-pink-50 text-pink-600",
    },
    {
      id: "tip-004",
      title: "Securing Strong Recommendation Letters",
      description: "How to approach teachers and mentors for powerful recommendation letters that enhance your application profile.",
      icon: FileText,
      color: "bg-teal-50 text-teal-600",
    },
  ];

  // Sample visa and travel guides
  const visaGuides = [
    {
      id: "visa-001",
      title: "Student Visa Guide: Ghana",
      description: "Step-by-step process for obtaining a Ghanaian student visa, including document requirements, fees, and common pitfalls to avoid.",
      icon: Plane,
      color: "bg-blue-50 text-blue-600",
    },
    {
      id: "visa-002",
      title: "South Africa Student Visa Process",
      description: "Detailed instructions on securing a South African study visa, medical insurance requirements, and visa renewal information.",
      icon: Plane,
      color: "bg-green-50 text-green-600",
    },
    {
      id: "visa-003",
      title: "Pre-Departure Checklist",
      description: "Essential items and tasks to complete before leaving Nigeria for your international study destination.",
      icon: Plane,
      color: "bg-orange-50 text-orange-600",
    },
    {
      id: "visa-004",
      title: "Finding Student Accommodation",
      description: "Guide to securing safe and affordable housing options near African universities, with tips for international students.",
      icon: Book,
      color: "bg-cyan-50 text-cyan-600",
    },
  ];

  // Sample FAQs
  const faqs = [
    {
      question: "How do WAEC/NECO results translate to different African university requirements?",
      answer: "Most African universities accept WAEC/NECO results directly, typically requiring a minimum of 5 credits including English and Mathematics. South African universities may require you to take the NBT (National Benchmark Test) in addition to your WAEC/NECO results. Our qualification equivalency calculator provides specific conversion details for each country."
    },
    {
      question: "Do I need to take additional language tests if English is not the primary language of instruction?",
      answer: "For countries where the primary language of instruction is not English (such as Egypt, Morocco, or Rwanda's French programs), you may need to demonstrate proficiency in that language. However, many universities in these countries offer programs taught entirely in English, where your English proficiency from WAEC would be sufficient."
    },
    {
      question: "How much does it typically cost to study in different African countries?",
      answer: "Tuition fees vary widely across Africa. As a general range: East Africa (Kenya, Rwanda): $1,500-4,000/year; West Africa (Ghana): $2,000-5,000/year; Southern Africa (South Africa): $2,500-7,000/year; North Africa (Egypt): $2,000-15,000/year (wide range between public and private universities). Living expenses typically add $2,000-5,000/year depending on the country and city."
    },
    {
      question: "Are there scholarship opportunities specifically for Nigerian students?",
      answer: "Yes, many African universities offer scholarships specifically for Nigerian students. Additionally, there are bilateral agreements between Nigeria and several African countries that provide scholarship opportunities. Our scholarship database includes options specifically available to Nigerian nationals."
    },
    {
      question: "What are the visa requirements for Nigerian students in different African countries?",
      answer: "While requirements vary by country, Nigerian students typically need: Letter of acceptance from the university, evidence of financial means to support yourself, valid passport, passport photos, medical reports, and proof of accommodation. Some countries may also require clearance from Nigeria's National Drug Law Enforcement Agency (NDLEA). Processing times range from 2-8 weeks depending on the country."
    },
    {
      question: "How can I transfer my Nigerian university credits to an African university?",
      answer: "Credit transfer policies vary by institution. Generally, you'll need to provide detailed course descriptions, syllabi, and official transcripts from your Nigerian university. The receiving university will evaluate these documents and determine which credits they'll accept. This process is most successful when transferring between universities with similar educational systems."
    },
  ];

  return (
    <MainLayout>
      <div className="container py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Educational Resources
            </h1>
            <p className="text-muted-foreground text-lg">
              Comprehensive guides, tips, and information to help Nigerian students navigate education across Africa
            </p>
          </div>

          <Tabs defaultValue="country" className="mb-8">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-8">
              <TabsTrigger value="country">Country Guides</TabsTrigger>
              <TabsTrigger value="application">Application Tips</TabsTrigger>
              <TabsTrigger value="visa">Visa & Travel</TabsTrigger>
              <TabsTrigger value="faq">FAQs</TabsTrigger>
            </TabsList>

            <TabsContent value="country" className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                {countryGuides.map((guide) => (
                  <Card key={guide.id}>
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-full ${guide.color} flex items-center justify-center mb-2`}>
                        <guide.icon className="h-6 w-6" />
                      </div>
                      <CardTitle>{guide.title}</CardTitle>
                      <CardDescription>{guide.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Link href={`/resources/country-guides/${guide.id}`} className="w-full">
                        <Button variant="outline" className="w-full justify-between">
                          Read Guide <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Why Study in Africa?</CardTitle>
                  <CardDescription>
                    Discover the benefits of pursuing higher education within the continent
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="mr-4 mt-1">
                        <Lightbulb className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Quality Education at Lower Cost</h3>
                        <p className="text-sm text-muted-foreground">
                          Many African universities offer high-quality education at a fraction of the cost of Western institutions, with easier visa processes and cheaper living expenses.
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="mr-4 mt-1">
                        <Lightbulb className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Cultural Proximity and Adaptability</h3>
                        <p className="text-sm text-muted-foreground">
                          Nigerian students often find it easier to adapt to other African cultures, with many shared values, foods, and traditions that make the transition smoother.
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="mr-4 mt-1">
                        <Lightbulb className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Growing Recognition</h3>
                        <p className="text-sm text-muted-foreground">
                          Degrees from top African universities are increasingly recognized worldwide, with many institutions having international accreditation and partnerships.
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="mr-4 mt-1">
                        <Lightbulb className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Regional Networking Opportunities</h3>
                        <p className="text-sm text-muted-foreground">
                          Studying in another African country helps build a continental professional network, valuable for careers in regional organizations, multinational corporations, and cross-border initiatives.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="application" className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                {applicationTips.map((tip) => (
                  <Card key={tip.id}>
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-full ${tip.color} flex items-center justify-center mb-2`}>
                        <tip.icon className="h-6 w-6" />
                      </div>
                      <CardTitle>{tip.title}</CardTitle>
                      <CardDescription>{tip.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Link href={`/resources/application-tips/${tip.id}`} className="w-full">
                        <Button variant="outline" className="w-full justify-between">
                          Read Article <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Application Timeline</CardTitle>
                  <CardDescription>
                    Recommended timeline for applying to African universities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="relative pl-8 pb-6 border-l border-muted">
                      <div className="absolute top-0 left-0 -translate-x-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold text-primary-foreground">1</span>
                      </div>
                      <h3 className="font-medium text-lg mb-1">12-18 Months Before Start Date</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Research universities and programs</li>
                        <li>• Take required standardized tests (if applicable)</li>
                        <li>• Begin scholarship search</li>
                      </ul>
                    </div>

                    <div className="relative pl-8 pb-6 border-l border-muted">
                      <div className="absolute top-0 left-0 -translate-x-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold text-primary-foreground">2</span>
                      </div>
                      <h3 className="font-medium text-lg mb-1">9-12 Months Before</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Prepare application documents</li>
                        <li>• Request recommendation letters</li>
                        <li>• Write personal statements and essays</li>
                        <li>• Apply for scholarships with early deadlines</li>
                      </ul>
                    </div>

                    <div className="relative pl-8 pb-6 border-l border-muted">
                      <div className="absolute top-0 left-0 -translate-x-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold text-primary-foreground">3</span>
                      </div>
                      <h3 className="font-medium text-lg mb-1">6-9 Months Before</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Submit university applications</li>
                        <li>• Apply for remaining scholarships</li>
                        <li>• Prepare for interviews (if required)</li>
                      </ul>
                    </div>

                    <div className="relative pl-8 pb-6 border-l border-muted">
                      <div className="absolute top-0 left-0 -translate-x-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold text-primary-foreground">4</span>
                      </div>
                      <h3 className="font-medium text-lg mb-1">3-6 Months Before</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Receive admission decisions</li>
                        <li>• Apply for student visa</li>
                        <li>• Begin accommodation search</li>
                        <li>• Arrange for financial transfers</li>
                      </ul>
                    </div>

                    <div className="relative pl-8">
                      <div className="absolute top-0 left-0 -translate-x-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold text-primary-foreground">5</span>
                      </div>
                      <h3 className="font-medium text-lg mb-1">1-3 Months Before</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Secure accommodation</li>
                        <li>• Book travel arrangements</li>
                        <li>• Attend pre-departure orientation</li>
                        <li>• Complete medical examinations</li>
                        <li>• Pack and prepare for relocation</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="visa" className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                {visaGuides.map((guide) => (
                  <Card key={guide.id}>
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-full ${guide.color} flex items-center justify-center mb-2`}>
                        <guide.icon className="h-6 w-6" />
                      </div>
                      <CardTitle>{guide.title}</CardTitle>
                      <CardDescription>{guide.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Link href={`/resources/visa-info/${guide.id}`} className="w-full">
                        <Button variant="outline" className="w-full justify-between">
                          Read Guide <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Common Visa Documentation</CardTitle>
                  <CardDescription>
                    Documents typically required for student visa applications across African countries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-primary text-xs font-bold">✓</span>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">University Acceptance Letter</h3>
                        <p className="text-sm text-muted-foreground">
                          Official letter of admission from your accepted university, usually with details about your program and duration of study.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-primary text-xs font-bold">✓</span>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Valid Passport</h3>
                        <p className="text-sm text-muted-foreground">
                          Your passport should be valid for at least six months beyond your intended stay. Include copies of previous visas if applicable.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-primary text-xs font-bold">✓</span>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Financial Documentation</h3>
                        <p className="text-sm text-muted-foreground">
                          Proof of sufficient funds to cover tuition and living expenses, such as bank statements, scholarship letters, or sponsor declarations.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-primary text-xs font-bold">✓</span>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Medical Documents</h3>
                        <p className="text-sm text-muted-foreground">
                          Medical examination certificate and proof of required vaccinations. Some countries require specific disease screenings.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-primary text-xs font-bold">✓</span>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Accommodation Proof</h3>
                        <p className="text-sm text-muted-foreground">
                          Evidence of arranged accommodation, either on-campus housing confirmation or off-campus rental agreement.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-primary text-xs font-bold">✓</span>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Passport Photos</h3>
                        <p className="text-sm text-muted-foreground">
                          Recent passport-sized photographs meeting the specific requirements of the country's embassy or consulate.
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> Requirements can vary significantly between countries. Always check the specific embassy or consulate website for the most current information.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="faq">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Common questions about studying in other African countries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {faqs.map((faq, index) => (
                      <div key={faq.question} className="pb-6 border-b border-border/60 last:border-b-0 last:pb-0">
                        <h3 className="font-medium text-lg mb-2">{faq.question}</h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Have more questions? <Link href="/contact" className="text-primary underline underline-offset-4">Contact our team</Link> or <Link href="/counseling" className="text-primary underline underline-offset-4">book a consultation</Link> with an education expert.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
