"use client"

import { useState } from "react"
import { Trash2, Target, Calendar, DollarSign, Image, MoreVertical, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface DonationPost {
  id: string
  title: string
  description: string
  goal: number
  raised: number
  startDate: string
  endDate: string
  media?: string[]
  status: "active" | "completed" | "expired"
  donorCount: number
}

const mockDonationPosts: DonationPost[] = [
  {
    id: "1",
    title: "Community School Renovation Fund",
    description: "Help us renovate and upgrade the local community school. Your contribution will go towards new classrooms, library, and sports facilities.",
    goal: 50000,
    raised: 38500,
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    media: ["school-1.jpg", "school-2.jpg"],
    status: "active",
    donorCount: 245,
  },
  {
    id: "2",
    title: "Emergency Relief Fund for Flood Victims",
    description: "Urgent: Help families affected by recent flooding. Every dollar goes directly to food, shelter, and medical aid.",
    goal: 100000,
    raised: 87250,
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    media: ["flood-relief.jpg"],
    status: "active",
    donorCount: 892,
  },
  {
    id: "3",
    title: "Wildlife Conservation Project",
    description: "Protect endangered species in their natural habitat. This fund supports research, habitat protection, and conservation efforts.",
    goal: 75000,
    raised: 75000,
    startDate: "2023-11-01",
    endDate: "2024-01-15",
    media: ["wildlife-1.jpg", "wildlife-2.jpg", "wildlife-3.jpg"],
    status: "completed",
    donorCount: 1203,
  },
  {
    id: "4",
    title: "Medical Treatment Fund",
    description: "Help John undergo critical medical treatment. Funds will cover surgery and rehabilitation costs not covered by insurance.",
    goal: 25000,
    raised: 12500,
    startDate: "2024-01-20",
    endDate: "2024-04-20",
    media: ["medical-fund.jpg"],
    status: "active",
    donorCount: 156,
  },
]

export function DonationPosts() {
  const [posts, setPosts] = useState<DonationPost[]>(mockDonationPosts)

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-blue-600 bg-blue-50"
      case "completed":
        return "text-green-600 bg-green-50"
      case "expired":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const handleDeletePost = (postId: string) => {
    console.log(`[API CALL] Delete donation post: ${postId}`)
    setPosts(posts.filter((post) => post.id !== postId))
  }

  const handleViewDetails = (postId: string) => {
    console.log(`[API CALL] View donation post details: ${postId}`)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Donation Fundraising Posts</CardTitle>
          <CardDescription>
            {posts.length} donation campaigns in total
          </CardDescription>
        </CardHeader>
      </Card>

      {posts.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No donation posts found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => {
            const progressPercent = getProgressPercentage(post.raised, post.goal)
            const daysRemaining = Math.ceil(
              (new Date(post.endDate).getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24)
            )

            return (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                      <Badge variant="secondary" className={getStatusColor(post.status)}>
                        {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                      </Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleViewDetails(post.id)}
                          className="cursor-pointer"
                        >
                          View Details
                        </DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              className="cursor-pointer text-red-600"
                              onSelect={(e) => e.preventDefault()}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Campaign
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogTitle>Delete Campaign?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to permanently delete this donation campaign? This action cannot be undone.
                            </AlertDialogDescription>
                            <div className="flex gap-4">
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeletePost(post.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </div>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {post.description}
                  </p>

                  {/* Media Gallery */}
                  {post.media && post.media.length > 0 && (
                    <div className="mb-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Image className="h-4 w-4" />
                        <span>{post.media.length} media file(s)</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                        {post.media.map((media, idx) => (
                          <div
                            key={idx}
                            className="aspect-square bg-muted rounded-lg flex items-center justify-center border"
                          >
                            <Image className="h-6 w-6 text-muted-foreground" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Donation Progress */}
                  <div className="space-y-4 pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="text-xs text-muted-foreground">Raised</span>
                        </div>
                        <p className="text-xl font-bold">
                          ${post.raised.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          of ${post.goal.toLocaleString()} goal
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                          <span className="text-xs text-muted-foreground">Progress</span>
                        </div>
                        <p className="text-xl font-bold">{progressPercent.toFixed(1)}%</p>
                        <p className="text-xs text-muted-foreground">
                          {post.donorCount} donors
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <Progress value={progressPercent} className="h-2" />
                    </div>

                    {/* Timeline Info */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="flex items-center gap-2 text-xs">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Ends {new Date(post.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      {post.status === "active" && (
                        <div className="flex items-center gap-2 text-xs">
                          <Target className="h-4 w-4 text-orange-600" />
                          <span className="text-muted-foreground">
                            {daysRemaining > 0 ? `${daysRemaining} days left` : "Expired"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
