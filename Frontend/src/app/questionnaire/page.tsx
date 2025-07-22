import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, CheckCircle, ClipboardList, Search, School } from "lucide-react";

export default function QuestionnairePage() {
  return (
    <MainLayout>
      <div className="container py-12 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect University Match</h1>
          <p className="text-xl text-muted-foreground">
            Complete our questionnaire to get personalized university recommendations
            based on your academic background, preferences, and goals.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">How It Works</CardTitle>
            <CardDescription>
              Our AI-powered matching system analyzes your profile to find universities that best meet your needs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <ClipboardList className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-1">1. Complete Questionnaire</h3>
                <p className="text-muted-foreground text-sm">
                  Answer questions about your qualifications, preferences, and educational goals.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-1">2. Get Matched</h3>
                <p className="text-muted-foreground text-sm">
                  Our system analyzes your responses to find the best university matches for you.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <School className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-1">3. Compare Options</h3>
                <p className="text-muted-foreground text-sm">
                  Review detailed comparisons of your top university matches.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">What You'll Need</CardTitle>
            <CardDescription>
              Have the following information ready to get the most accurate recommendations:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Your academic qualifications (WAEC/NECO results, other certificates)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Field(s) of study you're interested in</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Budget range for tuition and living expenses</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Preferred countries or regions in Africa</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Language preferences and proficiency levels</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Ready to Start?</CardTitle>
            <CardDescription>
              The questionnaire takes about 5-10 minutes to complete. You can save your progress and return later.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center sm:justify-end">
            <Link href="/questionnaire/flow">
              <Button size="lg" className="w-full sm:w-auto">
                Start Questionnaire
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}
