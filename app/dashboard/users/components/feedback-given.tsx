"use client"

import { MessageSquare, Star, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Review, UserDetail } from "@/lib/api/user-details.api"

interface FeedBackGivenProps {
  user: UserDetail
}

export function FeedBackGiven({ user }: FeedBackGivenProps) {
  const feedbackGiven = user.feedBackGiven || []

  if (feedbackGiven.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Feedback Given</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No feedback given yet</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const averageRating =
    feedbackGiven.length > 0
      ? (feedbackGiven.reduce((sum, review) => sum + review.stars, 0) / feedbackGiven.length).toFixed(1)
      : 0

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Average Rating Given</p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold">{averageRating}</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(parseFloat(averageRating as string))
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total Reviews Given</p>
              <p className="text-3xl font-bold">{feedbackGiven.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">5-Star Reviews Given</p>
              <p className="text-3xl font-bold">{feedbackGiven.filter((r) => r.stars === 5).length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feedbackGiven.map((review) => (
              <div key={review._id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      {review.user.profilePicture ? (
                        <img src={review.user.profilePicture} alt={review.user.name} className="h-full w-full object-cover" />
                      ) : (
                        <AvatarFallback>{review.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="font-medium">Review for {review.isAnonymous ? "Anonymous User" : review.user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {review.isAnonymous ? "Anonymous" : `@${review.user.username}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {review.description && <p className="text-sm text-muted-foreground mt-2">{review.description}</p>}
                <p className="text-xs text-muted-foreground mt-3">{new Date(review.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
