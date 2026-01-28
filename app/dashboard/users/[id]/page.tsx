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
    <div className="flex flex-col gap-8 p-4 lg:p-6">
      {/* Header with Gradient Background */}
      <div className="relative">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl blur-xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] to-transparent rounded-2xl" />

        <div className="relative px-6 py-8 rounded-2xl border border-primary/10 bg-gradient-to-r from-primary/5 via-transparent to-primary/5">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.back()}
              className="h-9 w-9 border-primary/20 hover:bg-primary/10 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-5">
            {/* Avatar with Gradient Border */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/60 rounded-2xl blur-md opacity-30" />
              <Avatar className="h-20 w-20 border-2 border-primary/20 relative">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary/20 to-primary/10">
                    {user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>

            {/* User Details */}
            <div className="flex-grow">
              <h1 className="text-4xl font-bold tracking-tight">{user.name}</h1>
              <p className="text-primary/80 font-medium mt-1">@{user.username}</p>
              <p className="text-sm text-muted-foreground mt-2">User Details & Management</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs with Modern Styling */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-7 bg-muted/50 border border-muted p-1 rounded-xl">
          <TabsTrigger 
            value="profile"
            className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger 
            value="documents"
            className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            Documents
          </TabsTrigger>
          <TabsTrigger 
            value="earnings"
            className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            My Earnings
          </TabsTrigger>
          <TabsTrigger 
            value="contributions"
            className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            My Contributions
          </TabsTrigger>
          <TabsTrigger 
            value="feedback-received"
            className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            Feedback Received
          </TabsTrigger>
          <TabsTrigger 
            value="feedback-given"
            className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            Feedback Given
          </TabsTrigger>
          <TabsTrigger 
            value="account"
            className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            Account
          </TabsTrigger>
        </TabsList>

        {/* Tab Contents */}
        <TabsContent value="profile" className="space-y-4 mt-6">
          <UserProfile user={user} />
        </TabsContent>

        <TabsContent value="documents" className="space-y-4 mt-6">
          <UploadedDocuments user={user} />
        </TabsContent>

        <TabsContent value="earnings" className="space-y-4 mt-6">
          <MyEarnings user={user} />
        </TabsContent>

        <TabsContent value="contributions" className="space-y-4 mt-6">
          <MyContributions user={user} />
        </TabsContent>

        <TabsContent value="feedback-received" className="space-y-4 mt-6">
          <FeedBackReceived user={user} />
        </TabsContent>

        <TabsContent value="feedback-given" className="space-y-4 mt-6">
          <FeedBackGiven user={user} />
        </TabsContent>

        <TabsContent value="account" className="space-y-4 mt-6">
          <DeactivateAccount user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
