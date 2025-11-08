import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.auth.user) {
      throw redirect({ to: "/profile" });
    }
  },
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Outlet />
    </div>
  );
}
