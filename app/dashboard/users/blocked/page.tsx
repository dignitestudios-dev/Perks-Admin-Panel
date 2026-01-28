"use client"

import { useEffect, useState } from "react"
import { useUsers } from "@/lib/hooks/useUsers"
import { useDebounce } from "@/hooks/use-debounce"
import { DataTable } from "../components/data-table"

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100]

export default function BlockedUsersPage() {
  // Initialize state
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchInput, setSearchInput] = useState("")
  const [isInitialized, setIsInitialized] = useState(true)

  const debouncedSearch = useDebounce(searchInput, 500)

  // request blocked users from hook if supported, otherwise fetch all and filter
  const { data, isLoading, error } = (useUsers as any)({
    page,
    limit: pageSize,
    search: debouncedSearch,
    blocked: true,
  })

  const users = data?.data || []
  const pagination = data?.pagination

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize)
    setPage(1)
  }

  const handleSearch = (value: string) => {
    setSearchInput(value)
    setPage(1)
  }

  if (!isInitialized) return null

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading blocked users</p>
          <p className="text-sm text-muted-foreground mt-2">
            {(error as any)?.message || "Please try again later"}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="px-4 lg:px-6">
        <h2 className="text-lg font-semibold">Blocked Users</h2>
        <p className="text-sm text-muted-foreground">List of users currently blocked.</p>
      </div>

      <div className="px-4 lg:px-6">
        <DataTable
          users={users}
          onSearch={handleSearch}
          searchValue={searchInput}
          currentPage={page}
          pageSize={pageSize}
          totalPages={pagination?.totalPages || 1}
          totalItems={pagination?.totalItems || 0}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          isLoading={isLoading}
          hideActions={true}
        />
      </div>
    </div>
  )
}
