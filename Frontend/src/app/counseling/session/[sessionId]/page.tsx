"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  MessageCircle,
  Send,
  FileText,
  Download,
  Upload,
  Settings,
  Star,
  Clock,
  Users,
  Share
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
    rating: 4.9
  },
  student: {
    id: "student-001",
    name: "Ahmed Olatunji",
    image: "/images/students/ahmed.jpg"
  },
  type: "video",
  status: "active",
  startTime: "2024-01-16T14:00:00",
  duration: 45,
  agenda: "University applications for medical programs in South Africa",
  documents: [
    { id: "doc-1", name: "University of Cape Town - Medicine Requirements.pdf", type: "pdf", shared: true },
    { id: "doc-2", name: "My Academic Transcript.pdf", type: "pdf", shared: false },
    { id: "doc-3", name: "Personal Statement Draft.docx", type: "doc", shared: true }
  ],
  notes: []
};

const chatMessages = [
  {
    id: "msg-1",
    sender: "counselor",
    message: "Hello Ahmed! I'm excited to help you with your medical school applications today.",
    time: "2024-01-16T14:01:00"
  },
  {
    id: "msg-2",
    sender: "student",
    message: "Thank you Dr. Ibrahim! I have some questions about the admission requirements.",
    time: "2024-01-16T14:02:00"
  },
  {
    id: "msg-3",
    sender: "counselor",
    message: "Perfect! I've shared the University of Cape Town requirements document. Let's go through it together.",
    time: "2024-01-16T14:03:00"
  }
];

export default function ConsultationSessionPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;

  const [session, setSession] = useState(sessionData);
  const [messages, setMessages] = useState(chatMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isCallActive, setIsCallActive] = useState(true);
  const [sessionNotes, setSessionNotes] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Timer for session duration
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: `msg-${Date.now()}`,
      sender: "student" as const,
      message: newMessage,
      time: new Date().toISOString()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");

    // Simulate counselor response after 2 seconds
    setTimeout(() => {
      const response = {
        id: `msg-${Date.now()}`,
        sender: "counselor" as const,
        message: "Thank you for that question. Let me provide some guidance on that...",
        time: new Date().toISOString()
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const endCall = () => {
    setIsCallActive(false);
    // In real app, this would save session data and redirect
    setTimeout(() => {
      router.push(`/counseling/feedback/${sessionId}`);
    }, 2000);
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };

  const downloadDocument = (docId: string) => {
    // In real app, this would download the actual file
    console.log('Downloading document:', docId);
  };

  return (
    <MainLayout>
      <div className="h-screen bg-background">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={session.counselor.image} alt={session.counselor.name} />
                <AvatarFallback>
                  {session.counselor.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-semibold">{session.counselor.name}</h1>
                <p className="text-sm text-muted-foreground">{session.counselor.title}</p>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800">
                Live Session
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{formatTime(timeElapsed)}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>2 participants</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(100vh-80px)]">
          {/* Main Video Area */}
          <div className="flex-1 bg-gray-900 relative">
            {/* Video Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              {isVideoOn ? (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Video className="h-16 w-16 mx-auto mb-4" />
                    <p>Video call in progress</p>
                    <p className="text-sm text-gray-400">
                      In a real implementation, this would show the actual video stream
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-white">
                  <VideoOff className="h-16 w-16 mx-auto mb-4" />
                  <p>Video is turned off</p>
                </div>
              )}
            </div>

            {/* Self Video Preview */}
            <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-700 rounded-lg border-2 border-gray-600">
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <Avatar className="h-12 w-12 mx-auto mb-2">
                    <AvatarImage src={session.student.image} alt={session.student.name} />
                    <AvatarFallback>
                      {session.student.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-xs">You</p>
                </div>
              </div>
            </div>

            {/* Call Controls */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-4 bg-black/50 backdrop-blur-sm rounded-full px-6 py-3">
                <Button
                  onClick={toggleAudio}
                  variant="ghost"
                  size="sm"
                  className={`rounded-full p-3 ${
                    isAudioOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {isAudioOn ? (
                    <Mic className="h-5 w-5 text-white" />
                  ) : (
                    <MicOff className="h-5 w-5 text-white" />
                  )}
                </Button>

                <Button
                  onClick={toggleVideo}
                  variant="ghost"
                  size="sm"
                  className={`rounded-full p-3 ${
                    isVideoOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {isVideoOn ? (
                    <Video className="h-5 w-5 text-white" />
                  ) : (
                    <VideoOff className="h-5 w-5 text-white" />
                  )}
                </Button>

                <Button
                  onClick={endCall}
                  variant="ghost"
                  size="sm"
                  className="rounded-full p-3 bg-red-600 hover:bg-red-700"
                >
                  <PhoneOff className="h-5 w-5 text-white" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full p-3 bg-gray-700 hover:bg-gray-600"
                >
                  <Settings className="h-5 w-5 text-white" />
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-96 bg-white border-l">
            <Tabs defaultValue="chat" className="h-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              {/* Chat Tab */}
              <TabsContent value="chat" className="h-full flex flex-col p-0">
                <div className="p-4 border-b">
                  <h3 className="font-medium">Session Chat</h3>
                  <p className="text-sm text-muted-foreground">
                    Messages during this consultation
                  </p>
                </div>

                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === 'student' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                            message.sender === 'student'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p>{message.message}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {format(new Date(message.time), 'HH:mm')}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                </ScrollArea>

                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button onClick={sendMessage} size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="h-full flex flex-col p-0">
                <div className="p-4 border-b">
                  <h3 className="font-medium">Shared Documents</h3>
                  <p className="text-sm text-muted-foreground">
                    Files shared during this session
                  </p>
                </div>

                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-3">
                    {session.documents.map((doc) => (
                      <Card key={doc.id} className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {doc.shared ? 'Shared' : 'Private'}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            {doc.shared && (
                              <Button
                                onClick={() => downloadDocument(doc.id)}
                                variant="ghost"
                                size="sm"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <Share className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>

                <div className="p-4 border-t">
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                </div>
              </TabsContent>

              {/* Notes Tab */}
              <TabsContent value="notes" className="h-full flex flex-col p-0">
                <div className="p-4 border-b">
                  <h3 className="font-medium">Session Notes</h3>
                  <p className="text-sm text-muted-foreground">
                    Take notes during your consultation
                  </p>
                </div>

                <div className="flex-1 p-4">
                  <Textarea
                    placeholder="Write your notes here... Key points, action items, follow-up questions, etc."
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value)}
                    className="h-full resize-none"
                  />
                </div>

                <div className="p-4 border-t">
                  <Button className="w-full">
                    Save Notes
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* End Call Overlay */}
        {!isCallActive && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
            <Card className="w-96">
              <CardContent className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PhoneOff className="h-8 w-8 text-gray-600" />
                </div>
                <h2 className="text-xl font-bold mb-2">Session Ended</h2>
                <p className="text-muted-foreground mb-4">
                  Your consultation session has ended. Redirecting to feedback...
                </p>
                <div className="text-sm text-muted-foreground">
                  Duration: {formatTime(timeElapsed)}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
