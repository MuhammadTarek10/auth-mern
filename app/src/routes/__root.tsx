import { ErrorComponent } from "@/common/components/ErrorComponent";
import { LoadingComponent } from "@/common/components/LoadingComponent";
import { NotFoundPage } from "@/common/components/NotFoundPage";
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
  pendingComponent: () => <LoadingComponent fullScreen />,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  notFoundComponent: () => <NotFoundPage />,
});
