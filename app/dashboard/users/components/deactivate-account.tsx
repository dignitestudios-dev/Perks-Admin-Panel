"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"

interface DeactivateAccountProps {
  userId: number
  userStatus: string
}

export function DeactivateAccount({ userId, userStatus }: DeactivateAccountProps) {
  const [status, setStatus] = useState(userStatus)

  const isActive = status === "Active"

  const handleToggleStatus = () => {
    const newStatus = isActive ? "Inactive" : "Active"
    console.log(`[API CALL] Toggle user status: ${userId} - New Status: ${newStatus}`)
    setStatus(newStatus)
  }

  return (
    <div className="space-y-4">
      {/* Current Status Card */}
      <Card>
        <CardHeader>
          <CardTitle>Account Status</CardTitle>
          <CardDescription>Current status of this user account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Status</p>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className={
                    isActive
                      ? "text-green-600 bg-green-50"
                      : "text-red-600 bg-red-50"
                  }
                >
                  {isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
            {isActive && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Deactivate Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    Deactivate Account?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="space-y-4">
                    <p>
                      Are you sure you want to deactivate this account? This action will:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      <li>Prevent the user from logging in</li>
                      <li>Disable all API access</li>
                      <li>Keep all user data intact (can be reactivated)</li>
                      <li>Notify the user via email</li>
                    </ul>
                  </AlertDialogDescription>
                  <div className="flex gap-4">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleToggleStatus}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Deactivate
                    </AlertDialogAction>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            )}

            {!isActive && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Reactivate Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Reactivate Account?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="space-y-4">
                    <p>
                      Are you sure you want to reactivate this account? This action will:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      <li>Allow the user to login again</li>
                      <li>Restore all API access</li>
                      <li>Notify the user via email</li>
                    </ul>
                  </AlertDialogDescription>
                  <div className="flex gap-4">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleToggleStatus} className="bg-green-600 hover:bg-green-700">
                      Reactivate
                    </AlertDialogAction>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Account Info */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Account Created</p>
              <p className="text-base mt-1">December 1, 2023</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Login</p>
              <p className="text-base mt-1">January 26, 2024</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Account Type</p>
              <p className="text-base mt-1">Premium User</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
          <CardDescription className="text-red-600">
            Irreversible actions that permanently affect this account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-red-700">
            Permanently delete this account and all associated data. This action cannot be undone.
          </p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Permanently Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                Permanently Delete Account?
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-4">
                <p className="font-semibold text-red-600">
                  This action cannot be undone. This will permanently delete the account
                  and remove all associated data.
                </p>
                <p>Please type "DELETE" to confirm:</p>
                <input
                  type="text"
                  placeholder="Type DELETE to confirm"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </AlertDialogDescription>
              <div className="flex gap-4">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    console.log(
                      `[API CALL] Permanently delete user account: ${userId}`
                    )
                  }}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete Permanently
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  )
}
