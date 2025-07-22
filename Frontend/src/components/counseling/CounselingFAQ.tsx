"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export function CounselingFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqItems: FAQItem[] = [
    {
      question: "How do I book a counseling session?",
      answer: "You can book a session by browsing our available counselors, selecting your preferred time slot, and completing the booking form. Payment is processed securely online."
    },
    {
      question: "What qualifications do your counselors have?",
      answer: "All our counselors are certified professionals with experience in African education systems. They hold relevant degrees and have helped hundreds of students successfully apply to universities."
    },
    {
      question: "Can I reschedule or cancel my session?",
      answer: "Yes, you can reschedule or cancel your session up to 24 hours before the scheduled time. Cancellations made less than 24 hours in advance may incur a fee."
    },
    {
      question: "What technology do I need for video sessions?",
      answer: "You'll need a computer, tablet, or smartphone with a stable internet connection, camera, and microphone. We'll send you a meeting link before your session."
    },
    {
      question: "How long does each counseling session last?",
      answer: "Session duration varies by type: University Selection (60 min), Application Review (45 min), and Scholarship Guidance (30 min). You can book multiple sessions if needed."
    },
    {
      question: "Do you provide follow-up support after sessions?",
      answer: "Yes, you'll receive a personalized action plan and resources after your session. You can also book follow-up sessions at discounted rates."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept major credit cards, PayPal, and local payment methods including mobile money transfers. All payments are processed securely."
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "We offer a satisfaction guarantee. If you're not happy with your session, contact us within 48 hours and we'll work to resolve the issue or provide a refund."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <HelpCircle className="h-5 w-5 mr-2" />
          Frequently Asked Questions
        </CardTitle>
        <CardDescription>
          Find answers to common questions about our counseling services
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={`faq-${index}-${item.question.slice(0, 20)}`} className="border rounded-lg">
              <Button
                variant="ghost"
                className="w-full justify-between p-4 h-auto text-left"
                onClick={() => toggleItem(index)}
              >
                <span className="font-medium pr-4">{item.question}</span>
                {openItems.includes(index) ? (
                  <ChevronUp className="h-4 w-4 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 flex-shrink-0" />
                )}
              </Button>
              {openItems.includes(index) && (
                <div className="px-4 pb-4">
                  <p className="text-muted-foreground">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">Still have questions?</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <Button variant="outline" size="sm">
            Contact Support
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
