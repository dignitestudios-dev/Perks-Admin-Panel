"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnonymousPosts } from "./components/anonymous-posts"
import { DonationPosts } from "./components/donation-posts"
import { ReportedPosts } from "./components/reported-posts"

export default function PostsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Posts Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage all posts, donations, and reported content
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="anonymous" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="anonymous">Anonymous Posts</TabsTrigger>
          <TabsTrigger value="donations">Donation Posts</TabsTrigger>
          <TabsTrigger value="reported">Reported Content</TabsTrigger>
        </TabsList>

        {/* Anonymous Posts Tab */}
        <TabsContent value="anonymous" className="space-y-4">
          <AnonymousPosts />
        </TabsContent>

        {/* Donation Posts Tab */}
        <TabsContent value="donations" className="space-y-4">
          <DonationPosts />
        </TabsContent>

        {/* Reported Posts Tab */}
        <TabsContent value="reported" className="space-y-4">
          <ReportedPosts />
        </TabsContent>
      </Tabs>
    </div>
  )
}