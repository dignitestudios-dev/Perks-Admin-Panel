"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, CircleCheckBig } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authAPI } from "@/lib/api/auth.api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PasswordValidation {
  minLength: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  specialChar: boolean;
}

const validatePassword = (password: string): PasswordValidation => {
  return {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };
};

const PasswordValidator = ({ isValid }: { isValid: boolean }) => (
  <CircleCheckBig
    className={cn(
      "w-5 h-5 transition-colors duration-200",
      isValid ? "text-primary" : "text-gray-300",
    )}
  />
);

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [passwordValidation, setPasswordValidation] =
    useState<PasswordValidation>({
      minLength: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialChar: false,
    });
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Try to get reset token from URL first
    let token = searchParams.get("token");
    
    // If not in URL, try localStorage
    if (!token && typeof window !== "undefined") {
      token = localStorage.getItem("resetToken");
    }

    if (!token) {
      setError("Session expired. Please start the password reset process again.");
      setTimeout(() => router.push("/auth/forgot-password"), 2000);
    } else {
      setResetToken(token);
    }
  }, [router, searchParams]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordValidation(validatePassword(value));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const isValidPassword = Object.values(passwordValidation).every(
      (valid) => valid,
    );

    if (!isValidPassword) {
      setError("Password does not meet all requirements");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!resetToken) {
      setError("Session expired. Please start again.");
      return;
    }

    setIsLoading(true);
    try {
      await authAPI.resetPassword({ password }, resetToken);

      toast.success("Password reset successfully!");
      
      // Clear reset token from localStorage
      localStorage.removeItem("resetToken");
      // Clear email from session storage
      sessionStorage.removeItem("resetEmail");
      
      // Redirect to login
      router.push("/auth/login");
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to reset password";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!resetToken && error) {
    return (
      <div className="w-full max-w-md">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <p className="text-sm text-gray-600 mt-2">Redirecting to forgot password...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h2>
        <p className="text-gray-600">
          Enter your new password below
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={!showPassword ? "password" : "text"}
              placeholder="Enter your new password"
              value={password}
              onChange={handlePasswordChange}
              disabled={isLoading}
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={!showConfirmPassword ? "password" : "text"}
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              disabled={isLoading}
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Password Validation Checkpoints */}
        {password && (
          <div className="space-y-3 p-4 bg-muted rounded-lg border">
            <p className="text-sm font-semibold text-muted-foreground">
              Password Requirements:
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <PasswordValidator isValid={passwordValidation.minLength} />
                <span className="text-sm">Minimum 8 characters</span>
              </div>
              <div className="flex items-center gap-3">
                <PasswordValidator isValid={passwordValidation.uppercase} />
                <span className="text-sm">One uppercase letter (A-Z)</span>
              </div>
              <div className="flex items-center gap-3">
                <PasswordValidator isValid={passwordValidation.lowercase} />
                <span className="text-sm">One lowercase letter (a-z)</span>
              </div>
              <div className="flex items-center gap-3">
                <PasswordValidator isValid={passwordValidation.number} />
                <span className="text-sm">One number (0-9)</span>
              </div>
              <div className="flex items-center gap-3">
                <PasswordValidator isValid={passwordValidation.specialChar} />
                <span className="text-sm">
                  One special character (!@#$%^&*...)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Password Match Status */}
        {confirmPassword && password !== confirmPassword && (
          <div className="text-sm text-red-600 flex items-center gap-2">
            <span>Passwords do not match</span>
          </div>
        )}

        {confirmPassword && password === confirmPassword && (
          <div className="text-sm text-primary flex items-center gap-2">
            <CircleCheckBig className="w-4 h-4" />
            <span>Passwords match</span>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full" 
          disabled={
            !password ||
            !confirmPassword ||
            !Object.values(passwordValidation).every((valid) => valid) ||
            password !== confirmPassword ||
            isLoading
          }
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Resetting...
            </>
          ) : (
            "Reset Password"
          )}
        </Button>

        <div className="text-center">
          <Link href="/auth/login" className="text-sm text-primary hover:underline">
            Back to Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default function ResetPassword() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-md text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
