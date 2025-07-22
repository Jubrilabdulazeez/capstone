"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/lib/context/AuthContext";
import { Shield, Key, Bell, Trash2, AlertTriangle, Save } from "lucide-react";
import { toast } from "sonner";

export function AccountSettings() {
  const { user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    applicationUpdates: true,
    scholarshipAlerts: true,
    counselingReminders: true,
    marketingEmails: false,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: true,
    shareDataForRecommendations: true,
    allowCookies: true,
  });

  const handlePasswordChange = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success("Password updated successfully!");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setIsLoading(false);
  };

  const handleSaveNotifications = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success("Notification preferences updated!");
    setIsLoading(false);
  };

  const handleSavePrivacy = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success("Privacy settings updated!");
    setIsLoading(false);
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast.success("Account deleted successfully");
    logout();
    setIsLoading(false);
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Please sign in to access settings.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Security Settings
          </CardTitle>
          <CardDescription>
            Manage your password and account security
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Password Change */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center">
              <Key className="h-4 w-4 mr-2" />
              Change Password
            </h4>
            <div className="grid gap-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  placeholder="Enter current password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  placeholder="Enter new password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Confirm new password"
                />
              </div>
              <Button onClick={handlePasswordChange} disabled={isLoading} className="w-fit">
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="border-t pt-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Button variant="outline">
                Enable 2FA
              </Button>
            </div>
          </div>

          {/* Session Management */}
          <div className="border-t pt-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Active Sessions</h4>
                <p className="text-sm text-muted-foreground">
                  Manage devices that are signed into your account
                </p>
              </div>
              <Button variant="outline">
                View Sessions
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose what notifications you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-muted-foreground">
                  Receive important updates via email
                </p>
              </div>
              <Switch
                checked={notificationSettings.emailNotifications}
                onCheckedChange={(checked) =>
                  setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Application Updates</h4>
                <p className="text-sm text-muted-foreground">
                  Get notified about application status changes
                </p>
              </div>
              <Switch
                checked={notificationSettings.applicationUpdates}
                onCheckedChange={(checked) =>
                  setNotificationSettings(prev => ({ ...prev, applicationUpdates: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Scholarship Alerts</h4>
                <p className="text-sm text-muted-foreground">
                  Be notified about new scholarship opportunities
                </p>
              </div>
              <Switch
                checked={notificationSettings.scholarshipAlerts}
                onCheckedChange={(checked) =>
                  setNotificationSettings(prev => ({ ...prev, scholarshipAlerts: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Counseling Reminders</h4>
                <p className="text-sm text-muted-foreground">
                  Reminders for upcoming counseling sessions
                </p>
              </div>
              <Switch
                checked={notificationSettings.counselingReminders}
                onCheckedChange={(checked) =>
                  setNotificationSettings(prev => ({ ...prev, counselingReminders: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Marketing Emails</h4>
                <p className="text-sm text-muted-foreground">
                  Receive news and updates about EduConnect Africa
                </p>
              </div>
              <Switch
                checked={notificationSettings.marketingEmails}
                onCheckedChange={(checked) =>
                  setNotificationSettings(prev => ({ ...prev, marketingEmails: checked }))
                }
              />
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={handleSaveNotifications} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              Save Notification Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
          <CardDescription>
            Control how your data is used and shared
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Profile Visibility</h4>
                <p className="text-sm text-muted-foreground">
                  Allow other users to see your profile information
                </p>
              </div>
              <Switch
                checked={privacySettings.profileVisibility}
                onCheckedChange={(checked) =>
                  setPrivacySettings(prev => ({ ...prev, profileVisibility: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Share Data for Recommendations</h4>
                <p className="text-sm text-muted-foreground">
                  Use your data to improve university recommendations
                </p>
              </div>
              <Switch
                checked={privacySettings.shareDataForRecommendations}
                onCheckedChange={(checked) =>
                  setPrivacySettings(prev => ({ ...prev, shareDataForRecommendations: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Allow Cookies</h4>
                <p className="text-sm text-muted-foreground">
                  Enable cookies for better user experience
                </p>
              </div>
              <Switch
                checked={privacySettings.allowCookies}
                onCheckedChange={(checked) =>
                  setPrivacySettings(prev => ({ ...prev, allowCookies: checked }))
                }
              />
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <Button onClick={handleSavePrivacy} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              Save Privacy Settings
            </Button>
            <Button variant="outline">
              Download My Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center text-red-600">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Danger Zone
          </CardTitle>
          <CardDescription>
            Irreversible actions that affect your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showDeleteConfirm ? (
            <div className="flex justify-between items-center p-4 border border-red-200 rounded-md">
              <div>
                <h4 className="font-medium text-red-600">Delete Account</h4>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <Button
                variant="destructive"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </div>
          ) : (
            <Alert className="border-red-200">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-4">
                  <p>
                    <strong>Are you sure you want to delete your account?</strong>
                  </p>
                  <p className="text-sm">
                    This action cannot be undone. All your data including:
                  </p>
                  <ul className="text-sm list-disc list-inside space-y-1">
                    <li>Profile information and preferences</li>
                    <li>Saved universities and applications</li>
                    <li>Counseling session history</li>
                    <li>Academic qualifications and documents</li>
                  </ul>
                  <p className="text-sm">
                    Will be permanently deleted and cannot be recovered.
                  </p>
                  <div className="flex gap-3">
                    <Button
                      variant="destructive"
                      onClick={handleDeleteAccount}
                      disabled={isLoading}
                    >
                      {isLoading ? "Deleting..." : "Yes, Delete My Account"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowDeleteConfirm(false)}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
