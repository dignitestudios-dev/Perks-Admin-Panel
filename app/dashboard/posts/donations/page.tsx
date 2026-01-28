"use client"

import { DonationPosts } from "../components/donation-posts"

export default function DonationPostsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Donation Campaigns</h1>
        <p className="text-muted-foreground mt-2">
          Manage and monitor all active donation campaigns
        </p>
      </div>

      {/* Content */}
      <DonationPosts />
    </div>
  )
}
