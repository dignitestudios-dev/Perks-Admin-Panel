"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter, useSearchParams } from "next/navigation"
import { useNotifications, useCreateNotification } from "@/lib/hooks/useNotifications"
import { useDebounce } from "@/hooks/use-debounce"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Eye, Send, Plus, ChevronLeft, ChevronRight, Search, X, Loader2, Bell } from "lucide-react"
import { Notification } from "@/lib/api/notifications.api"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100]

const truncateText = (text: string, maxLength: number = 120): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + "..."
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function NotificationDetailDialog({
  notification,
  open,
  onOpenChange,
}: {
  notification: Notification | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  if (!notification) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header with Icon */}
        <div className="relative pt-4">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg" />
          <div className="relative px-6 py-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
                  <Bell className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-grow">
                <DialogTitle className="text-2xl font-bold text-foreground">
                  {notification.title}
                </DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Sent on {formatDate(notification.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 px-6 pb-6">
          {/* Description Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary" />
              <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">
                Description
              </h3>
            </div>
            <div className="bg-muted/40 rounded-lg p-4 border border-muted">
              <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                {notification.description}
              </p>
            </div>
          </div>

          {/* Metadata Section */}
          {notification.metaData && Object.keys(notification.metaData).length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary" />
                <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">
                  Metadata
                </h3>
              </div>
              <div className="bg-muted/40 rounded-lg p-4 border border-muted">
                <pre className="text-xs text-foreground overflow-auto max-h-48 font-mono">
                  {JSON.stringify(notification.metaData, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Timeline Section */}
          <div className="space-y-2 bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-lg p-4 border border-primary/20 dark:border-primary/30">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                Sent On
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              {new Date(notification.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-3 pt-2">
            <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white">
              ✓ Sent to all users
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function CreateNotificationDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const createNotification = useCreateNotification()

  const onSubmit = async (data: { title: string; description: string }) => {
    try {
      await createNotification.mutateAsync(data)
      toast.success("Notification created and sent successfully!")
      reset()
      onOpenChange(false)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create notification")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Notification</DialogTitle>
          <DialogDescription>
            Send a notification to all verified users on the platform
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Notification Title
            </Label>
            <Input
              id="title"
              placeholder="e.g., New Feature Released"
              {...register("title", {
                required: "Title is required",
                minLength: { value: 3, message: "Title must be at least 3 characters" },
                maxLength: { value: 100, message: "Title must not exceed 100 characters" },
              })}
              disabled={createNotification.isPending}
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter the full notification message..."
              rows={6}
              {...register("description", {
                required: "Description is required",
                minLength: { value: 10, message: "Description must be at least 10 characters" },
              })}
              disabled={createNotification.isPending}
            />
            {errors.description && (
              <p className="text-xs text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createNotification.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createNotification.isPending}
              className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            >
              {createNotification.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Notification
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function NotificationsTable({
  notifications,
  onViewDetails,
  isLoading,
  currentPage,
  pageSize,
  totalPages,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions,
}: {
  notifications: Notification[]
  onViewDetails: (notification: Notification) => void
  isLoading: boolean
  currentPage: number
  pageSize: number
  totalPages: number
  totalItems: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  pageSizeOptions: number[]
}) {
  const handlePageSizeChange = (value: string) => {
    const newPageSize = Number(value)
    onPageSizeChange(newPageSize)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className="w-full space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Sent On</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Show loading skeleton rows matching pageSize
              Array.from({ length: pageSize }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-64" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      <Skeleton className="h-8 w-8" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : notifications.length ? (
              notifications.map((notification) => (
                <TableRow key={notification._id}>
                  <TableCell className="font-medium max-w-xs">
                    {notification.title}
                  </TableCell>
                  <TableCell className="text-muted-foreground max-w-md">
                    {truncateText(notification.description, 60)}
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(notification.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary cursor-pointer"
                      onClick={() => onViewDetails(notification)}
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View notification</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No notifications found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center space-x-2">
          <Label htmlFor="page-size" className="text-sm font-medium">
            Show
          </Label>
          <Select
            value={pageSize.toString()}
            onValueChange={handlePageSizeChange}
            disabled={isLoading}
          >
            <SelectTrigger className="w-20 cursor-pointer" id="page-size">
              <SelectValue placeholder={pageSize.toString()} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">
            of {totalItems} total
          </span>
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="hidden sm:flex items-center space-x-2">
            <p className="text-sm font-medium">Page</p>
            <strong className="text-sm">
              {currentPage} of {totalPages}
            </strong>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePreviousPage}
              disabled={currentPage <= 1 || isLoading}
              className="cursor-pointer h-9 w-9"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextPage}
              disabled={currentPage >= totalPages || isLoading}
              className="cursor-pointer h-9 w-9"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NotificationsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize state from URL params
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchInput, setSearchInput] = useState("")
  const [isInitialized, setIsInitialized] = useState(false)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)

  // Initialize from URL params on mount
  useEffect(() => {
    const urlPage = searchParams.get("page")
    const urlPageSize = searchParams.get("pageSize")
    const urlSearch = searchParams.get("search")

    if (urlPage) setPage(parseInt(urlPage, 10) || 1)
    if (urlPageSize) setPageSize(parseInt(urlPageSize, 10) || 10)
    if (urlSearch) setSearchInput(decodeURIComponent(urlSearch))

    setIsInitialized(true)
  }, [searchParams])

  // Update URL when state changes
  const updateUrlParams = (newPage?: number, newPageSize?: number, newSearch?: string) => {
    const params = new URLSearchParams()

    const currentPage = newPage ?? page
    const currentPageSize = newPageSize ?? pageSize
    const currentSearch = newSearch ?? searchInput

    if (currentPage !== 1) params.set("page", currentPage.toString())
    if (currentPageSize !== 10) params.set("pageSize", currentPageSize.toString())
    if (currentSearch) params.set("search", encodeURIComponent(currentSearch))

    const queryString = params.toString()
    const newUrl = queryString ? `/dashboard/notifications?${queryString}` : "/dashboard/notifications"
    router.push(newUrl)
  }

  const debouncedSearch = useDebounce(searchInput, 500)

  const { data, isLoading, error } = useNotifications({
    page,
    limit: pageSize,
    filter: "all",
  })

  const notifications = data?.data || []
  const totalItems = data?.pagination?.totalCount || 0
  const totalPages = data?.pagination?.totalPages || 1

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    updateUrlParams(newPage, pageSize, searchInput)
  }

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize)
    setPage(1)
    updateUrlParams(1, newSize, searchInput)
  }

  const handleSearch = (value: string) => {
    setSearchInput(value)
    setPage(1)
    updateUrlParams(1, pageSize, value)
  }

  const handleViewDetails = (notification: Notification) => {
    setSelectedNotification(notification)
    setDetailDialogOpen(true)
  }

  if (!isInitialized) {
    return null
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading notifications</p>
          <p className="text-sm text-muted-foreground mt-2">
            {(error as any)?.message || "Please try again later"}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage push notifications for all verified users
          </p>
        </div>
        <Button
          onClick={() => setCreateDialogOpen(true)}
          className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
        >
          <Plus className="h-4 w-4" />
          Create Notification
        </Button>
      </div>

      {/* Notifications Table */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Sent Notifications</h2>
          <p className="text-sm text-muted-foreground mt-1">
            View and manage all notifications sent to users
          </p>
        </div>
        <NotificationsTable
          notifications={notifications}
          onViewDetails={handleViewDetails}
          isLoading={isLoading}
          currentPage={page}
          pageSize={pageSize}
          totalPages={totalPages}
          totalItems={totalItems}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSizeOptions={PAGE_SIZE_OPTIONS}
        />
      </div>

      {/* Create Notification Dialog */}
      <CreateNotificationDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />

      {/* Notification Detail Dialog */}
      <NotificationDetailDialog
        notification={selectedNotification}
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
      />
    </div>
  )
}
