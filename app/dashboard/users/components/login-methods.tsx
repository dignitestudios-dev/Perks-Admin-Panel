"use client"

import { useState } from "react"
import { Check, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface LoginMethod {
  id: string
  provider: "email" | "google" | "apple"
  email?: string
  connectedDate: string
  isDefault: boolean
  lastUsed: string
}

interface LoginMethodsProps {
  userId: number
}

const mockLoginMethods: LoginMethod[] = [
  {
    id: "1",
    provider: "email",
    email: "user@example.com",
    connectedDate: "2023-12-01",
    isDefault: true,
    lastUsed: "2024-01-26",
  },
  {
    id: "2",
    provider: "google",
    email: "user.name@gmail.com",
    connectedDate: "2024-01-10",
    isDefault: false,
    lastUsed: "2024-01-20",
  },
  {
    id: "3",
    provider: "apple",
    email: "user@icloud.com",
    connectedDate: "2024-01-15",
    isDefault: false,
    lastUsed: "2024-01-22",
  },
]

export function LoginMethods({ userId }: LoginMethodsProps) {
  const [methods, setMethods] = useState<LoginMethod[]>(mockLoginMethods)

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case "google":
        return "text-blue-600 bg-blue-50"
      case "apple":
        return "text-gray-600 bg-gray-50"
      case "email":
        return "text-purple-600 bg-purple-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case "google":
        return "🔵"
      case "apple":
        return "🍎"
      case "email":
        return "✉️"
      default:
        return "•"
    }
  }

  const handleSetDefault = (methodId: string) => {
    console.log(`[API CALL] Set default login method: ${methodId}`)
    setMethods(
      methods.map((method) => ({
        ...method,
        isDefault: method.id === methodId,
      }))
    )
  }

  const handleDisconnect = (methodId: string, provider: string) => {
    console.log(`[API CALL] Disconnect ${provider} login method: ${methodId}`)
    setMethods(methods.filter((method) => method.id !== methodId))
  }

  const handleAddLoginMethod = () => {
    console.log(`[API CALL] Add new login method for user: ${userId}`)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Login & Sign Up Methods</CardTitle>
              <CardDescription>
                Manage authentication methods for this user
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleAddLoginMethod}>
              <Plus className="mr-2 h-4 w-4" />
              Add Method
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {methods.length === 0 ? (
            <div className="text-center py-12">
              <X className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No login methods connected</p>
            </div>
          ) : (
            <div className="space-y-3">
              {methods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-2xl">{getProviderIcon(method.provider)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium capitalize">{method.provider}</p>
                        {method.isDefault && (
                          <Badge variant="secondary" className="bg-green-50 text-green-600">
                            Default
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{method.email}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <span>Connected {new Date(method.connectedDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>Last used {new Date(method.lastUsed).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {!method.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetDefault(method.id)}
                        className="cursor-pointer"
                      >
                        Set Default
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDisconnect(method.id, method.provider)}
                      className="cursor-pointer"
                    >
                      Disconnect
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Info */}
      <Card>
        <CardHeader>
          <CardTitle>Security Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-600" />
              <span className="text-sm">Email verification: Confirmed</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-600" />
              <span className="text-sm">Two-factor authentication: Disabled</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-600" />
              <span className="text-sm">Password last changed: 45 days ago</span>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4">
            Force Password Reset
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
