"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import initialUsersData from "../data.json"
import { UserProfile } from "@/app/dashboard/users/components/user-profile"
import { UploadedDocuments } from "@/app/dashboard/users/components/uploaded-documents"
import { LoginMethods } from "@/app/dashboard/users/components/login-methods"
import { DeactivateAccount } from "@/app/dashboard/users/components/deactivate-account"

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

export default function UserDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const userId = Number(params.id)
  
  const user = initialUsersData.find((u: User) => u.id === userId)

  if (!user) {
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
          <p className="text-muted-foreground mt-2">The user you're looking for doesn't exist.</p>
        </div>
      </div>
    )
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
        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="login-methods">Login Methods</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <UserProfile user={user} />
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <UploadedDocuments userId={user.id} />
        </TabsContent>

        {/* Login Methods Tab */}
        <TabsContent value="login-methods" className="space-y-4">
          <LoginMethods userId={user.id} />
        </TabsContent>

        {/* Account Settings Tab */}
        <TabsContent value="account" className="space-y-4">
          <DeactivateAccount userId={user.id} userStatus={user.status} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
