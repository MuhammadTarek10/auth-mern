import { ProfilePage } from "@/features/profile/pages/ProfilePage";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(main)/profile")({
  component: ProfilePage,
  beforeLoad: async ({ context }) => {
    if (!context.auth.user) {
      throw redirect({ to: "/sign-in" });
    }
  },
  loader: async ({ context }) => {
    return {
      user: context.auth.user,
    };
  },
});
