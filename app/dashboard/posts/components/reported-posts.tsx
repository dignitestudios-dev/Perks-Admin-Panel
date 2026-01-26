"use client"

import { useState } from "react"
import {
  Trash2,
  AlertCircle,
  User,
  MoreVertical,
  MessageCircle,
  MessageSquare,
  Shield,
} from "lucide-react"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ReportedContent {
  id: string
  type: "post" | "comment"
  contentId: string
  author: string
  content: string
  reason: string
  description: string
  reportedBy: string
  reportedDate: string
  status: "pending" | "reviewed" | "action_taken"
}

const mockReportedContent: ReportedContent[] = [
  {
    id: "1",
    type: "post",
    contentId: "post-123",
    author: "john_doe",
    content: "This content contains inappropriate language and violence...",
    reason: "Hate Speech",
    description: "Post contains hateful comments targeting a specific group.",
    reportedBy: "sarah_smith",
    reportedDate: "2024-01-26T15:30:00",
    status: "pending",
  },
  {
    id: "2",
    type: "comment",
    contentId: "comment-456",
    author: "user_xyz",
    content: "Great article! Thanks for sharing this information.",
    reason: "Spam",
    description: "Comment appears to be promotional spam.",
    reportedBy: "admin_user",
    reportedDate: "2024-01-26T14:15:00",
    status: "reviewed",
  },
  {
    id: "3",
    type: "post",
    contentId: "post-789",
    author: "jane_dev",
    content: "Check out this amazing opportunity...",
    reason: "Scam/Fraud",
    description: "Post appears to be a phishing attempt or scam.",
    reportedBy: "security_team",
    reportedDate: "2024-01-26T12:45:00",
    status: "action_taken",
  },
  {
    id: "4",
    type: "comment",
    contentId: "comment-101",
    author: "user_abc",
    content: "Personal attack comment on another user...",
    reason: "Harassment",
    description: "Comment contains personal attacks and harassment.",
    reportedBy: "victim_user",
    reportedDate: "2024-01-25T10:20:00",
    status: "pending",
  },
  {
    id: "5",
    type: "post",
    contentId: "post-202",
    author: "user_def",
    content: "Graphic violent content warning...",
    reason: "Violent Content",
    description: "Post contains graphic violent imagery.",
    reportedBy: "mod_team",
    reportedDate: "2024-01-25T08:00:00",
    status: "action_taken",
  },
]

const reportReasons = [
  "All",
  "Hate Speech",
  "Spam",
  "Scam/Fraud",
  "Harassment",
  "Violent Content",
  "Misinformation",
  "Sexual Content",
]

const contentTypes = ["All", "post", "comment"]

export function ReportedPosts() {
  const [reports, setReports] = useState<ReportedContent[]>(mockReportedContent)
  const [filterType, setFilterType] = useState("All")
  const [filterReason, setFilterReason] = useState("All")

  const filteredReports = reports.filter((report) => {
    const typeMatch = filterType === "All" || report.type === filterType
    const reasonMatch = filterReason === "All" || report.reason === filterReason
    return typeMatch && reasonMatch
  })

  const getTypeColor = (type: string) => {
    return type === "post"
      ? "text-blue-600 bg-blue-50"
      : "text-purple-600 bg-purple-50"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-orange-600 bg-orange-50"
      case "reviewed":
        return "text-blue-600 bg-blue-50"
      case "action_taken":
        return "text-green-600 bg-green-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending Review"
      case "reviewed":
        return "Reviewed"
      case "action_taken":
        return "Action Taken"
      default:
        return status
    }
  }

  const handleDeleteContent = (contentId: string, contentType: string) => {
    console.log(`[API CALL] Delete ${contentType}: ${contentId}`)
    // Remove the report from the list
    setReports(reports.filter((report) => report.contentId !== contentId))
  }

  const handleWarnUser = (author: string) => {
    console.log(`[API CALL] Send warning to user: ${author}`)
  }

  const handleMarkAsReviewed = (reportId: string) => {
    console.log(`[API CALL] Mark report as reviewed: ${reportId}`)
    setReports(
      reports.map((report) =>
        report.id === reportId
          ? { ...report, status: "reviewed" }
          : report
      )
    )
  }

  const handleTakeAction = (reportId: string, contentId: string) => {
    console.log(`[API CALL] Take action on report ${reportId} for content ${contentId}`)
    setReports(
      reports.map((report) =>
        report.id === reportId
          ? { ...report, status: "action_taken" }
          : report
      )
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle>Reported Posts & Comments</CardTitle>
          <CardDescription>
            {reports.length} total reports • {reports.filter(r => r.status === "pending").length} pending
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Filters */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Filter by Type</label>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              {contentTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Filter by Reason</label>
          <Select value={filterReason} onValueChange={setFilterReason}>
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="Select Reason" />
            </SelectTrigger>
            <SelectContent>
              {reportReasons.map((reason) => (
                <SelectItem key={reason} value={reason}>
                  {reason}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reports List */}
      {filteredReports.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No reports found matching your filters</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <Card
              key={report.id}
              className={`hover:shadow-md transition-shadow border-l-4 ${
                report.status === "pending"
                  ? "border-l-orange-500"
                  : report.status === "reviewed"
                    ? "border-l-blue-500"
                    : "border-l-green-500"
              }`}
            >
              <CardContent className="pt-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {report.type === "post" ? (
                        <MessageSquare className="h-4 w-4" />
                      ) : (
                        <MessageCircle className="h-4 w-4" />
                      )}
                      <Badge variant="secondary" className={getTypeColor(report.type)}>
                        {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                      </Badge>
                      <Badge variant="secondary" className={getStatusColor(report.status)}>
                        {getStatusLabel(report.status)}
                      </Badge>
                    </div>
                    <Badge variant="destructive" className="bg-red-100 text-red-700">
                      <AlertCircle className="mr-1 h-3 w-3" />
                      {report.reason}
                    </Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {report.status === "pending" && (
                        <>
                          <DropdownMenuItem
                            onClick={() => handleMarkAsReviewed(report.id)}
                            className="cursor-pointer"
                          >
                            Mark as Reviewed
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleTakeAction(report.id, report.contentId)
                            }
                            className="cursor-pointer text-green-600"
                          >
                            <Shield className="mr-2 h-4 w-4" />
                            Take Action
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuItem
                        onClick={() => handleWarnUser(report.author)}
                        className="cursor-pointer"
                      >
                        <AlertCircle className="mr-2 h-4 w-4" />
                        Warn User
                      </DropdownMenuItem>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            className="cursor-pointer text-red-600"
                            onSelect={(e) => e.preventDefault()}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Content
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogTitle>Delete This {report.type}?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to permanently delete this {report.type}? This
                            action cannot be undone.
                          </AlertDialogDescription>
                          <div className="flex gap-4">
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleDeleteContent(report.contentId, report.type)
                              }
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

                {/* Author Info */}
                <div className="mb-4 flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">By {report.author}</span>
                </div>

                {/* Content */}
                <div className="mb-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm italic text-muted-foreground">"{report.content}"</p>
                </div>

                {/* Report Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Report Reason
                    </p>
                    <p className="text-sm font-medium">{report.reason}</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Reported By
                    </p>
                    <p className="text-sm font-medium">{report.reportedBy}</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Report Date
                    </p>
                    <p className="text-sm">
                      {new Date(report.reportedDate).toLocaleDateString()} at{" "}
                      {new Date(report.reportedDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Description
                    </p>
                    <p className="text-sm">{report.description}</p>
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
