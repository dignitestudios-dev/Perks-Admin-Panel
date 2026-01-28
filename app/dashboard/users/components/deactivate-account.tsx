"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { blockUserAPI } from "@/lib/api/block-user.api";
import type { UserDetail } from "@/lib/api/user-details.api";

interface DeactivateAccountProps {
  user: UserDetail;
  onBlockStatusChange?: (isBlocked: boolean) => void;
}

export function DeactivateAccount({ user, onBlockStatusChange }: DeactivateAccountProps) {
  const [isBlocked, setIsBlocked] = useState(user.isBlocked);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBlockToggle = async (shouldBlock: boolean) => {
    try {
      setIsLoading(true);
      setError(null);

      // Optimistic update
      setIsBlocked(shouldBlock);

      // API call
      await blockUserAPI.toggleBlock({
        blocked: user._id,
        block: shouldBlock,
      });

      // Notify parent component if callback provided
      onBlockStatusChange?.(shouldBlock);
    } catch (err: any) {
      // Revert optimistic update on error
      setIsBlocked(!shouldBlock);
      setError(err?.message || "Failed to update block status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 rounded-lg border border-primary/30 bg-primary/10 text-primary text-sm">
          {error}
        </div>
      )}

      {/* Account Status Card */}
      <Card className="border border-primary/10 shadow-lg pt-0">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/[0.02] border-b border-primary/10 rounded-t-lg pt-6">
          <CardTitle className="text-primary text-xl">Current Account Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-lg border border-primary/10 bg-gradient-to-r from-primary/[0.03] to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium mb-2">Account Status</p>
                <p className="text-sm text-muted-foreground">
                  {isBlocked ? "User cannot access the platform" : "User has full access"}
                </p>
              </div>
              <Badge
                className={
                  isBlocked
                    ? "bg-primary/20 text-primary border-primary/30"
                    : "bg-primary/20 text-primary border-primary/30"
                }
              >
                {isBlocked ? "Blocked" : "Active"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      {isBlocked && (
        <Card className="border border-primary/10 bg-gradient-to-br from-primary/5 to-primary/[0.02] pt-0">
          <CardHeader className="bg-red-600 border-b border-primary/10 rounded-t-lg pt-6">
            <CardTitle className="text-white flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Account Blocked
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-primary">
              This account is currently blocked and the user cannot access the platform.
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 hover:text-primary cursor-pointer" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Unblock Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Unblock Account?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <p>Are you sure you want to unblock this account?</p>
                  <p className="mt-2 text-sm">The user will be able to access the platform again.</p>
                </AlertDialogDescription>
                <div className="flex gap-4">
                  <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isLoading}
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white"
                    onClick={() => handleBlockToggle(false)}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Unblock Account
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      )}

      {!isBlocked && (
        <Card className="border border-primary/10 bg-gradient-to-br from-primary/5 to-primary/[0.02] pt-0">
          <CardHeader className="bg-red-600 border-b border-primary/10 rounded-t-lg pt-6">
            <CardTitle className="text-white flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Block this account to prevent the user from accessing the platform. All their data will be preserved.
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Block Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  Block Account?
                </AlertDialogTitle>
                <AlertDialogDescription className="space-y-4">
                  <p>
                    Are you sure you want to block this account? This action will:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Prevent the user from logging in</li>
                    <li>Disable all API access</li>
                    <li>Keep all user data intact</li>
                    <li>Can be reversed anytime</li>
                  </ul>
                </AlertDialogDescription>
                <div className="flex gap-4">
                  <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isLoading}
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => handleBlockToggle(true)}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Block Account
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
