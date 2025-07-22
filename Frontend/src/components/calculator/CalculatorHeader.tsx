"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Calculator, Info, Globe } from "lucide-react";

export function CalculatorHeader() {
  return (
    <Card className="mb-8 bg-gradient-green-card border-0">
      <CardContent className="p-8">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-full bg-gradient-green">
            <Calculator className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gradient-green mb-2">
              Grade Equivalency Calculator
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              Convert your Nigerian qualifications (WAEC, NECO) to international standards for
              studying in Ghana, Rwanda, and South Africa.
            </p>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-primary" />
                <span>Supports 3 African Countries</span>
              </div>
              <div className="flex items-center space-x-2">
                <Info className="h-4 w-4 text-primary" />
                <span>Official Application Links Included</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white/80 rounded-lg border">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Important Notice</h4>
              <p className="text-sm text-blue-800">
                These conversions are estimates based on standard equivalency tables.
                Always verify requirements with your chosen university and consider
                official evaluation services when applying.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
