"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface User {
  id: number
  name: string
  email: string
  avatar: string
  role: string
  plan: string
  billing: string
  status: string
  joinedDate: string
  lastLogin: string
}

interface UserProfileProps {
  user: User
}

export function UserProfile({ user }: UserProfileProps) {
  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "text-red-600 bg-red-50"
      case "Editor":
        return "text-blue-600 bg-blue-50"
      case "Author":
        return "text-yellow-600 bg-yellow-50"
      case "Maintainer":
        return "text-green-600 bg-green-50"
      case "Subscriber":
        return "text-purple-600 bg-purple-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-600 bg-green-50"
      case "Pending":
        return "text-orange-600 bg-orange-50"
      case "Error":
        return "text-red-600 bg-red-50"
      case "Inactive":
        return "text-gray-600 bg-gray-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="space-y-4">
      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>View and manage user profile details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar and Basic Info */}
          <div className="flex gap-6 items-start">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-lg font-medium">
                {user.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                <p className="text-lg font-semibold">{user.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                <p className="text-lg">{user.email}</p>
              </div>
            </div>
          </div>

          <hr className="my-6" />

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Role</p>
              <Badge variant="secondary" className={getRoleColor(user.role)}>
                {user.role}
              </Badge>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Status</p>
              <Badge variant="secondary" className={getStatusColor(user.status)}>
                {user.status}
              </Badge>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Plan</p>
              <p className="text-base font-medium">{user.plan}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Billing</p>
              <p className="text-base font-medium">{user.billing}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Joined Date</p>
              <p className="text-base">{new Date(user.joinedDate).toLocaleDateString()}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Login</p>
              <p className="text-base">{new Date(user.lastLogin).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Card */}
      <Card>
        <CardHeader>
          <CardTitle>Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-blue-50">
              <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
              <p className="text-2xl font-bold mt-2">24</p>
            </div>
            <div className="p-4 rounded-lg bg-green-50">
              <p className="text-sm font-medium text-muted-foreground">Total Comments</p>
              <p className="text-2xl font-bold mt-2">142</p>
            </div>
            <div className="p-4 rounded-lg bg-purple-50">
              <p className="text-sm font-medium text-muted-foreground">Engagement Rate</p>
              <p className="text-2xl font-bold mt-2">87%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
