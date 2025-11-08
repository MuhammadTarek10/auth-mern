import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";

export const SignUpHeader = () => {
  return (
    <CardHeader className="space-y-1">
      <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
      <CardDescription className="text-center">
        Create a new account to get started
      </CardDescription>
    </CardHeader>
  );
};
