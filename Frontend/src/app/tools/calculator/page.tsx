import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, GraduationCap, School } from "lucide-react";

export default function CalculatorPage() {
  return (
    <MainLayout>
      <div className="container py-12 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Qualification Equivalency Calculator
          </h1>
          <p className="text-muted-foreground text-lg">
            Convert your Nigerian qualifications to international standards and see which universities accept them
          </p>
        </div>

        <Tabs defaultValue="waec" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="waec">WAEC/NECO</TabsTrigger>
            <TabsTrigger value="diploma">Nigerian Diploma</TabsTrigger>
            <TabsTrigger value="other">Other Qualifications</TabsTrigger>
          </TabsList>
          <TabsContent value="waec">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  WAEC/NECO to International Standards
                </CardTitle>
                <CardDescription>
                  Enter your WAEC/NECO results to see their equivalents in different African countries
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-8 rounded-md flex flex-col items-center justify-center text-center">
                  <Calculator className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Calculator Coming Soon</h3>
                  <p className="text-muted-foreground mb-4">
                    We're currently building this feature. Check back soon for the full calculator functionality.
                  </p>
                  <Button variant="outline">Get Notified When Live</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="diploma">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <School className="mr-2 h-5 w-5" />
                  Nigerian Diploma to International Standards
                </CardTitle>
                <CardDescription>
                  Enter your Nigerian Diploma details to see their equivalents in different African countries
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-8 rounded-md flex flex-col items-center justify-center text-center">
                  <Calculator className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Calculator Coming Soon</h3>
                  <p className="text-muted-foreground mb-4">
                    We're currently building this feature. Check back soon for the full calculator functionality.
                  </p>
                  <Button variant="outline">Get Notified When Live</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="other">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Other Qualifications
                </CardTitle>
                <CardDescription>
                  Convert IB, A-Levels, and other international qualifications to African university standards
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-8 rounded-md flex flex-col items-center justify-center text-center">
                  <Calculator className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Calculator Coming Soon</h3>
                  <p className="text-muted-foreground mb-4">
                    We're currently building this feature. Check back soon for the full calculator functionality.
                  </p>
                  <Button variant="outline">Get Notified When Live</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>How Our Calculator Works</CardTitle>
            <CardDescription>
              Our calculator uses official conversion standards from education ministries across Africa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                The Qualification Equivalency Calculator helps Nigerian students understand how their qualifications are evaluated by universities in different African countries. Here's how it works:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Official Standards:</strong> We use official conversion standards published by educational authorities in each country.
                </li>
                <li>
                  <strong>University-Specific Requirements:</strong> The calculator shows both the general equivalency and specific requirements for different universities.
                </li>
                <li>
                  <strong>Program Requirements:</strong> See subject-specific requirements for different programs (e.g., Medicine, Engineering).
                </li>
                <li>
                  <strong>University Matches:</strong> Get a list of universities that accept your qualification level.
                </li>
              </ul>
              <div className="bg-primary/5 p-4 rounded-md mt-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> While our calculator provides accurate guidance based on official standards, always check with individual universities for their most up-to-date requirements.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
