"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/context/AuthContext";
import { Calendar, MapPin, Mail, Phone, Edit, Settings } from "lucide-react";
import Link from "next/link";

export function ProfileHeader() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Please sign in to view your profile.</p>
          <Link href="/auth/signin">
            <Button className="mt-4">Sign In</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not provided";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col items-center md:items-start">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={user.profilePicture} alt={user.firstName} />
              <AvatarFallback className="text-2xl">
                {getInitials(user.firstName, user.lastName)}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold mb-1">
                {user.firstName} {user.lastName}
              </h1>
              <div className="flex items-center justify-center md:justify-start mb-2">
                <Badge variant={user.verified ? "default" : "secondary"}>
                  {user.verified ? "Verified" : "Unverified"}
                </Badge>
                <Badge variant="outline" className="ml-2">
                  {user.role}
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm">
                Member since {formatDate(user.createdAt)}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{user.email}</span>
                </div>
                {user.phoneNumber && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{user.phoneNumber}</span>
                  </div>
                )}
                {user.dateOfBirth && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Born {formatDate(user.dateOfBirth)}</span>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">
                    {user.nationality}
                    {user.state && `, ${user.state}`}
                    {user.city && `, ${user.city}`}
                  </span>
                </div>
                {user.gender && (
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground mr-2">Gender:</span>
                    <span className="text-sm">{user.gender}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Link href="/profile/settings">
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
              <Link href="/profile/settings">
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
              <Link href="/questionnaire/flow">
                <Button variant="outline">
                  Update Preferences
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
