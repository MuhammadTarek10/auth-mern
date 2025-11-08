import {
  signUpSchema,
  type SignUpSchema,
} from "@/common/components/forms/validations/auth";
import { Card } from "@/common/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { SignUpFooter, SignUpForm, SignUpHeader } from "../components";

export function SignUpPage() {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: SignUpSchema) => {
    try {
      await signUp(data);
      navigate({ to: "/sign-in" });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      form.setError("root", {
        type: "manual",
        message: errorMessage,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-bg-primary via-bg-secondary to-bg-primary">
      <Card className="w-full max-w-md">
        <SignUpHeader />
        <SignUpForm form={form} onSubmit={onSubmit} />
        <SignUpFooter />
      </Card>
    </div>
  );
}
