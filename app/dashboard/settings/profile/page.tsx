"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CircleCheckBig, User, Mail, Eye, EyeOff } from "lucide-react";
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

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] =
    useState<PasswordValidation>({
      minLength: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialChar: false,
    });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordValidation(validatePassword(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValidPassword = Object.values(passwordValidation).every(
      (valid) => valid,
    );

    if (!isValidPassword) {
      console.log("Password does not meet all requirements");
      return;
    }

    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    console.log("Password:", password);
    setPassword("");
    setConfirmPassword("");
    setPasswordValidation({
      minLength: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialChar: false,
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Admin Details Section - Modern Design */}
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Account Settings</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your profile information and security
          </p>
        </div>

        <div className="space-y-4">
          {/* Name Field */}
          <div className="flex items-center gap-4 py-4 px-4 rounded-lg bg-gradient-to-r from-slate-50 to-transparent border border-slate-200/50 hover:border-slate-300 transition-colors">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Full Name
              </p>
              <p className="text-lg font-semibold text-foreground mt-1">
                {user?.name || "Guest"}
              </p>
            </div>
          </div>

          {/* Email Field */}
          <div className="flex items-center gap-4 py-4 px-4 rounded-lg bg-gradient-to-r from-slate-50 to-transparent border border-slate-200/50 hover:border-slate-300 transition-colors">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Mail className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Email Address
              </p>
              <p className="text-lg font-semibold text-foreground mt-1">
                {user?.email || "Not provided"}
              </p>
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      {/* Change Password Section */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Change Password</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password Field */}
          <div>
            <Label htmlFor="password" className="text-sm font-medium">
              New Password
            </Label>
            <div className="relative mt-2">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                onChange={handlePasswordChange}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <Label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm Password
            </Label>
            <div className="relative mt-2">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
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

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={
              !password ||
              !confirmPassword ||
              !Object.values(passwordValidation).every((valid) => valid) ||
              password !== confirmPassword
            }
          >
            Update Password
          </Button>
        </form>
      </Card>
    </div>
  );
}
