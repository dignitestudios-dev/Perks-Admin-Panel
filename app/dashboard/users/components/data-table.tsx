"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Eye,
  Pencil,
  Trash2,
  Download,
  Search,
  X,
  Loader2,
  Lock,
  Unlock,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { blockUserAPI } from "@/lib/api/block-user.api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface User {
  _id: string;
  name: string;
  username: string;
  profilePicture: string;
  uid: string;
  venmo: string;
  cashApp: string;
  isBlocked?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface DataTableProps {
  users: User[];
  onSearch: (searchValue: string) => void;
  searchValue: string;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions: number[];
  isLoading?: boolean;
  hideActions?: boolean;
  hideViewDetails?: boolean;
  hideBlockButton?: boolean;
  showBlockedUserContext?: boolean;
  onUnblockSuccess?: (userName: string) => void;
  onBlockSuccess?: () => void;
}

export function DataTable({
  users,
  onSearch,
  searchValue,
  currentPage,
  pageSize,
  totalPages,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions,
  isLoading = false,
  hideActions = false,
  hideViewDetails = false,
  hideBlockButton = false,
  showBlockedUserContext = false,
  onUnblockSuccess,
  onBlockSuccess,
}: DataTableProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [blockedUsers, setBlockedUsers] = useState<Record<string, boolean>>({});
  const [blockLoading, setBlockLoading] = useState<Record<string, boolean>>({});
  const [blockError, setBlockError] = useState<Record<string, string>>({});

  const handleBlockToggle = async (userId: string, shouldBlock: boolean, userName?: string) => {
    try {
      setBlockLoading((prev) => ({ ...prev, [userId]: true }));
      setBlockError((prev) => ({ ...prev, [userId]: "" }));

      // Optimistic update
      setBlockedUsers((prev) => ({ ...prev, [userId]: shouldBlock }));

      // API call
      await blockUserAPI.toggleBlock({
        blocked: userId,
        block: shouldBlock,
      });

      // Refetch both queries immediately to reflect changes
      await queryClient.refetchQueries({ queryKey: ["users"] });
      await queryClient.refetchQueries({ queryKey: ["blocked-users"] });

      // Show success message
      if (shouldBlock) {
        toast.success(`${userName || "User"} has been blocked`);
      } else {
        toast.success(`${userName || "User"} has been unblocked`);
      }

      // Trigger callback for unblock success
      if (!shouldBlock && onUnblockSuccess && userName) {
        onUnblockSuccess(userName);
      }

      // Trigger callback for block success
      if (shouldBlock && onBlockSuccess) {
        onBlockSuccess();
      }
    } catch (err: any) {
      // Revert optimistic update on error
      setBlockedUsers((prev) => ({ ...prev, [userId]: !shouldBlock }));
      setBlockError((prev) => ({
        ...prev,
        [userId]: err?.message || "Failed to update block status",
      }));
    } finally {
      setBlockLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const handlePageSizeChange = (value: string) => {
    const newPageSize = Number(value);
    onPageSizeChange(newPageSize);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-end gap-4">
        <div className="flex-1 space-y-2">
          <Label htmlFor="search-users" className="text-sm font-medium">
            Search
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="search-users"
              placeholder="Search by name, email, username..."
              value={searchValue}
              onChange={(e) => onSearch(e.target.value)}
              disabled={isLoading}
              className="pl-10"
            />
          </div>
        </div>
        {searchValue && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSearch("")}
            className="cursor-pointer h-10"
            disabled={isLoading}
          >
            <X className="mr-2 size-4" />
            Clear
          </Button>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Venmo</TableHead>
              <TableHead>Cash App</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              {!hideActions && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Show loading skeleton rows matching pageSize
              Array.from({ length: pageSize }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8" />
                      <Skeleton className="h-8 w-8" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : users.length ? (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell
                    className="cursor-pointer"
                    onClick={() => router.push(`/dashboard/users/${user._id}`)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        {user?.profilePicture ? (
                          <img
                            src={user.profilePicture}
                            alt={user?.name || "User"}
                            className="h-full w-full rounded-full object-cover"
                          />
                        ) : (
                          <AvatarFallback className="text-xs font-medium">
                            {(user?.name || "User").substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium hover:underline">
                          {user?.name || "Name not available"}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          @{user?.username || "unknown"}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{user.venmo || "-"}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{user.cashApp || "-"}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {new Date(user.updatedAt).toLocaleDateString()}
                    </span>
                  </TableCell>
                  {!hideActions && (
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {!hideViewDetails && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 cursor-pointer"
                            onClick={() =>
                              router.push(`/dashboard/users/${user._id}`)
                            }
                          >
                            <Eye className="size-4" />
                            <span className="sr-only">View user</span>
                          </Button>
                        )}
                        {!hideBlockButton && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className={`h-8 w-8 cursor-pointer ${
                                  (blockedUsers[user._id] ?? user.isBlocked)
                                    ? "text-red-600 hover:bg-red-50"
                                    : "hover:text-black hover:bg-gray-300"
                                }`}
                                disabled={blockLoading[user._id]}
                              >
                                {blockLoading[user._id] ? (
                                  <Loader2 className="size-4 animate-spin" />
                                ) : (blockedUsers[user._id] ?? user.isBlocked) ? (
                                  <Lock className="size-4" />
                                ) : (
                                  <Unlock className="size-4" />
                                )}
                                <span className="sr-only">Toggle block status</span>
                              </Button>
                            </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogTitle>
                              {showBlockedUserContext
                                ? "Unblock User?"
                                : (blockedUsers[user._id] ?? user.isBlocked)
                                  ? "Unblock User?"
                                  : "Block User?"}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              {showBlockedUserContext
                                ? `Unblock ${user.name} to allow them access to the platform again.`
                                : (blockedUsers[user._id] ?? user.isBlocked)
                                  ? `Are you sure you want to unblock ${user.name}? They will be able to access the platform again.`
                                  : `Are you sure you want to block ${user.name}? They won't be able to access the platform.`}
                            </AlertDialogDescription>
                            <div className="flex gap-4">
                              <AlertDialogCancel
                                disabled={blockLoading[user._id]}
                              >
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                disabled={blockLoading[user._id]}
                                className={
                                  showBlockedUserContext || (blockedUsers[user._id] ?? user.isBlocked)
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-red-600 hover:bg-red-700"
                                }
                                onClick={() =>
                                  handleBlockToggle(
                                    user._id,
                                    showBlockedUserContext ? false : !(blockedUsers[user._id] ?? user.isBlocked),
                                    user.name,
                                  )
                                }
                              >
                                {blockLoading[user._id] && (
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {showBlockedUserContext
                                  ? "Unblock"
                                  : (blockedUsers[user._id] ?? user.isBlocked)
                                    ? "Unblock"
                                    : "Block"}
                              </AlertDialogAction>
                            </div>
                          </AlertDialogContent>
                        </AlertDialog>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

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
              <ChevronLeft className="size-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextPage}
              disabled={currentPage >= totalPages || isLoading}
              className="cursor-pointer h-9 w-9"
            >
              <ChevronRight className="size-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
