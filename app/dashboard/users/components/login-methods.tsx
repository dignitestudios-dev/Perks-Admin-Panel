"use client"

import { Check, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { UserDetail } from "@/lib/api/user-details.api"

interface LoginMethodsProps {
  user: UserDetail
}

export function LoginMethods({ user }: LoginMethodsProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Account Status & Login Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {user.isEmailVerified ? (
                  <>
                    <Check className="h-4 w-4 text-green-600" />
                    <Badge className="bg-green-50 text-green-700 border-green-200">Verified</Badge>
                  </>
                ) : (
                  <>
                    <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">Unverified</Badge>
                  </>
                )}
              </div>
            </div>

            {/* Phone */}
            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-3 mb-4">
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-sm text-muted-foreground">{user.phone || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {user.isPhoneVerified ? (
                  <>
                    <Check className="h-4 w-4 text-green-600" />
                    <Badge className="bg-green-50 text-green-700 border-green-200">Verified</Badge>
                  </>
                ) : (
                  <>
                    <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">Unverified</Badge>
                  </>
                )}
              </div>
            </div>
          </div>

          <hr className="my-6" />

          {/* Sign Up & Profile Status */}
          <div className="space-y-4">
            <h3 className="font-semibold">Account Completion</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border">
                <p className="font-medium mb-2">Sign Up Completed</p>
                <div className="flex items-center gap-2">
                  {user.isSignUpCompleted ? (
                    <>
                      <Check className="h-4 w-4 text-green-600" />
                      <Badge className="bg-green-50 text-green-700 border-green-200">Yes</Badge>
                    </>
                  ) : (
                    <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">No</Badge>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-lg border">
                <p className="font-medium mb-2">Profile Completed</p>
                <div className="flex items-center gap-2">
                  {user.isProfileCompleted ? (
                    <>
                      <Check className="h-4 w-4 text-green-600" />
                      <Badge className="bg-green-50 text-green-700 border-green-200">Yes</Badge>
                    </>
                  ) : (
                    <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">No</Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          <hr className="my-6" />

          {/* Account Status */}
          <div className="space-y-4">
            <h3 className="font-semibold">Account Status</h3>
            <div className="p-4 rounded-lg border">
              <p className="font-medium mb-2">Account Blocked</p>
              <div className="flex items-center gap-2">
                {user.isBlocked ? (
                  <Badge className="bg-red-50 text-red-700 border-red-200">Blocked</Badge>
                ) : (
                  <>
                    <Check className="h-4 w-4 text-green-600" />
                    <Badge className="bg-green-50 text-green-700 border-green-200">Active</Badge>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
