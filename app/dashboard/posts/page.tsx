"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Gift } from "lucide-react"

export default function PostsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Posts Management</h1>
        <p className="text-muted-foreground mt-2">
          Select a post type to manage
        </p>
      </div>

      {/* Post Type Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Anonymous Posts Card */}
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-blue-500" />
              <div className="space-y-1">
                <CardTitle>Anonymous Posts</CardTitle>
                <CardDescription>Manage anonymous user posts</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/dashboard/posts/anonymous">View Posts</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Donation Posts Card */}
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Gift className="h-6 w-6 text-green-500" />
              <div className="space-y-1">
                <CardTitle>Donation Posts</CardTitle>
                <CardDescription>Manage donation posts and campaigns</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/dashboard/posts/donations">View Posts</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}