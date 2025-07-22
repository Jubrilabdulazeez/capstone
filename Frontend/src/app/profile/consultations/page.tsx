"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Calendar,
  Clock,
  Video,
  MessageCircle,
  Package,
  Star,
  ChevronRight,
  Search,
  Filter,
  FileText,
  Download,
  Plus,
  CalendarDays,
  CheckCircle
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { useAuth } from "@/lib/context/AuthContext";
import Link from "next/link";

// Sample consultation data
const consultationHistory = [
  {
    id: "session-001",
    counselor: {
      id: "counselor-001",
      name: "Dr. Amina Ibrahim",
      image: "/images/counselors/amina.jpg",
      title: "International Education Specialist"
    },
    type: "video",
    status: "completed",
    date: "2024-01-16T14:00:00",
    duration: 45,
    rating: 5,
    feedback: "Excellent session! Dr. Ibrahim provided valuable insights about medical programs in South Africa.",
    agenda: "University applications for medical programs",
    cost: 15000,
    documents: [
      "University of Cape Town - Medicine Requirements.pdf",
      "Session Summary Notes.pdf"
    ]
  },
  {
    id: "session-002",
    counselor: {
      id: "counselor-002",
      name: "Michael Okonkwo",
      image: "/images/counselors/michael.jpg",
      title: "Engineering Education Consultant"
    },
    type: "chat",
    status: "completed",
    date: "2024-01-10T11:00:00",
    duration: 60,
    rating: 4,
    feedback: "Good session on engineering programs. Very knowledgeable about STEM fields.",
    agenda: "Engineering program requirements and application process",
    cost: 7000,
    documents: [
      "Engineering Programs Overview.pdf"
    ]
  },
  {
    id: "session-003",
    counselor: {
      id: "counselor-003",
      name: "Grace Adeyemi",
      image: "/images/counselors/grace.jpg",
      title: "Scholarship & Financial Aid Expert"
    },
    type: "video",
    status: "scheduled",
    date: "2024-01-25T15:00:00",
    duration: 45,
    agenda: "Scholarship applications and financial aid options",
    cost: 13000,
    documents: []
  }
];

const upcomingBookings = consultationHistory.filter(session => session.status === "scheduled");
const pastSessions = consultationHistory.filter(session => session.status === "completed");

export default function ConsultationsPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      case "missed": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return <Video className="h-4 w-4" />;
      case "chat": return <MessageCircle className="h-4 w-4" />;
      case "package": return <Package className="h-4 w-4" />;
      default: return <Video className="h-4 w-4" />;
    }
  };

  const handleJoinSession = (sessionId: string) => {
    router.push(`/counseling/session/${sessionId}`);
  };

  const handleReschedule = (sessionId: string) => {
    // In a real app, this would open a rescheduling modal
    console.log("Reschedule session:", sessionId);
  };

  const handleCancel = (sessionId: string) => {
    // In a real app, this would open a cancellation modal
    console.log("Cancel session:", sessionId);
  };

  const handleBookNewSession = () => {
    router.push("/counseling");
  };

  const filteredSessions = (sessions: typeof consultationHistory) => {
    return sessions.filter(session => {
      const matchesSearch = session.counselor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           session.agenda.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || session.status === statusFilter;
      const matchesType = typeFilter === "all" || session.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  };

  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Consultations</h1>
            <p className="text-muted-foreground">
              Manage your consultation sessions and view history
            </p>
          </div>
          <Button
            onClick={handleBookNewSession}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
          >
            <Plus className="h-4 w-4 mr-2" />
            Book New Session
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CalendarDays className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold">{upcomingBookings.length}</p>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold">{pastSessions.length}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold">
                    {pastSessions.reduce((total, session) => total + session.duration, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Minutes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold">
                    {pastSessions.length > 0
                      ? (pastSessions.reduce((sum, session) => sum + (session.rating || 0), 0) / pastSessions.length).toFixed(1)
                      : "0.0"
                    }
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search sessions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="video">Video Call</SelectItem>
                  <SelectItem value="chat">Chat Session</SelectItem>
                  <SelectItem value="package">Package</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Consultation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="history">Session History</TabsTrigger>
          </TabsList>

          {/* Upcoming Sessions */}
          <TabsContent value="upcoming" className="space-y-4">
            {filteredSessions(upcomingBookings).length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <CalendarDays className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Upcoming Sessions</h3>
                  <p className="text-muted-foreground mb-4">
                    You don't have any scheduled consultation sessions.
                  </p>
                  <Button onClick={handleBookNewSession}>
                    Book Your First Session
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredSessions(upcomingBookings).map((session) => (
                <Card key={session.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={session.counselor.image} alt={session.counselor.name} />
                          <AvatarFallback>
                            {session.counselor.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <h3 className="font-semibold">{session.counselor.name}</h3>
                          <p className="text-sm text-muted-foreground">{session.counselor.title}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {format(parseISO(session.date), "MMM d, yyyy")}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {format(parseISO(session.date), "h:mm a")}
                            </div>
                            <div className="flex items-center">
                              {getTypeIcon(session.type)}
                              <span className="ml-1 capitalize">{session.type}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(session.status)}>
                          {session.status}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReschedule(session.id)}
                          >
                            Reschedule
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleJoinSession(session.id)}
                            className="bg-gradient-to-r from-green-600 to-green-700"
                          >
                            Join Session
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-muted-foreground">
                        <strong>Topic:</strong> {session.agenda}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        <strong>Duration:</strong> {session.duration} minutes • <strong>Cost:</strong> {formatPrice(session.cost)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Session History */}
          <TabsContent value="history" className="space-y-4">
            {filteredSessions(pastSessions).length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Session History</h3>
                  <p className="text-muted-foreground mb-4">
                    Your completed consultation sessions will appear here.
                  </p>
                  <Button onClick={handleBookNewSession}>
                    Book Your First Session
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredSessions(pastSessions).map((session) => (
                <Card key={session.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={session.counselor.image} alt={session.counselor.name} />
                          <AvatarFallback>
                            {session.counselor.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <h3 className="font-semibold">{session.counselor.name}</h3>
                          <p className="text-sm text-muted-foreground">{session.counselor.title}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {format(parseISO(session.date), "MMM d, yyyy")}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {session.duration} minutes
                            </div>
                            <div className="flex items-center">
                              {getTypeIcon(session.type)}
                              <span className="ml-1 capitalize">{session.type}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(session.status)}>
                          {session.status}
                        </Badge>
                        {session.rating && (
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm ml-1">{session.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-muted-foreground">
                        <strong>Topic:</strong> {session.agenda}
                      </p>
                      {session.feedback && (
                        <p className="text-sm text-muted-foreground mt-2">
                          <strong>Feedback:</strong> {session.feedback}
                        </p>
                      )}

                      {session.documents && session.documents.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium mb-2">Session Documents:</p>
                          <div className="flex flex-wrap gap-2">
                            {session.documents.map((doc, index) => (
                              <Button
                                key={`${session.id}-doc-${index}`}
                                variant="outline"
                                size="sm"
                                className="text-xs"
                                onClick={() => console.log("Download", doc)}
                              >
                                <Download className="h-3 w-3 mr-1" />
                                {doc}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm text-muted-foreground">
                          Cost: {formatPrice(session.cost)}
                        </span>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/counseling/book/${session.counselor.id}`)}
                          >
                            Book Again
                          </Button>
                          <Link href={`/counseling/session/${session.id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
