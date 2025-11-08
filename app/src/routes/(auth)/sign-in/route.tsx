import { SignInPage } from "@/features/auth/pages/SignInPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/sign-in")({
  component: SignInPage,
});
