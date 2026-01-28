"use client"

import { useState } from "react"
import { usePosts } from "@/lib/hooks/usePosts"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Image as ImageIcon,
  Search,
  Calendar,
  Eye,
} from "lucide-react"
import Image from "next/image"
import { useDebounce } from "@/hooks/use-debounce"

const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return "Just now"
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`

  return date.toLocaleDateString()
}

interface AnonymousPostDetail {
  _id: string
  description: string
  media: string[]
  likes: number
  comments: number
  createdAt: string
  updatedAt: string
}

function PostDetailDialog({ post, open, onOpenChange }: { post: AnonymousPostDetail | null; open: boolean; onOpenChange: (open: boolean) => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right')
  if (!post) return null

  const hasMedia = post.media && post.media.length > 0

  const nextImage = () => {
    if (hasMedia) {
      setSlideDirection('left')
      setCurrentImageIndex((prev) => (prev + 1) % post.media.length)
    }
  }

  const prevImage = () => {
    if (hasMedia) {
      setSlideDirection('right')
      setCurrentImageIndex((prev) => (prev - 1 + post.media.length) % post.media.length)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-0">
          <DialogTitle className="text-3xl font-bold">Post Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Carousel */}
          {hasMedia && (
            <div className="space-y-4">
              <div className="relative h-96 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl overflow-hidden shadow-lg border border-primary/10">
                <div className="relative h-full w-full overflow-hidden bg-muted/50">
                  <Image
                    src={post.media[currentImageIndex]}
                    alt="Post carousel"
                    fill
                    className={`object-contain ${
                      slideDirection === 'left' ? 'slide-in-left' : 'slide-in-right'
                    }`}
                    key={currentImageIndex}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                    }}
                  />
                </div>

                {/* Carousel Controls */}
                {post.media.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary/90 hover:bg-primary rounded-full p-2 transition-all z-10 text-white"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary/90 hover:bg-primary rounded-full p-2 transition-all z-10 text-white"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Carousel Indicators */}
              {post.media.length > 1 && (
                <div className="flex items-center justify-center gap-2">
                  {post.media.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentImageIndex ? "bg-primary w-8" : "bg-primary/30 w-2"
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Image Counter */}
              {post.media.length > 1 && (
                <div className="text-center text-sm font-medium text-primary">
                  {currentImageIndex + 1} / {post.media.length}
                </div>
              )}
            </div>
          )}

          {/* Stats Summary Cards */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="border border-primary/10 bg-gradient-to-br from-primary/5 to-primary/[0.02] hover:shadow-lg transition-shadow">
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-primary" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Likes</span>
                  </div>
                  <p className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{post.likes}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-primary/10 bg-gradient-to-br from-primary/5 to-primary/[0.02] hover:shadow-lg transition-shadow">
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-primary" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Comments</span>
                  </div>
                  <p className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{post.comments}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-primary/10 bg-gradient-to-br from-primary/5 to-primary/[0.02] hover:shadow-lg transition-shadow">
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-primary" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Media</span>
                  </div>
                  <p className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{post.media?.length || 0}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Description Section */}
          <Card className="border border-primary/10 shadow-lg ">
            <CardContent className=" space-y-3">
              <div className="bg-linear-to-r from-primary/5 to-primary/2 border-b border-primary/10 px-6 py-4 -mx-6 -mt-6 mb-4">
                <h3 className="font-semibold text-primary text-lg">Description</h3>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{post.description}</p>
            </CardContent>
          </Card>

          {/* Timestamps Section */}
          <Card className="border border-primary/10 shadow-lg ">
            <CardContent className=" space-y-3">
              <div className="bg-linear-to-r from-primary/5 to-primary/2 border-b border-primary/10 px-6 py-4 -mx-6 -mt-6 mb-4">
                <h3 className="font-semibold text-primary text-lg">Timeline</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 rounded-lg bg-linear-to-r from-primary/3 to-transparent border border-primary/10">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Created</span>
                  </div>
                  <span className="font-medium text-foreground">
                    {new Date(post.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-linear-to-r from-primary/3 to-transparent border border-primary/10">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Last Updated</span>
                  </div>
                  <span className="font-medium text-foreground">
                    {new Date(post.updatedAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Creator Info Section */}
          <Card className="border border-primary/10 bg-gradient-to-br from-primary/5 to-primary/[0.02] shadow-lg ">
            <CardContent className="">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-4 -mx-6 -mt-6 mb-4 rounded-t-lg">
                <h3 className="font-semibold text-primary text-lg">Creator</h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">👤</span>
                </div>
                <div>
                  <p className="font-medium">Anonymous User</p>
                  <p className="text-sm text-muted-foreground">This post was created anonymously</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function AnonymousPosts() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchInput, setSearchInput] = useState("")
  const [selectedPost, setSelectedPost] = useState<AnonymousPostDetail | null>(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)

  const debouncedSearch = useDebounce(searchInput, 500)

  const { data, isLoading, error } = usePosts({
    type: "post",
    page,
    limit: pageSize,
    search: debouncedSearch,
  })

  const posts = data?.data || []
  const pagination = data?.pagination

  const handleViewDetails = (post: any) => {
    setSelectedPost(post)
    setDetailDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search posts..."
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value)
            setPage(1)
          }}
          className="pl-10"
        />
      </div>

      {/* Posts Grid */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <Skeleton className="h-48 w-full mb-4 rounded-lg" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card className="border-destructive">
            <CardContent className="p-6 text-center">
              <p className="text-destructive">{error.message}</p>
            </CardContent>
          </Card>
        ) : posts.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">No posts found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <Card
                key={post._id}
                className="overflow-hidden border border-primary/10 hover:shadow-lg transition-all cursor-pointer flex flex-col h-full group"
                onClick={() => handleViewDetails(post)}
              >
                {/* Media Container */}
                <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden shrink-0">
                  {post.media && post.media.length > 0 ? (
                    <Image
                      src={post.media[0]}
                      alt="Post media"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = "none"
                      }}
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-transparent">
                      <ImageIcon className="h-8 w-8 text-primary/40" />
                    </div>
                  )}
                  {/* Media Count Badge */}
                  {post.media && post.media.length > 0 && (
                    <Badge className="absolute top-2 right-2 bg-primary/90 text-white border-0">
                      {post.media.length} {post.media.length === 1 ? 'image' : 'images'}
                    </Badge>
                  )}
                </div>

                <CardContent className="p-4 space-y-3 flex flex-col grow">
                  {/* Description */}
                  <div className="grow">
                    <p className="text-sm text-foreground line-clamp-2 leading-relaxed">
                      {post.description}
                    </p>
                  </div>

                  {/* Meta Row */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-medium">{getRelativeTime(post.createdAt)}</span>
                    <Badge variant="outline" className="text-xs border-primary/20 text-primary bg-primary/5">
                      Anonymous
                    </Badge>
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center justify-between pt-3 border-t border-primary/10">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex items-center gap-1.5">
                        <Heart className="h-4 w-4 text-primary" />
                        <span className="text-xs font-semibold text-foreground">{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MessageCircle className="h-4 w-4 text-primary" />
                        <span className="text-xs font-semibold text-foreground">{post.comments}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleViewDetails(post)
                      }}
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Detail Dialog */}
      <PostDetailDialog
        post={selectedPost}
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
      />

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Page size:
            </span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
                setPage(1)
              }}
              className="h-8 px-2 border rounded text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Page {page} of {pagination.totalPages} ({pagination.totalItems} total)
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPage((p) => Math.min(pagination.totalPages, p + 1))
                }
                disabled={page === pagination.totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
