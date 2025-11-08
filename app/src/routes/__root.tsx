import { ErrorPage } from "@/features/error/pages/ErrorPage";
import type { AuthContextType } from "@/hooks/use-auth";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

interface RootRouteContext {
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
  loader: () => {
    throw new Error("Test error");
  },
  errorComponent: ({ error }) => <ErrorPage error={error} />,
});
