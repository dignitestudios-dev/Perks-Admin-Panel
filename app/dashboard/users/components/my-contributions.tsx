"use client";

import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Tip, UserDetail } from "@/lib/api/user-details.api";

interface MyContributionsProps {
  user: UserDetail;
}

export function MyContributions({ user }: MyContributionsProps) {
  const contributions = user.myContributions || [];

  if (contributions.length === 0) {
    return (
      <Card className="border border-primary/10 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/[0.02] border-b border-primary/10 rounded-t-lg">
          <CardTitle className="text-primary text-xl">
            My Contributions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No contributions yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalContributed = contributions.reduce(
    (sum, tip) => sum + tip.amount,
    0,
  );
  const totalFees = contributions.reduce(
    (sum, tip) => sum + (tip.appFee + tip.stripeFee),
    0,
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-primary/10 bg-gradient-to-br from-primary/5 to-primary/[0.02] shadow-lg hover:shadow-sm transition-shadow">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Total Contributed
                </p>
              </div>
              <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                ${totalContributed.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-primary/10 bg-gradient-to-br from-primary/5 to-primary/[0.02] shadow-lg hover:shadow-sm transition-shadow">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Total Fees
                </p>
              </div>
              <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                ${totalFees.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-primary/10 bg-gradient-to-br from-primary/5 to-primary/[0.02] shadow-lg hover:shadow-sm transition-shadow">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Transactions
                </p>
              </div>
              <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {contributions.length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contributions List */}
      <Card className="border border-primary/10 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/[0.02] border-b border-primary/10 rounded-t-lg">
          <CardTitle className="text-primary text-xl">
            Recent Tips Sent
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contributions.map((tip) => (
              <div
                key={tip._id}
                className="flex items-center justify-between p-4 rounded-lg border border-primary/10 bg-gradient-to-r from-primary/[0.03] to-transparent hover:from-primary/5 hover:to-primary/[0.02] transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <Avatar className="h-10 w-10">
                    {tip.user.profilePicture ? (
                      <img
                        src={tip.user.profilePicture}
                        alt={tip.user.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <AvatarFallback>
                        {tip.user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">
                      {tip.isAnonymous
                        ? "Sent Anonymously"
                        : `Sent to ${tip.user.name}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {tip.isAnonymous ? "Anonymous" : `@${tip.user.username}`}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(tip.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    -${tip.amount.toFixed(2)}
                  </p>
                  <Badge
                    variant="outline"
                    className="mt-2 capitalize border-primary/30 text-primary"
                  >
                    {tip.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
