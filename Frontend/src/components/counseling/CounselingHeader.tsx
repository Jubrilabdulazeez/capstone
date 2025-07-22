"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, Video, Star, CalendarClock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";

interface CounselingHeaderProps {
  onServiceSelect?: (serviceType: string) => void;
}

export function CounselingHeader({ onServiceSelect }: CounselingHeaderProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      id: "video",
      title: "Video Consultation",
      icon: Video,
      price: "₦15,000",
      duration: "45-minute session",
      description: "One-on-one video call with an education consultant",
      features: [
        "Personalized university recommendations",
        "Application strategy planning",
        "Document review guidance",
        "Live Q&A session"
      ],
      popular: true
    },
    {
      title: "Chat Consultation",
      icon: MessageSquare,
      price: "₦8,000",
      duration: "30-minute session",
      description: "Text-based conversation with an education consultant",
      features: [
        "Quick questions and clarifications",
        "Program eligibility assessment",
        "Application checklist review",
        "Written recommendations"
      ],
      popular: false
    },
    {
      title: "Application Package",
      icon: CalendarClock,
      price: "₦50,000",
      duration: "3 sessions + ongoing support",
      description: "Complete guidance through the entire application process",
      features: [
        "Strategic university selection",
        "Complete application review",
        "Document preparation assistance",
        "Visa and travel guidance",
        "Scholarship application support"
      ],
      popular: false
    }
  ];

  return (
    <div className="space-y-8 mb-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gradient-green mb-4">
          Education Counseling Services
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Get personalized guidance from experts who specialize in African higher education.
          Our consultants have helped thousands of Nigerian students achieve their academic dreams.
        </p>
      </div>

      {/* Service Types */}
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <Card key={service.title} className={`relative ${service.popular ? 'border-primary shadow-lg' : ''}`}>
            {service.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}

            <CardHeader className="text-center">
              <div className={`mx-auto p-3 rounded-full ${service.popular ? 'bg-primary' : 'bg-primary/10'} mb-3`}>
                <service.icon className={`h-6 w-6 ${service.popular ? 'text-white' : 'text-primary'}`} />
              </div>
              <CardTitle className="text-xl">{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>

            <CardContent className="text-center">
              <div className="text-3xl font-bold mb-2">{service.price}</div>
              <p className="text-sm text-muted-foreground mb-4">{service.duration}</p>

              <ul className="space-y-2 text-sm text-left">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Star className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button
                className={`w-full ${service.popular ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800' : ''}`}
                variant={service.popular ? "default" : "outline"}
                onClick={() => {
                  if (onServiceSelect) {
                    onServiceSelect(service.id || service.title.toLowerCase().replace(' ', '-'));
                  }
                  // Scroll to counselors list
                  const counselorsList = document.getElementById('counselors-list');
                  if (counselorsList) {
                    counselorsList.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Find Counselors
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* How It Works */}
      <Card className="bg-gradient-green-card border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">How Our Counseling Works</CardTitle>
          <CardDescription className="text-base">
            Get expert guidance through every step of your educational journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-lg">1</span>
              </div>
              <h3 className="font-semibold mb-2">Choose a Consultant</h3>
              <p className="text-sm text-muted-foreground">
                Select a consultant based on their expertise, ratings, and specialties
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-lg">2</span>
              </div>
              <h3 className="font-semibold mb-2">Schedule Your Session</h3>
              <p className="text-sm text-muted-foreground">
                Pick a convenient time and complete secure payment
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold mb-2">Get Expert Guidance</h3>
              <p className="text-sm text-muted-foreground">
                Receive tailored advice and support for your specific educational goals
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
