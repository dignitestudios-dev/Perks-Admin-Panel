"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { useUsers } from "@/lib/hooks/useUsers"
import { useDebounce } from "@/hooks/use-debounce"
import { StatCards } from "./components/stat-cards"
import { DataTable } from "./components/data-table"

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100]

export default function UsersPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  // Invalidate users data when component mounts for fresh data
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["users"] })
  }, [])

  // Initialize state from URL params
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchInput, setSearchInput] = useState("")
  const [isInitialized, setIsInitialized] = useState(false)

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
    const newUrl = queryString ? `/dashboard/users?${queryString}` : "/dashboard/users"
    router.push(newUrl)
  }

  const debouncedSearch = useDebounce(searchInput, 500)

  const { data, isLoading, error } = useUsers({
    page,
    limit: pageSize,
    search: debouncedSearch,
  });

  // Use backend data directly - no mapping, no dummy values
  const users = data?.data || [];
  const totalItems = data?.pagination.totalItems || 0;

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

  if (!isInitialized) {
    return null
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading users</p>
          <p className="text-sm text-muted-foreground mt-2">
            {(error as any)?.message || "Please try again later"}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Stats Section */}
      <div className="px-4 lg:px-6">
        <StatCards totalUsers={totalItems} />
      </div>

      {/* Data Table Section */}
      <div className="px-4 lg:px-6">
        <DataTable
          users={users}
          onSearch={handleSearch}
          searchValue={searchInput}
          currentPage={page}
          pageSize={pageSize}
          totalPages={data?.pagination.totalPages || 1}
          totalItems={totalItems}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
