"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/context/AuthContext";
import { FileText, Clock, CheckCircle, AlertCircle, Plus, Eye } from "lucide-react";
import Link from "next/link";

export function ApplicationsTab() {
  const { user } = useAuth();

  if (!user) return null;

  // Mock applications data since user.applications might be empty in demo
  const mockApplications = [
    {
      id: "app-001",
      universityName: "University of Ghana",
      programName: "Business Administration",
      status: "Under Review" as const,
      applicationDate: "2024-11-15",
      lastUpdated: "2024-12-01",
      progress: 85,
      documents: [
        { name: "Transcripts", status: "Approved" as const },
        { name: "Personal Statement", status: "Approved" as const },
        { name: "Recommendation Letters", status: "Required" as const },
        { name: "Financial Documents", status: "Uploaded" as const },
      ],
      nextDeadline: "December 15, 2024",
    },
    {
      id: "app-002",
      universityName: "University of Cape Town",
      programName: "Computer Science",
      status: "Preparing" as const,
      applicationDate: "2024-11-20",
      lastUpdated: "2024-11-25",
      progress: 45,
      documents: [
        { name: "Transcripts", status: "Uploaded" as const },
        { name: "Personal Statement", status: "Required" as const },
        { name: "Portfolio", status: "Required" as const },
      ],
      nextDeadline: "January 31, 2025",
    }
  ];

  const applications = user.applications.length > 0 ? user.applications : mockApplications;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Under Review":
        return "bg-blue-100 text-blue-800";
      case "Conditional Approval":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Preparing":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="h-4 w-4" />;
      case "Under Review":
        return <Clock className="h-4 w-4" />;
      case "Rejected":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-500";
      case "Uploaded":
        return "bg-blue-500";
      case "Required":
        return "bg-red-500";
      case "Rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {applications.length > 0 ? (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">My Applications</h2>
              <p className="text-muted-foreground">
                Track your university applications and their progress
              </p>
            </div>
            <Link href="/universities">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Start New Application
              </Button>
            </Link>
          </div>

          {/* Application Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{applications.length}</div>
                <div className="text-sm text-muted-foreground">Total Applications</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">
                  {applications.filter(app => app.status === "Under Review").length}
                </div>
                <div className="text-sm text-muted-foreground">Under Review</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">
                  {applications.filter(app => app.status === "Approved").length}
                </div>
                <div className="text-sm text-muted-foreground">Approved</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">
                  {applications.filter(app => app.status === "Preparing").length}
                </div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </CardContent>
            </Card>
          </div>

          {/* Applications List */}
          <div className="space-y-4">
            {applications.map((application) => (
              <Card key={application.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{application.universityName}</h3>
                      <p className="text-muted-foreground">{application.programName}</p>
                      <p className="text-sm text-muted-foreground">
                        Applied: {new Date(application.applicationDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(application.status)}>
                        {getStatusIcon(application.status)}
                        <span className="ml-1">{application.status}</span>
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        Updated: {new Date(application.lastUpdated).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Application Progress</span>
                      <span className="text-sm text-muted-foreground">{application.progress}%</span>
                    </div>
                    <Progress value={application.progress} className="h-2" />
                  </div>

                  {/* Documents Status */}
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Required Documents</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                      {application.documents.map((doc, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-muted/30 rounded-md">
                          <div className={`w-2 h-2 rounded-full ${getDocumentStatusColor(doc.status)}`} />
                          <span className="text-sm flex-1">{doc.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {doc.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next Deadline */}
                  {application.nextDeadline && (
                    <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-md">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-orange-600 mr-2" />
                        <span className="text-sm font-medium text-orange-800">
                          Next Deadline: {application.nextDeadline}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button variant="default">
                      <Eye className="h-4 w-4 mr-2" />
                      View Application
                    </Button>
                    <Button variant="outline">
                      Upload Documents
                    </Button>
                    <Button variant="outline">
                      Contact University
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Application Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Application Tips</CardTitle>
              <CardDescription>
                Improve your chances of success with these recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Complete all required documents</h4>
                    <p className="text-sm text-muted-foreground">
                      Ensure all documents are uploaded and meet the university's requirements.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Follow up regularly</h4>
                    <p className="text-sm text-muted-foreground">
                      Check your application status regularly and respond promptly to requests.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Prepare for interviews</h4>
                    <p className="text-sm text-muted-foreground">
                      Some programs may require interviews. Be prepared to discuss your goals and qualifications.
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
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Applications Yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start your journey by applying to universities that match your interests and qualifications.
            </p>
            <div className="flex justify-center gap-3">
              <Link href="/universities">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Browse Universities
                </Button>
              </Link>
              <Link href="/universities?personalized=true">
                <Button variant="outline">
                  View My Matches
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
