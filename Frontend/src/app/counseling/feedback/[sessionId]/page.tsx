"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  CheckCircle,
  Calendar,
  Clock,
  MessageCircle,
  FileText,
  Download,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { format } from "date-fns";

// Sample session data
const sessionData = {
  id: "session-001",
  counselor: {
    id: "counselor-001",
    name: "Dr. Amina Ibrahim",
    image: "/images/counselors/amina.jpg",
    title: "International Education Specialist",
    rating: 4.9,
    reviewCount: 124
  },
  student: {
    id: "student-001",
    name: "Ahmed Olatunji"
  },
  type: "Video Call",
  date: "2024-01-16T14:00:00",
  duration: 47,
  agenda: "University applications for medical programs in South Africa",
  status: "completed",
  actionItems: [
    "Research University of Cape Town medical program requirements",
    "Prepare personal statement focusing on community service experience",
    "Schedule follow-up session to review application materials",
    "Apply for pre-medical prerequisite courses"
  ],
  documentsShared: [
    "University of Cape Town - Medicine Requirements.pdf",
    "Personal Statement Guidelines.pdf",
    "Session Summary Notes.pdf"
  ]
};

export default function ConsultationFeedbackPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;

  const [session] = useState(sessionData);
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleSubmitFeedback = async () => {
    if (rating === 0) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const downloadSessionSummary = () => {
    // In real app, this would download the actual summary
    console.log('Downloading session summary');
  };

  const bookFollowUp = () => {
    router.push(`/counseling/book/${session.counselor.id}`);
  };

  if (isSubmitted) {
    return (
      <MainLayout>
        <div className="container max-w-4xl mx-auto py-8">
          <Card>
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Thank You for Your Feedback!</h2>
              <p className="text-muted-foreground mb-6">
                Your review helps us improve our counseling services and helps other students.
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => router.push('/counseling')} variant="outline">
                  Browse Counselors
                </Button>
                <Button onClick={bookFollowUp}>
                  Book Follow-up Session
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto py-8">
        {/* Session Summary */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  Session Completed
                </CardTitle>
                <CardDescription>
                  Your consultation with {session.counselor.name} has ended
                </CardDescription>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800">
                Completed
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Counselor Info */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={session.counselor.image} alt={session.counselor.name} />
                  <AvatarFallback>
                    {session.counselor.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{session.counselor.name}</h3>
                  <p className="text-muted-foreground">{session.counselor.title}</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                    <span className="text-sm">{session.counselor.rating} ({session.counselor.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Session Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{format(new Date(session.date), "EEEE, MMMM d, yyyy")}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{session.duration} minutes • {session.type}</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{session.agenda}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Feedback Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Rating */}
            <Card>
              <CardHeader>
                <CardTitle>Rate Your Session</CardTitle>
                <CardDescription>
                  How would you rate your overall experience with this consultation?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRatingClick(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 cursor-pointer transition-colors ${
                          star <= rating
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-300 hover:text-yellow-400'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {rating === 0 && "Click to rate your experience"}
                  {rating === 1 && "Poor - Session did not meet expectations"}
                  {rating === 2 && "Fair - Session was below average"}
                  {rating === 3 && "Good - Session met expectations"}
                  {rating === 4 && "Very Good - Session exceeded expectations"}
                  {rating === 5 && "Excellent - Outstanding session experience"}
                </p>
              </CardContent>
            </Card>

            {/* Written Feedback */}
            <Card>
              <CardHeader>
                <CardTitle>Share Your Feedback</CardTitle>
                <CardDescription>
                  Tell us about your experience and help us improve our services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="What did you find most helpful about this session? Any suggestions for improvement? How did the counselor help with your educational goals?"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={6}
                  className="mb-4"
                />

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">
                      Would you recommend this counselor to other students?
                    </p>
                    <div className="flex space-x-4">
                      <Button
                        variant={wouldRecommend === true ? "default" : "outline"}
                        size="sm"
                        onClick={() => setWouldRecommend(true)}
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Yes, definitely
                      </Button>
                      <Button
                        variant={wouldRecommend === false ? "default" : "outline"}
                        size="sm"
                        onClick={() => setWouldRecommend(false)}
                      >
                        <ThumbsDown className="h-4 w-4 mr-2" />
                        No, not really
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <Card>
              <CardContent className="pt-6">
                <Button
                  onClick={handleSubmitFeedback}
                  disabled={rating === 0 || isSubmitting}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  size="lg"
                >
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Your feedback helps us improve our services and will be used to help other students choose the right counselor.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Session Summary Sidebar */}
          <div className="space-y-6">
            {/* Action Items */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Action Items</CardTitle>
                <CardDescription>
                  Next steps discussed during your session
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {session.actionItems.map((item, index) => (
                    <li key={`action-${item.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}`} className="flex items-start space-x-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Session Documents</CardTitle>
                <CardDescription>
                  Materials shared during your consultation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {session.documentsShared.map((doc, index) => (
                    <div key={`doc-${doc.replace(/\s+/g, '-').toLowerCase()}`} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{doc}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <Button
                  onClick={downloadSessionSummary}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Download Session Summary
                </Button>
              </CardContent>
            </Card>

            {/* Follow-up */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Continue Your Journey</CardTitle>
                <CardDescription>
                  Keep making progress on your educational goals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={bookFollowUp}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                >
                  Book Follow-up Session
                </Button>
                <Button
                  onClick={() => router.push('/universities')}
                  variant="outline"
                  className="w-full"
                >
                  Explore Universities
                </Button>
                <Button
                  onClick={() => router.push('/tools/calculator')}
                  variant="outline"
                  className="w-full"
                >
                  Check Grade Calculator
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
