"use client"

import { useState } from "react"
import { Trash2, Image, MapPin, Clock, User, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Helper function to calculate relative time
const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return "Just now"
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  
  return date.toLocaleDateString()
}

interface AnonymousPost {
  id: string
  content: string
  media?: string[]
  location?: string
  timestamp: string
  views: number
  comments: number
  category: string
}

const mockAnonymousPosts: AnonymousPost[] = [
  {
    id: "1",
    content: "Just witnessed the most incredible sunset today! Nature is truly amazing. Can't believe how peaceful it felt.",
    media: ["sunset-1.jpg", "sunset-2.jpg"],
    location: "Central Park, NY",
    timestamp: "2024-01-26T10:30:00",
    views: 1250,
    comments: 45,
    category: "Nature",
  },
  {
    id: "2",
    content: "Coffee and contemplation. Sometimes the simplest moments bring the most clarity. ☕",
    media: ["coffee.jpg"],
    location: "Downtown Cafe",
    timestamp: "2024-01-26T09:15:00",
    views: 892,
    comments: 23,
    category: "Lifestyle",
  },
  {
    id: "3",
    content: "Just finished my morning workout. Feeling energized and ready for the day! 💪",
    media: [],
    location: "Home Gym",
    timestamp: "2024-01-26T07:45:00",
    views: 567,
    comments: 18,
    category: "Fitness",
  },
  {
    id: "4",
    content: "The rain outside reminds me of all the possibilities ahead. Life is beautiful.",
    media: ["rain.jpg"],
    location: "Home",
    timestamp: "2024-01-25T18:20:00",
    views: 2103,
    comments: 89,
    category: "Thoughts",
  },
]

export function AnonymousPosts() {
  const [posts, setPosts] = useState<AnonymousPost[]>(mockAnonymousPosts)

  const handleDeletePost = (postId: string) => {
    console.log(`[API CALL] Delete anonymous post: ${postId}`)
    setPosts(posts.filter((post) => post.id !== postId))
  }

  const handleViewDetails = (postId: string) => {
    console.log(`[API CALL] View anonymous post details: ${postId}`)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Anonymous Posts</CardTitle>
          <CardDescription>
            {posts.length} anonymous posts in total
          </CardDescription>
        </CardHeader>
      </Card>

      {posts.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No anonymous posts found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.timestamp).toLocaleDateString()} at{" "}
                      {new Date(post.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
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
                            Delete Post
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogTitle>Delete Post?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to permanently delete this post? This action cannot be undone.
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

                {/* Post Content */}
                <div className="mb-4">
                  <p className="text-sm leading-relaxed text-foreground">{post.content}</p>
                </div>

                {/* Media Gallery */}
                {post.media && post.media.length > 0 && (
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Image className="h-4 w-4" />
                      <span>{post.media.length} media file(s)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
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

                {/* Post Metadata */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  {post.location && (
                    <div className="flex items-center gap-2 text-xs">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{post.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {getRelativeTime(post.timestamp)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{post.views} views</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground">{post.comments} comments</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
