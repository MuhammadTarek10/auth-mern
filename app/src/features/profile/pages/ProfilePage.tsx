import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/common/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { useLoaderData, useNavigate } from "@tanstack/react-router";
import { AccountStatsCard } from "../components/AccountStatsCard";
import { ProfileHeader } from "../components/ProfileHeader";
import { ProfileInfoCard } from "../components/ProfileInfoCard";
import { QuickActionsCard } from "../components/QuickActionsCard";
import { SettingsCard } from "../components/SettingsCard";

export function ProfilePage() {
  const { user } = useLoaderData({ from: "/(main)/profile" });
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/sign-in" });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-green-50/30 to-emerald-50/30 dark:from-background dark:via-green-950/20 dark:to-emerald-950/20">
      <ProfileHeader user={user} />

      {/* Main Content */}
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <ProfileInfoCard user={user} />
            </TabsContent>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <AccountStatsCard user={user} />
                <QuickActionsCard onSignOut={handleSignOut} />
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <SettingsCard />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
