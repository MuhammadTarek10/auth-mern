import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";

export const SignInHeader = () => {
  return (
    <CardHeader className="space-y-1">
      <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
      <CardDescription className="text-center">
        Enter your email and password to access your account
      </CardDescription>
    </CardHeader>
  );
};
