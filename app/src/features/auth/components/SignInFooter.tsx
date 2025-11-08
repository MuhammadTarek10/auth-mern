import { CardFooter } from "@/common/components/ui/card";
import { Link } from "@tanstack/react-router";

export const SignInFooter = () => {
  return (
    <CardFooter className="flex flex-col space-y-4">
      <div className="text-sm text-center text-muted-foreground">
        Don't have an account?{" "}
        <Link
          to="/sign-up"
          className="text-primary hover:underline font-medium cursor-pointer">
          Sign up
        </Link>
      </div>
    </CardFooter>
  );
};
