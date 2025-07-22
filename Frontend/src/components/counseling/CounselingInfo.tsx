"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Award, Video, Phone, MessageCircle, LogIn, User } from "lucide-react";
import { signIn } from "next-auth/react";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";

export function CounselingInfo() {
  const { user } = useAuth();
  const router = useRouter();

  const handleDemoLogin = async () => {
    try {
      console.log("Starting demo login...");
      const result = await signIn("credentials", {
        email: "test@test.com",
        password: "password",
        redirect: false,
      });

      console.log("Login result:", result);

      if (result?.ok) {
        alert("✅ Demo login successful! You can now book counseling sessions.");
        // Force session refresh
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`);
        window.location.reload();
      } else {
        alert("❌ Demo login failed: " + (result?.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("❌ Login error: " + error);
    }
  };

  const features = [
    {
      icon: Video,
      title: "Virtual Sessions",
      description: "Connect with counselors via video calls from anywhere"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "24/7 phone support for urgent guidance needs"
    },
    {
      icon: MessageCircle,
      title: "Chat Support",
      description: "Real-time messaging with qualified counselors"
    },
    {
      icon: Award,
      title: "Expert Guidance",
      description: "Certified counselors with African education expertise"
    }
  ];

  const sessionTypes = [
    {
      title: "University Selection",
      duration: "60 minutes",
      price: "$50",
      description: "Get personalized university recommendations"
    },
    {
      title: "Application Review",
      duration: "45 minutes",
      price: "$40",
      description: "Review and optimize your applications"
    },
    {
      title: "Scholarship Guidance",
      duration: "30 minutes",
      price: "$30",
      description: "Find and apply for scholarship opportunities"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Quick Login Demo */}
      {!user && (
        <Card className="border-2 border-dashed border-green-300 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <LogIn className="h-5 w-5 mr-2" />
              Quick Demo Access
            </CardTitle>
            <CardDescription className="text-green-700">
              Try booking a session with our demo account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-700 mb-4">
              🎯 <strong>NEW:</strong> You can now browse counselors and select booking options without logging in!
              Sign in is only required when you're ready to confirm your booking.
            </p>
            <Button
              onClick={handleDemoLogin}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              🚀 Demo Login (test@test.com)
            </Button>
            <p className="text-xs text-green-600 mt-2 text-center">
              Or go to <strong>Sign In</strong> page for more options
            </p>
          </CardContent>
        </Card>
      )}

      {user && (
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <User className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-green-800 font-medium">
                  Welcome, {user.firstName}! You can now book sessions.
                </span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => router.push('/profile')}
                className="border-green-300 text-green-700 hover:bg-green-100"
              >
                View Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* About Counseling */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            About Our Counseling Services
          </CardTitle>
          <CardDescription>
            Professional guidance to help you navigate your educational journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Our experienced counselors provide personalized guidance to help Nigerian students
            successfully apply to universities across Africa. From university selection to
            application preparation, we're here to support your educational goals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature) => (
              <div key={feature.title} className="text-center p-4 border rounded-lg">
                <feature.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-medium mb-1">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Session Types */}
      <Card>
        <CardHeader>
          <CardTitle>Session Types</CardTitle>
          <CardDescription>
            Choose the type of counseling session that best fits your needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sessionTypes.map((session) => (
              <Card key={session.title} className="border border-border/60">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium">{session.title}</h4>
                    <Badge variant="outline">{session.price}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{session.description}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {session.duration}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Process */}
      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
          <CardDescription>
            Simple steps to get started with counseling
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: "1", title: "Book Session", description: "Choose your preferred counselor and time" },
              { step: "2", title: "Prepare", description: "Complete a brief questionnaire about your goals" },
              { step: "3", title: "Connect", description: "Join your scheduled video or phone session" },
              { step: "4", title: "Follow-up", description: "Receive personalized action plan and resources" }
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-medium">
                  {step.step}
                </div>
                <h4 className="font-medium mb-1">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
