"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserDetail } from "@/lib/hooks/useUserDetail";
import { UserProfile } from "@/app/dashboard/users/components/user-profile";
import { UploadedDocuments } from "@/app/dashboard/users/components/uploaded-documents";
import { DeactivateAccount } from "@/app/dashboard/users/components/deactivate-account";
import { MyEarnings } from "@/app/dashboard/users/components/my-earnings";
import { MyContributions } from "@/app/dashboard/users/components/my-contributions";
import { FeedBackReceived } from "@/app/dashboard/users/components/feedback-received";
import { FeedBackGiven } from "@/app/dashboard/users/components/feedback-given";

export default function UserDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const { data: user, isLoading, error } = useUserDetail(userId);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex flex-col gap-4 p-4 lg:p-6">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="w-fit"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">User not found</h2>
          <p className="text-muted-foreground mt-2">
            {error
              ? (error as any).message
              : "The user you're looking for doesn't exist."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
          className="h-9 w-9"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
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
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">@{user.username}</p>
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="earnings">My Earnings</TabsTrigger>
          <TabsTrigger value="contributions">My Contributions</TabsTrigger>
          <TabsTrigger value="feedback-received">Feedback Received</TabsTrigger>
          <TabsTrigger value="feedback-given">Feedback Given</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <UserProfile user={user} />
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <UploadedDocuments user={user} />
        </TabsContent>

        {/* My Earnings Tab */}
        <TabsContent value="earnings" className="space-y-4">
          <MyEarnings user={user} />
        </TabsContent>

        {/* My Contributions Tab */}
        <TabsContent value="contributions" className="space-y-4">
          <MyContributions user={user} />
        </TabsContent>

        {/* Feedback Received Tab */}
        <TabsContent value="feedback-received" className="space-y-4">
          <FeedBackReceived user={user} />
        </TabsContent>

        {/* Feedback Given Tab */}
        <TabsContent value="feedback-given" className="space-y-4">
          <FeedBackGiven user={user} />
        </TabsContent>

        {/* Account Settings Tab */}
        <TabsContent value="account" className="space-y-4">
          <DeactivateAccount user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
