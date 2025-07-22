import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, CheckCircle, FileText, Globe } from "lucide-react";

export function CalculatorIntro() {
  return (
    <div className="space-y-6 mb-8">
      {/* Main Header */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Calculator className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Qualification Equivalency Calculator
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Convert your Nigerian WAEC/NECO grades to official grading systems for Rwanda, Ghana, and South Africa.
          Get accurate conversions and step-by-step guidance for obtaining official equivalency certificates.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
              <Globe className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">3 African Countries</h3>
            <p className="text-sm text-muted-foreground">
              Get conversions for Rwanda, Ghana, and South Africa with their official grading systems
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Official Standards</h3>
            <p className="text-sm text-muted-foreground">
              All conversions follow official education authority guidelines and requirements
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="bg-orange-100 p-3 rounded-full w-fit mx-auto mb-4">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="font-semibold mb-2">Application Guidance</h3>
            <p className="text-sm text-muted-foreground">
              Complete step-by-step instructions for applying for official equivalency certificates
            </p>
          </CardContent>
        </Card>
      </div>

      {/* How it Works */}
      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
          <CardDescription>
            Simple 4-step process to get your grade equivalencies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3">
                <span className="text-sm font-bold text-primary">1</span>
              </div>
              <h4 className="font-medium mb-2">Select Country</h4>
              <p className="text-sm text-muted-foreground">
                Choose your target study destination
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3">
                <span className="text-sm font-bold text-primary">2</span>
              </div>
              <h4 className="font-medium mb-2">Input Grades</h4>
              <p className="text-sm text-muted-foreground">
                Enter your WAEC/NECO results
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3">
                <span className="text-sm font-bold text-primary">3</span>
              </div>
              <h4 className="font-medium mb-2">Get Conversion</h4>
              <p className="text-sm text-muted-foreground">
                View your converted grades
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3">
                <span className="text-sm font-bold text-primary">4</span>
              </div>
              <h4 className="font-medium mb-2">Apply Official</h4>
              <p className="text-sm text-muted-foreground">
                Follow our application guide
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Notice */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <div className="bg-amber-100 p-1 rounded-full flex-shrink-0">
              <FileText className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <h4 className="font-medium text-amber-800 mb-2">Important Notice</h4>
              <p className="text-sm text-amber-700">
                This calculator provides preliminary conversions based on official guidelines.
                For university applications, you must obtain official equivalency certificates from the respective education authorities.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className="text-amber-700 border-amber-300">
                  Preliminary Results Only
                </Badge>
                <Badge variant="outline" className="text-amber-700 border-amber-300">
                  Official Verification Required
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
