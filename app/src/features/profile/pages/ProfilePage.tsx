import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/common/components/ui/avatar";
import { Badge } from "@/common/components/ui/badge";
import { Button } from "@/common/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/common/components/ui/hover-card";
import { Label } from "@/common/components/ui/label";
import { Separator } from "@/common/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/common/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/common/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import { useLoaderData } from "@tanstack/react-router";

export function ProfilePage() {
  const { user } = useLoaderData({ from: "/(main)/profile" });
  const { signOut } = useAuth();

  // Get initials for avatar fallback
  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get first name for greeting
  const getFirstName = (name?: string | null) => {
    if (!name) return "User";
    return name.split(" ")[0];
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-green-50/30 to-emerald-50/30 dark:from-background dark:via-green-950/20 dark:to-emerald-950/20">
      {/* Gradient Header Banner */}
      <div className="relative overflow-hidden bg-linear-to-r from-green-600 via-emerald-600 to-green-700">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-96 w-96 animate-blob rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 h-96 w-96 animate-blob animation-delay-2000 rounded-full bg-emerald-300/20 blur-3xl"></div>
        </div>

        <div className="relative z-10 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end">
              {/* Avatar */}
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="relative cursor-pointer">
                    <Avatar className="h-32 w-32 border-4 border-white/20 shadow-2xl ring-4 ring-white/10 transition-transform hover:scale-105">
                      <AvatarImage src="" alt={user?.name || "User"} />
                      <AvatarFallback className="bg-linear-to-br from-green-400 to-emerald-400 text-3xl font-bold text-white">
                        {getInitials(user?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 border-4 border-white shadow-lg">
                          <div className="h-3 w-3 rounded-full bg-white"></div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Online</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-linear-to-br from-green-400 to-emerald-400 text-lg font-bold text-white">
                          {getInitials(user?.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">
                          {user?.name || "User"}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {user?.email}
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="text-sm text-muted-foreground">
                      Member since recently • Active now
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>

              {/* User Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="mb-2">
                  <h1 className="text-4xl font-bold text-white sm:text-5xl">
                    {user?.name || "User"}
                  </h1>
                  <p className="mt-2 text-lg text-green-100">
                    Welcome back, {getFirstName(user?.name)}! 👋
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-white backdrop-blur-sm border-white/30">
                    <svg
                      className="mr-1 h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Member
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-white backdrop-blur-sm border-white/30">
                    <svg
                      className="mr-1 h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Verified
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Account Stats Card */}
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
                        <span className="text-sm font-medium">
                          Member Since
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {user?._id ? "Recently" : "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-3">
                        <span className="text-sm font-medium">Last Active</span>
                        <span className="text-sm text-muted-foreground">
                          Now
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions Card */}
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
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      Quick Actions
                    </CardTitle>
                    <CardDescription>
                      Manage your account settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                            onClick={() => {}}>
                            <svg
                              className="mr-2 h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                            Edit Profile
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Update your profile information</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                            onClick={() => {}}>
                            <svg
                              className="mr-2 h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                              />
                            </svg>
                            Security Settings
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Manage password and security</p>
                        </TooltipContent>
                      </Tooltip>
                      <Button
                        variant="destructive"
                        className="w-full justify-start"
                        onClick={signOut}>
                        <svg
                          className="mr-2 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Sign Out
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Profile Information
                  </CardTitle>
                  <CardDescription>
                    Your account details and information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="flex items-center gap-3 rounded-lg border bg-muted/50 p-3">
                      <svg
                        className="h-5 w-5 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span className="font-medium">
                        {user?.name || "Not set"}
                      </span>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="flex items-center gap-3 rounded-lg border bg-muted/50 p-3">
                      <svg
                        className="h-5 w-5 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="font-medium">
                        {user?.email || "Not set"}
                      </span>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="userId">User ID</Label>
                    <div className="flex items-center gap-3 rounded-lg border bg-muted/50 p-3">
                      <svg
                        className="h-5 w-5 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                      <span className="font-mono text-sm text-muted-foreground">
                        {user?._id || "Not available"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
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
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Account Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your preferences and account settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border bg-muted/30 p-4">
                    <p className="text-sm text-muted-foreground">
                      Settings panel coming soon. Use the quick actions to
                      manage your account.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
