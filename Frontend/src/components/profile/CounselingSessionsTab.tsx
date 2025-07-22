"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/context/AuthContext";
import { Calendar, Clock, Star, Video, MessageSquare, Plus, Phone } from "lucide-react";
import Link from "next/link";

export function CounselingSessionsTab() {
  const { user } = useAuth();

  if (!user) return null;

  // Mock counseling sessions data since user.counselingSessions might be empty in demo
  const mockSessions = [
    {
      id: "session-001",
      counselorName: "Dr. Amina Ibrahim",
      counselorImage: "/images/counselors/amina.jpg",
      date: "2024-12-15T14:00:00Z",
      duration: 45,
      type: "Video" as const,
      status: "Scheduled" as const,
      notes: "Discuss application strategy for South African universities",
      rating: undefined,
      feedback: undefined,
    },
    {
      id: "session-002",
      counselorName: "Michael Okonkwo",
      counselorImage: "/images/counselors/michael.jpg",
      date: "2024-11-20T10:00:00Z",
      duration: 30,
      type: "Chat" as const,
      status: "Completed" as const,
      notes: "Review engineering program requirements and application timeline",
      rating: 5,
      feedback: "Very helpful session. Michael provided detailed insights into engineering programs across Africa and helped me prioritize my applications.",
    },
    {
      id: "session-003",
      counselorName: "Grace Adeyemi",
      counselorImage: "/images/counselors/grace.jpg",
      date: "2024-11-10T16:30:00Z",
      duration: 45,
      type: "Video" as const,
      status: "Completed" as const,
      notes: "Scholarship search and application strategy",
      rating: 4,
      feedback: "Great session on scholarship opportunities. Grace shared valuable resources and helped me identify suitable scholarships.",
    }
  ];

  const sessions = user.counselingSessions.length > 0 ? user.counselingSessions : mockSessions;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Missed":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Video":
        return <Video className="h-4 w-4" />;
      case "Audio":
        return <Phone className="h-4 w-4" />;
      case "Chat":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const upcomingSessions = sessions.filter(session => session.status === "Scheduled");
  const pastSessions = sessions.filter(session => session.status === "Completed");

  return (
    <div className="space-y-6">
      {sessions.length > 0 ? (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Counseling Sessions</h2>
              <p className="text-muted-foreground">
                Manage your educational counseling appointments
              </p>
            </div>
            <Link href="/counseling">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Book New Session
              </Button>
            </Link>
          </div>

          {/* Session Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{sessions.length}</div>
                <div className="text-sm text-muted-foreground">Total Sessions</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{upcomingSessions.length}</div>
                <div className="text-sm text-muted-foreground">Upcoming</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">
                  {pastSessions.filter(s => s.rating).length > 0
                    ? (pastSessions.reduce((sum, s) => sum + (s.rating || 0), 0) / pastSessions.filter(s => s.rating).length).toFixed(1)
                    : "--"}
                </div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">
                  {sessions.reduce((total, session) => total + session.duration, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Minutes</div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Sessions */}
          {upcomingSessions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Upcoming Sessions</h3>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <Card key={session.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={session.counselorImage} alt={session.counselorName} />
                            <AvatarFallback>
                              {session.counselorName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{session.counselorName}</h4>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(session.date)} • {session.duration} minutes
                            </p>
                            <p className="text-sm">{session.notes}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(session.status)}>
                            {getTypeIcon(session.type)}
                            <span className="ml-1">{session.type}</span>
                          </Badge>
                          <Button size="sm">Join Session</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Past Sessions */}
          {pastSessions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Past Sessions</h3>
              <div className="space-y-4">
                {pastSessions.map((session) => (
                  <Card key={session.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={session.counselorImage} alt={session.counselorName} />
                            <AvatarFallback>
                              {session.counselorName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{session.counselorName}</h4>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(session.date)} • {session.duration} minutes
                            </p>
                            <p className="text-sm">{session.notes}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(session.status)}>
                            {getTypeIcon(session.type)}
                            <span className="ml-1">{session.status}</span>
                          </Badge>
                          {session.rating && (
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm ml-1">{session.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {session.feedback && (
                        <div className="bg-muted/30 p-3 rounded-md">
                          <h5 className="font-medium text-sm mb-1">Your Feedback:</h5>
                          <p className="text-sm text-muted-foreground">{session.feedback}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Session Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Get the Most from Your Sessions</CardTitle>
              <CardDescription>
                Tips to maximize the value of your counseling sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-1 rounded-full">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Come prepared</h4>
                    <p className="text-sm text-muted-foreground">
                      Prepare specific questions and bring your academic documents and university shortlist.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-1 rounded-full">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Take notes</h4>
                    <p className="text-sm text-muted-foreground">
                      Record important advice and action items to reference later.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-1 rounded-full">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Follow up</h4>
                    <p className="text-sm text-muted-foreground">
                      Schedule follow-up sessions as needed and implement the recommendations discussed.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Counseling Sessions</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Book a session with our education consultants to get personalized guidance on your university applications and career planning.
            </p>
            <div className="flex justify-center gap-3">
              <Link href="/counseling">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Book Your First Session
                </Button>
              </Link>
              <Link href="/counseling">
                <Button variant="outline">
                  Learn About Counseling
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
