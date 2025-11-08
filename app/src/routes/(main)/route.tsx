import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(main)")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (!context.auth.user) {
      throw redirect({ to: "/sign-in" });
    }
  },
});

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
