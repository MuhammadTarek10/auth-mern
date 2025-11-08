import { useLoaderData } from "@tanstack/react-router";

export function ProfilePage() {
  const { user } = useLoaderData({ from: "/(main)/profile" });

  return (
    <div>
      <h1>ProfilePage</h1>
      <p>{user?.name}</p>
      <p>{user?.email}</p>
    </div>
  );
}
