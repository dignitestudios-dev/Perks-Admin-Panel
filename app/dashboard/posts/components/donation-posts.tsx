"use client";

import { useState } from "react";
import Image from "next/image";
import { usePosts } from "@/lib/hooks/usePosts";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Image as ImageIcon,
  Search,
  Calendar,
  Heart,
  MessageCircle,
  Eye,
} from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";

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

const getProgressPercentage = (raised: number, goal: number) => {
  return Math.min((raised / goal) * 100, 100);
};

interface DonationPostDetail {
  _id: string;
  title: string;
  description: string;
  tagline: string;
  amount: number;
  amountRaised: number;
  user: {
    _id: string;
    name: string;
    username: string;
    profilePicture: string;
  };
  media: string[];
  likes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
}

function DonationDetailDialog({
  post,
  open,
  onOpenChange,
}: {
  post: DonationPostDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  if (!post) return null;

  const progressPercent = getProgressPercentage(post.amountRaised, post.amount);
  const hasMedia = post.media && post.media.length > 0;

  const nextImage = () => {
    if (hasMedia) {
      setSlideDirection('left');
      setCurrentImageIndex((prev) => (prev + 1) % post.media.length);
    }
  };

  const prevImage = () => {
    if (hasMedia) {
      setSlideDirection('right');
      setCurrentImageIndex((prev) => (prev - 1 + post.media.length) % post.media.length);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-0">
          <DialogTitle className="text-3xl font-bold">Donation Campaign Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Carousel */}
          {hasMedia && (
            <div className="space-y-4">
              <div className="relative h-96 bg-linear-to-br from-primary/10 to-primary/5 rounded-xl overflow-hidden shadow-lg border border-primary/10">
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
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
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

          {/* Title and Tagline */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">{post.title}</h2>
            {post.tagline && (
              <p className="text-sm text-muted-foreground italic">{post.tagline}</p>
            )}
          </div>

          {/* Donation Progress Card */}
          <Card className="border border-primary/10  shadow-lg">
            <CardContent>
              <div className="bg-linear-to-r from-primary/10 to-primary/5 px-6 py-4 -mx-6 -mt-6 mb-4 rounded-t-lg">
                <h3 className="font-semibold text-primary text-lg">Donation Progress</h3>
              </div>
              <div className="space-y-4">
                {/* Amount Display */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Raised</p>
                    <p className="text-2xl font-bold mt-2 bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      ${post.amountRaised.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Goal</p>
                    <p className="text-2xl font-bold mt-2 bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      ${post.amount.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Progress</span>
                    <span className="text-sm font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      {progressPercent.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-3 bg-primary/10 rounded-full overflow-hidden border border-primary/20">
                    <div
                      className="h-full bg-linear-to-r from-primary to-primary/80 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(progressPercent, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Creator Info */}
          {post.user && (
            <Card className="border border-primary/10  shadow-lg ">
              <CardContent className="">
                <div className="bg-linear-to-r from-primary/10 to-primary/5 px-6 py-4 -mx-6 -mt-6 mb-4 rounded-t-lg">
                  <h3 className="font-semibold text-primary text-lg">Campaign Creator</h3>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-primary/10 shrink-0">
                    {post.user.profilePicture ? (
                      <Image
                        src={post.user.profilePicture}
                        alt={post.user.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">
                          {post.user.name.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{post.user.name}</p>
                    <p className="text-sm text-muted-foreground">@{post.user.username}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats Summary Cards */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="border border-primary/10  hover:shadow-lg transition-shadow">
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-primary" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Likes</span>
                  </div>
                  <p className="text-2xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">{post.likes || 0}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-primary/10  hover:shadow-lg transition-shadow">
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-primary" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Comments</span>
                  </div>
                  <p className="text-2xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">{post.comments || 0}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-primary/10  hover:shadow-lg transition-shadow">
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-primary" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Media</span>
                  </div>
                  <p className="text-2xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">{post.media?.length || 0}</p>
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
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function DonationPosts() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [selectedPost, setSelectedPost] = useState<DonationPostDetail | null>(
    null,
  );
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const debouncedSearch = useDebounce(searchInput, 500);

  const { data, isLoading, error } = usePosts({
    type: "donation",
    page,
    limit: pageSize,
    search: debouncedSearch,
  });

  const posts = data?.data || [];
  const pagination = data?.pagination;

  const handleViewDetails = (post: any) => {
    setSelectedPost(post);
    setDetailDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search donation campaigns..."
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            setPage(1);
          }}
          className="pl-10"
        />
      </div>

      {/* Posts Grid */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-2 w-full" />
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
              <p className="text-muted-foreground">No donation campaigns found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {posts.map((post: any) => {
              const progressPercent = getProgressPercentage(
                post.amountRaised,
                post.amount,
              );

              return (
                <Card
                  key={post._id}
                  className="overflow-hidden border border-primary/10 hover:shadow-lg transition-all cursor-pointer flex flex-col h-full group"
                  onClick={() => handleViewDetails(post)}
                >
                  {/* Media Container */}
                  <div className="relative h-48 bg-linear-to-br from-primary/10 to-primary/5 overflow-hidden shrink-0">
                    {post.media && post.media.length > 0 ? (
                      <Image
                        src={post.media[0]}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-linear-to-br from-primary/5 to-transparent">
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
                    {/* Title and Tagline */}
                    <div>
                      <h3 className="text-sm font-semibold line-clamp-2 mb-1 text-foreground">
                        {post.title}
                      </h3>
                      {post.tagline && (
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {post.tagline}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {post.description}
                    </p>

                    {/* Creator Info */}
                    {post.user && (
                      <div className="flex items-center gap-2 pb-3 border-b border-primary/10">
                        <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0">
                          {post.user.profilePicture ? (
                            <Image
                              src={post.user.profilePicture}
                              alt={post.user.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                              {post.user.name.substring(0, 2).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">
                            {post.user.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            @{post.user.username}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Donation Progress */}
                    <div className="space-y-2 grow">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                          ${post.amountRaised.toFixed(0)}
                        </span>
                        <span className="text-muted-foreground">
                          ${post.amount.toFixed(0)} goal
                        </span>
                      </div>
                      <div className="h-2 bg-primary/10 rounded-full overflow-hidden border border-primary/20">
                        <div
                          className="h-full bg-linear-to-r from-primary to-primary/80"
                          style={{ width: `${Math.min(progressPercent, 100)}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{progressPercent.toFixed(0)}% funded</span>
                      </div>
                    </div>

                    {/* Stats Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-primary/10 mt-auto">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3 text-primary" />
                          <span className="text-xs font-semibold">{post.likes || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3 text-primary" />
                          <span className="text-xs font-semibold">{post.comments || 0}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(post);
                        }}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Dialog */}
      <DonationDetailDialog
        post={selectedPost}
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
      />

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Page size:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
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
              Page {page} of {pagination.totalPages} ({pagination.totalItems}{" "}
              total)
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
  );
}
