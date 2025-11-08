import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import { Separator } from "@/common/components/ui/separator";
import type { User } from "@/common/models";

interface AccountStatsCardProps {
  user: User | null;
}

export function AccountStatsCard({ user }: AccountStatsCardProps) {
  return (
    <Card className="border-2 shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <svg
            className="h-6 w-6 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Account Statistics
        </CardTitle>
        <CardDescription>
          Your account overview and activity
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border bg-linear-to-br from-green-50 to-green-100/50 p-4 dark:from-green-950/50 dark:to-green-900/30">
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">
              Active
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">
              Account Status
            </div>
          </div>
          <div className="rounded-lg border bg-linear-to-br from-emerald-50 to-emerald-100/50 p-4 dark:from-emerald-950/50 dark:to-emerald-900/30">
            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
              {user?.email ? "✓" : "—"}
            </div>
            <div className="text-sm text-emerald-600 dark:text-emerald-400">
              Email Verified
            </div>
          </div>
        </div>
        <Separator />
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-3">
            <span className="text-sm font-medium">Member Since</span>
            <span className="text-sm text-muted-foreground">
              {user?._id ? "Recently" : "N/A"}
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-3">
            <span className="text-sm font-medium">Last Active</span>
            <span className="text-sm text-muted-foreground">Now</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

