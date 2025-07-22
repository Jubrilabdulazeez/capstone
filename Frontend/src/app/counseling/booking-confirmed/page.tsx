"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Calendar,
  Clock,
  Video,
  MessageCircle,
  Package,
  Download,
  Star,
  ArrowRight,
  CalendarDays,
  Bell
} from "lucide-react";
import { format, parseISO } from "date-fns";
import Link from "next/link";

// Sample counselor data
const counselorsData = [
  {
    id: "counselor-001",
    name: "Dr. Amina Ibrahim",
    image: "/images/counselors/amina.jpg",
    title: "International Education Specialist",
    email: "amina@educonnect.com",
    phone: "+234 801 234 5678"
  },
  {
    id: "counselor-002",
    name: "Michael Okonkwo",
    image: "/images/counselors/michael.jpg",
    title: "Engineering Education Consultant",
    email: "michael@educonnect.com",
    phone: "+234 802 345 6789"
  },
  {
    id: "counselor-003",
    name: "Grace Adeyemi",
    image: "/images/counselors/grace.jpg",
    title: "Scholarship & Financial Aid Expert",
    email: "grace@educonnect.com",
    phone: "+234 803 456 7890"
  }
];

const consultationTypes = [
  {
    id: "video",
    name: "Video Call",
    icon: Video,
    duration: 45
  },
  {
    id: "chat",
    name: "Chat Session",
    icon: MessageCircle,
    duration: 60
  },
  {
    id: "package",
    name: "Comprehensive Package",
    icon: Package,
    duration: 120
  }
];

export default function BookingConfirmedPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paymentId = searchParams.get("paymentId");
  const counselorId = searchParams.get("counselorId");
  const sessionType = searchParams.get("type");
  const sessionDate = searchParams.get("date");
  const sessionTime = searchParams.get("time");

  // Find counselor and session type
  const counselor = counselorsData.find(c => c.id === counselorId) || counselorsData[0];
  const consultationType = consultationTypes.find(ct => ct.id === sessionType) || consultationTypes[0];

  // Generate booking reference
  const bookingRef = `EC-${paymentId?.slice(-8).toUpperCase()}`;

  const getTypeIcon = () => {
    const Icon = consultationType.icon;
    return <Icon className="h-4 w-4" />;
  };

  const downloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    console.log("Downloading receipt for payment:", paymentId);
  };

  const addToCalendar = () => {
    if (!sessionDate || !sessionTime) return;

    const startDate = parseISO(sessionTime);
    const endDate = new Date(startDate.getTime() + (consultationType.duration * 60000));

    const event = {
      title: `Consultation with ${counselor.name}`,
      start: `${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      end: `${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      description: `${consultationType.name} consultation session with ${counselor.name}, ${counselor.title}`,
      location: 'Online via EduConnect Africa'
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;

    window.open(googleCalendarUrl, '_blank');
  };

  if (!paymentId || !counselorId || !sessionDate || !sessionTime) {
    return (
      <MainLayout>
        <div className="container max-w-4xl mx-auto py-8">
          <Card>
            <CardContent className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">Invalid Booking Information</h2>
              <p className="text-muted-foreground mb-4">
                We couldn't find your booking details. Please check your email for confirmation.
              </p>
              <Link href="/counseling">
                <Button>Browse Counselors</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto py-8">
        {/* Success Header */}
        <Card className="mb-8">
          <CardContent className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground text-lg mb-4">
              Your consultation has been successfully booked and paid for.
            </p>
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
              Booking Reference: {bookingRef}
            </Badge>
          </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Session Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Session Information */}
            <Card>
              <CardHeader>
                <CardTitle>Session Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Counselor Info */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={counselor.image} alt={counselor.name} />
                    <AvatarFallback>
                      {counselor.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{counselor.name}</h3>
                    <p className="text-muted-foreground">{counselor.title}</p>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="text-sm">Verified Expert</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Session Info */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Session Type</p>
                    <div className="flex items-center">
                      {getTypeIcon()}
                      <span className="ml-2 font-medium">{consultationType.name}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Duration</p>
                    <p className="font-medium">{consultationType.duration} minutes</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Date</p>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="font-medium">{format(parseISO(sessionDate), "EEEE, MMM d, yyyy")}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Time</p>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="font-medium">{format(parseISO(sessionTime), "h:mm a")} WAT</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Contact Information */}
                <div>
                  <h4 className="font-medium mb-3">Counselor Contact</h4>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <p className="text-sm">
                      <strong>Email:</strong> {counselor.email}
                    </p>
                    <p className="text-sm">
                      <strong>Phone:</strong> {counselor.phone}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Your counselor may contact you before the session with additional information.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What's Next */}
            <Card>
              <CardHeader>
                <CardTitle>What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-green-600">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Confirmation Email</h4>
                      <p className="text-sm text-muted-foreground">
                        You'll receive a detailed confirmation email with session link and preparation tips.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-green-600">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Session Reminders</h4>
                      <p className="text-sm text-muted-foreground">
                        We'll send you reminders 24 hours and 1 hour before your session.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-green-600">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Join Your Session</h4>
                      <p className="text-sm text-muted-foreground">
                        Join your session 5 minutes early using the link in your confirmation email.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={addToCalendar}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Add to Calendar
                </Button>

                <Button
                  onClick={downloadReceipt}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Receipt
                </Button>

                <Link href="/profile/consultations">
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="h-4 w-4 mr-2" />
                    View All Bookings
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Continue Your Journey</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/counseling">
                  <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                    Book Another Session
                  </Button>
                </Link>

                <Link href="/universities">
                  <Button variant="outline" className="w-full justify-start">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Explore Universities
                  </Button>
                </Link>

                <Link href="/tools/calculator">
                  <Button variant="outline" className="w-full justify-start">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Grade Calculator
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p className="text-muted-foreground">
                  If you have any questions about your booking, please contact our support team.
                </p>
                <div className="space-y-1">
                  <p><strong>Email:</strong> support@educonnect-africa.com</p>
                  <p><strong>Phone:</strong> +234 800 123 4567</p>
                  <p><strong>Hours:</strong> Mon-Fri, 9AM-6PM WAT</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
