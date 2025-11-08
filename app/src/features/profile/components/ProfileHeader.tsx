import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/common/components/ui/avatar";
import { Badge } from "@/common/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/common/components/ui/hover-card";
import { Separator } from "@/common/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/common/components/ui/tooltip";
import type { User } from "@/common/models";
import { getFirstName, getInitials } from "../utils";

interface ProfileHeaderProps {
  user: User | null;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
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
  );
}

