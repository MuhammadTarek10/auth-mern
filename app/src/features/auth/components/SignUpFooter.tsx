import { Button } from "@/common/components/ui/button";
import { CardFooter } from "@/common/components/ui/card";
import { Link } from "@tanstack/react-router";

export const SignUpFooter = () => {
  return (
    <CardFooter className="flex flex-col space-y-4">
      <Button type="submit" className="w-full" size="lg">
        Sign Up
      </Button>
      <div className="text-sm text-center text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/sign-in"
          className="text-primary hover:underline font-medium cursor-pointer">
          Sign in
        </Link>
      </div>
    </CardFooter>
  );
};
