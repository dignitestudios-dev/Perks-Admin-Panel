"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import type { UserDetail } from "@/lib/api/user-details.api";

interface UserProfileProps {
  user: UserDetail;
}

export function UserProfile({ user }: UserProfileProps) {
  const getStripeStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-50 text-green-700 border-green-200";
      case "in-review":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";
      case "not-provided":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Personal Information Card */}
      <Card className="border border-primary/10 shadow-lg hover:shadow-xl transition-shadow pt-0">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/[0.02] border-b border-primary/10 rounded-t-lg pt-6">
          <CardTitle className="text-primary text-xl">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar and Basic Info */}
          <div className="flex gap-6 items-start">
            <Avatar className="h-20 w-20">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <AvatarFallback className="text-lg font-semibold">
                  {user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Full Name
                </p>
                <p className="text-lg font-semibold">{user.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Username
                </p>
                <p className="text-lg">@{user.username}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Bio</p>
                <p className="text-base text-muted-foreground">
                  {user.bio || "No bio provided"}
                </p>
              </div>
            </div>
          </div>

          <hr className="my-6" />

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-base font-medium">{user.email}</p>
              <div className="flex items-center gap-2 mt-2">
                {user.isEmailVerified ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Verified</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-600">Not Verified</span>
                  </>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p className="text-base font-medium">
                {user.phone || "Not provided"}
              </p>
              <div className="flex items-center gap-2 mt-2">
                {user.isPhoneVerified ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Verified</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-600">Not Verified</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Information Card */}
      <Card className="border border-primary/10 shadow-lg hover:shadow-xl transition-shadow pt-0">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/[0.02] border-b border-primary/10 rounded-t-lg pt-6">
          <CardTitle className="text-primary text-xl">Professional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Occupation
              </p>
              <p className="text-base font-medium">
                {user.occupation || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Business Name
              </p>
              <p className="text-base font-medium">
                {user.businessName || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Branch
              </p>
              <p className="text-base font-medium">
                {user.branch || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Job Description
              </p>
              <p className="text-base text-muted-foreground line-clamp-2">
                {user.jobDescription || "Not provided"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">City</p>
              <p className="text-base font-medium">
                {user.city || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">State</p>
              <p className="text-base font-medium">
                {user.state || "Not provided"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods Card */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Venmo</p>
              <p className="text-base font-medium">
                {user.venmo || "Not linked"}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Cash App
              </p>
              <p className="text-base font-medium">
                {user.cashApp || "Not linked"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Stats Card */}
      <Card>
        <CardHeader>
          <CardTitle>Account Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-blue-50">
              <p className="text-sm font-medium text-muted-foreground">
                Tips Sent
              </p>
              <p className="text-2xl font-bold mt-2">{user.tipsSent}</p>
            </div>

            <div className="p-4 rounded-lg bg-green-50">
              <p className="text-sm font-medium text-muted-foreground">
                Tips Received
              </p>
              <p className="text-2xl font-bold mt-2">{user.tipsReceived}</p>
            </div>

            <div className="p-4 rounded-lg bg-purple-50">
              <p className="text-sm font-medium text-muted-foreground">
                Reviews Given
              </p>
              <p className="text-2xl font-bold mt-2">{user.reviewsGiven}</p>
            </div>

            <div className="p-4 rounded-lg bg-orange-50">
              <p className="text-sm font-medium text-muted-foreground">
                Reviews Received
              </p>
              <p className="text-2xl font-bold mt-2">{user.reviewsReceived}</p>
            </div>

            {user.totalEarnings !== null && (
              <div className="p-4 rounded-lg bg-yellow-50 col-span-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Earnings
                </p>
                <p className="text-2xl font-bold mt-2">
                  ${user.totalEarnings.toFixed(2)}
                </p>
              </div>
            )}

            <div className="p-4 rounded-lg bg-red-50 col-span-2">
              <p className="text-sm font-medium text-muted-foreground">
                Rating
              </p>
              <p className="text-2xl font-bold mt-2">
                {user.rating.toFixed(1)} ⭐
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Status Card */}
      <Card>
        <CardHeader>
          <CardTitle>Account Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Sign Up Status
              </p>
              <div className="flex items-center gap-2 mt-2">
                {user.isSignUpCompleted ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Completed</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium">Incomplete</span>
                  </>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Profile Status
              </p>
              <div className="flex items-center gap-2 mt-2">
                {user.isProfileCompleted ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Completed</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium">Incomplete</span>
                  </>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Stripe Status
              </p>
              <Badge
                variant="outline"
                className={`mt-2 ${getStripeStatusColor(user.stripeProfileStatus)}`}
              >
                {user.stripeProfileStatus}
              </Badge>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Account Status
              </p>
              <div className="flex items-center gap-2 mt-2">
                {user.isBlocked ? (
                  <>
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium text-red-600">
                      Blocked
                    </span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">
                      Active
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dates Card */}
      <Card>
        <CardHeader>
          <CardTitle>Important Dates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Created At
              </p>
              <p className="text-base font-medium">
                {new Date(user.createdAt).toLocaleDateString()} at{" "}
                {new Date(user.createdAt).toLocaleTimeString()}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Last Updated
              </p>
              <p className="text-base font-medium">
                {new Date(user.updatedAt).toLocaleDateString()} at{" "}
                {new Date(user.updatedAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
