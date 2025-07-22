"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  university: string;
  country: string;
  message: string;
  avatar?: string;
}

export function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      name: "Chisom Okonkwo",
      role: "Engineering Student",
      university: "University of Cape Town",
      country: "South Africa",
      message:
        "EduConnect Africa helped me find a top engineering program in South Africa that I wouldn't have discovered on my own. The qualification calculator made it easy to understand how my WAEC results would transfer, and the counselor I spoke with guided me through the entire application process.",
      avatar: "/images/testimonials/chisom.jpg",
    },
    {
      name: "Adebayo Johnson",
      role: "Business Administration Student",
      university: "University of Ghana",
      country: "Ghana",
      message:
        "After struggling to secure admission to Nigerian universities for two years, EduConnect Africa showed me excellent options in Ghana. The university matching was spot-on, and I received a partial scholarship thanks to the scholarship database. Now I'm thriving in a business program with great industry connections.",
      avatar: "/images/testimonials/adebayo.jpg",
    },
    {
      name: "Ngozi Eze",
      role: "Medical Student",
      university: "University of Rwanda",
      country: "Rwanda",
      message:
        "I always dreamed of studying medicine but wasn't sure about options outside Nigeria. EduConnect Africa's detailed information about medical programs across Africa opened my eyes to the quality education available in Rwanda. The visa guidance and pre-departure checklist made my transition smooth.",
      avatar: "/images/testimonials/ngozi.jpg",
    },
    {
      name: "Emmanuel Okafor",
      role: "Computer Science Student",
      university: "American University in Cairo",
      country: "Egypt",
      message:
        "The personalized university matching system led me to a computer science program in Egypt that perfectly aligned with my interests in AI and data science. The Nigerian student community information helped me connect with fellow students even before arriving on campus.",
      avatar: "/images/testimonials/emmanuel.jpg",
    },
    {
      name: "Fatima Ibrahim",
      role: "Architecture Student",
      university: "University of Nairobi",
      country: "Kenya",
      message:
        "As a young woman seeking opportunities in architecture, EduConnect Africa was invaluable. Their counselors addressed all my concerns about studying abroad, and the platform helped me find affordable housing options near campus. The application tracking tools kept me organized throughout the process.",
      avatar: "/images/testimonials/fatima.jpg",
    },
  ];

  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from Nigerian students who found their perfect university match
            through EduConnect Africa.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={testimonial.name} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="border-border/60 h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <Quote className="h-8 w-8 text-primary mb-4" />
                      <p className="flex-grow text-muted-foreground mb-6">
                        "{testimonial.message}"
                      </p>
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12 border-2 border-muted">
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                          />
                          <AvatarFallback>
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <p className="font-medium">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role} • {testimonial.university}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8">
            <CarouselPrevious className="relative static transform-none mr-2" />
            <CarouselNext className="relative static transform-none" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
