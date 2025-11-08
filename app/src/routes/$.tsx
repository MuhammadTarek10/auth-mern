import { NotFoundPage } from "@/common/components/NotFoundPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  component: NotFoundPage,
});
