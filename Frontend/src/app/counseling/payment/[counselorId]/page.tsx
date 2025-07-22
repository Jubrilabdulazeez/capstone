"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StripeCheckout from "@/components/payments/StripeCheckout";
import { ArrowLeft, Calendar, Clock, Video, MessageCircle, Package, CreditCard } from "lucide-react";
import { format, parseISO } from "date-fns";
import Link from "next/link";

// Sample counselor data - in real app, this would come from API
const counselorsData = [
  {
    id: "counselor-001",
    name: "Dr. Amina Ibrahim",
    image: "/images/counselors/amina.jpg",
    title: "International Education Specialist",
    rating: 4.9,
    reviewCount: 124,
    experience: "8+ years",
    location: "Lagos, Nigeria",
    price: {
      video: 15000,
      chat: 8000,
      package: 50000
    }
  },
  {
    id: "counselor-002",
    name: "Michael Okonkwo",
    image: "/images/counselors/michael.jpg",
    title: "Engineering Education Consultant",
    rating: 4.8,
    reviewCount: 98,
    price: {
      video: 12000,
      chat: 7000,
      package: 45000
    }
  },
  {
    id: "counselor-003",
    name: "Grace Adeyemi",
    image: "/images/counselors/grace.jpg",
    title: "Scholarship & Financial Aid Expert",
    rating: 4.7,
    reviewCount: 113,
    price: {
      video: 13000,
      chat: 8000,
      package: 48000
    }
  }
];

const consultationTypes = [
  {
    id: "video",
    name: "Video Call",
    icon: Video,
    duration: 45,
    description: "Face-to-face consultation via video call"
  },
  {
    id: "chat",
    name: "Chat Session",
    icon: MessageCircle,
    duration: 60,
    description: "Text-based consultation with instant responses"
  },
  {
    id: "package",
    name: "Comprehensive Package",
    icon: Package,
    duration: 120,
    description: "Complete guidance package with follow-ups"
  }
];

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const counselorId = params.counselorId as string;
  const sessionType = searchParams.get("type") || "video";
  const sessionDate = searchParams.get("date") || "";
  const sessionTime = searchParams.get("time") || "";
  const notes = searchParams.get("notes") || "";

  const [counselor, setCounselor] = useState(() => {
    return counselorsData.find(c => c.id === counselorId) || counselorsData[0];
  });
  const [showPayment, setShowPayment] = useState(false);
  const [userEmail, setUserEmail] = useState("student@test.com"); // In real app, get from auth

  useEffect(() => {
    // Validate that we have all required booking data
    if (!sessionDate || !sessionTime || !sessionType) {
      router.push(`/counseling/book/${counselorId}`);
    }
  }, [counselorId, sessionDate, sessionTime, sessionType, router]);

  const selectedConsultationType = consultationTypes.find(type => type.id === sessionType);
  const price = counselor.price[sessionType as keyof typeof counselor.price];

  // Convert NGN to USD for Stripe (approximate exchange rate)
  const priceInUSD = Math.round((price / 1500) * 100) / 100; // Rough NGN to USD conversion

  const formatPrice = (price: number, currency = "NGN") => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getTypeIcon = (type: string) => {
    const consultationType = consultationTypes.find(ct => ct.id === type);
    if (!consultationType) return <Video className="h-4 w-4" />;
    const Icon = consultationType.icon;
    return <Icon className="h-4 w-4" />;
  };

  const handleProceedToPayment = () => {
    setShowPayment(true);
  };

  const handlePaymentSuccess = (paymentIntentId: string) => {
    // In a real app, you'd save the booking to your database here
    console.log("Payment successful:", paymentIntentId);

    // Redirect to confirmation page
    router.push(`/counseling/booking-confirmed?paymentId=${paymentIntentId}&counselorId=${counselorId}&type=${sessionType}&date=${sessionDate}&time=${sessionTime}`);
  };

  const handlePaymentError = (error: string) => {
    console.error("Payment failed:", error);
    setShowPayment(false);
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  if (!sessionDate || !sessionTime) {
    return (
      <MainLayout>
        <div className="container max-w-4xl mx-auto py-8">
          <Card>
            <CardContent className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">Invalid Booking Data</h2>
              <p className="text-muted-foreground mb-4">
                Missing session information. Please start the booking process again.
              </p>
              <Link href={`/counseling/book/${counselorId}`}>
                <Button>Return to Booking</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto py-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href={`/counseling/book/${counselorId}`}>
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Booking
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Complete Your Booking</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Booking Summary */}
          <div className="space-y-6">
            {/* Counselor Info */}
            <Card>
              <CardHeader>
                <CardTitle>Your Counselor</CardTitle>
              </CardHeader>
              <CardContent>
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
                    <p className="text-sm text-muted-foreground">{counselor.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Session Details */}
            <Card>
              <CardHeader>
                <CardTitle>Session Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <div className="flex items-center">
                      {getTypeIcon(sessionType)}
                      <span className="ml-2 font-medium">{selectedConsultationType?.name}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{selectedConsultationType?.duration} minutes</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="font-medium">{format(parseISO(sessionDate), "EEEE, MMM d, yyyy")}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="font-medium">{format(parseISO(sessionTime), "h:mm a")} WAT</span>
                    </div>
                  </div>
                </div>

                {notes && (
                  <div>
                    <p className="text-sm text-muted-foreground">Notes</p>
                    <p className="text-sm bg-muted p-3 rounded-lg">{notes}</p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Cost</span>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{formatPrice(price)}</p>
                      <p className="text-sm text-muted-foreground">≈ ${priceInUSD} USD</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Policies */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Booking Policies</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>• <strong>Cancellation:</strong> Free cancellation up to 24 hours before your session</p>
                <p>• <strong>Rescheduling:</strong> You can reschedule up to 2 times at no extra cost</p>
                <p>• <strong>Refunds:</strong> Full refund if cancelled 24+ hours in advance</p>
                <p>• <strong>No-show:</strong> No refund for missed sessions without prior notice</p>
              </CardContent>
            </Card>
          </div>

          {/* Payment Section */}
          <div>
            {!showPayment ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Ready to Book?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">
                      Click below to proceed with secure payment and confirm your consultation booking.
                    </p>

                    <div className="bg-muted/50 p-4 rounded-lg mb-6">
                      <h4 className="font-medium mb-2">Payment Options</h4>
                      <div className="flex items-center justify-center space-x-4 text-sm">
                        <Badge variant="outline">💳 Credit Card</Badge>
                        <Badge variant="outline">💰 Debit Card</Badge>
                        <Badge variant="outline">🔒 Secure</Badge>
                      </div>
                    </div>

                    <Button
                      onClick={handleProceedToPayment}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                      size="lg"
                    >
                      Proceed to Payment - {formatPrice(price)}
                    </Button>

                    <p className="text-xs text-muted-foreground mt-4">
                      Your payment is processed securely by Stripe. We never store your card details.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <StripeCheckout
                paymentData={{
                  amount: priceInUSD,
                  currency: "usd",
                  counselorId: counselor.id,
                  counselorName: counselor.name,
                  sessionType: selectedConsultationType?.name || sessionType,
                  sessionDate: format(parseISO(sessionDate), "EEEE, MMM d, yyyy"),
                  sessionTime: format(parseISO(sessionTime), "h:mm a"),
                  studentEmail: userEmail,
                  metadata: {
                    originalPriceNGN: price.toString(),
                    notes: notes || "",
                  }
                }}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                onCancel={handlePaymentCancel}
              />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
