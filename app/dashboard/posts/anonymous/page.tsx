"use client"

import { AnonymousPosts } from "../components/anonymous-posts"

export default function AnonymousPostsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Anonymous Posts</h1>
        <p className="text-muted-foreground mt-2">
          Manage all anonymous posts
        </p>
      </div>

      {/* Content */}
      <AnonymousPosts />
    </div>
  )
}
