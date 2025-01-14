"use client";

import { useState } from "react";
import { useUser } from "@/lib/hooks/useData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function SettingsPage() {
  const { user, isLoading, error } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    dateOfBirth: "",
    presentAddress: "",
    permanentAddress: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [preferences, setPreferences] = useState({
    currency: "USD",
    timezone: "(GMT-12:00) International Date Line West",
    notifications: {
      digitalCurrency: true,
      merchantOrder: false,
      recommendations: true,
    },
  });
  const [security, setSecurity] = useState({
    twoFactorEnabled: true,
    currentPassword: "",
    newPassword: "",
  });

  useState(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        dateOfBirth: user.dateOfBirth || "",
        presentAddress: user.presentAddress || "",
        permanentAddress: user.permanentAddress || "",
        city: user.city || "",
        postalCode: user.postalCode || "",
        country: user.country || "",
      });
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleNotificationChange = (key: string, checked: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: checked,
      },
    }));
  };

  const handleProfileSave = async () => {
    if (!user?.id) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          ...formData,
        }),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreferencesSave = async () => {
    if (!user?.id) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/settings/preferences", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) throw new Error("Failed to update preferences");

      toast.success("Preferences updated successfully");
    } catch (error) {
      toast.error("Failed to update preferences");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSecuritySave = async () => {
    if (!user?.id) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/settings/security", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(security),
      });

      if (!response.ok) throw new Error("Failed to update security settings");

      toast.success("Security settings updated successfully");
      setSecurity((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
      }));
    } catch (error) {
      toast.error("Failed to update security settings");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) {
    return (
      <div className="text-red-500">
        Failed to load user settings. Please try again later.
      </div>
    );
  }

  if (isLoading || !user) {
    return <SettingsPageSkeleton />;
  }

  return (
    <div className="space-y-6">
      <Card className="p-8">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="flex space-x-8 border-b pb-0">
            <TabsTrigger value="profile">Edit Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="cursor-pointer h-32 w-32">
                  <AvatarImage src={user.avatar} alt={user.name} />
                </Avatar>
                <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white">
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">User Name</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="presentAddress">Present Address</Label>
                <Input
                  id="presentAddress"
                  value={formData.presentAddress}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="permanentAddress">Permanent Address</Label>
                <Input
                  id="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                className="bg-blue-600 text-white"
                onClick={handleProfileSave}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  value={preferences.currency}
                  onChange={(e) =>
                    setPreferences((prev) => ({
                      ...prev,
                      currency: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Time Zone</Label>
                <Input
                  id="timezone"
                  value={preferences.timezone}
                  onChange={(e) =>
                    setPreferences((prev) => ({
                      ...prev,
                      timezone: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-medium">Notification</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="digital-currency">
                    I send or receive digital currency
                  </Label>
                  <Switch
                    id="digital-currency"
                    checked={preferences.notifications.digitalCurrency}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("digitalCurrency", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="merchant-order">
                    I receive merchant order
                  </Label>
                  <Switch
                    id="merchant-order"
                    checked={preferences.notifications.merchantOrder}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("merchantOrder", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="recommendations">
                    There are recommendations for my account
                  </Label>
                  <Switch
                    id="recommendations"
                    checked={preferences.notifications.recommendations}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("recommendations", checked)
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                className="bg-blue-600 text-white"
                onClick={handlePreferencesSave}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">
                    Two-factor Authentication
                  </h3>
                  <p className="text-sm text-gray-500">
                    Enable or disable two factor authentication
                  </p>
                </div>
                <Switch
                  checked={security.twoFactorEnabled}
                  onCheckedChange={(checked) =>
                    setSecurity((prev) => ({
                      ...prev,
                      twoFactorEnabled: checked,
                    }))
                  }
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={security.currentPassword}
                      onChange={(e) =>
                        setSecurity((prev) => ({
                          ...prev,
                          currentPassword: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={security.newPassword}
                      onChange={(e) =>
                        setSecurity((prev) => ({
                          ...prev,
                          newPassword: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                className="bg-blue-600 text-white"
                onClick={handleSecuritySave}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

function SettingsPageSkeleton() {
  return (
    <div className="space-y-6">
      <Card className="p-8">
        <div className="space-y-6">
          <div className="border-b pb-4">
            <div className="flex space-x-6">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-24" />
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <Skeleton className="h-24 w-24 rounded-full" />

            <div className="grid grid-cols-2 gap-6">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
