import {
  signInSchema,
  type SignInSchema,
} from "@/common/components/forms/validations/auth";
import { Card } from "@/common/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { SignInFooter, SignInForm, SignInHeader } from "../components";

export function SignInPage() {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: SignInSchema) => {
    try {
      await signIn(data);
      queueMicrotask(() => {
        navigate({ to: "/profile" });
      });
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
        <SignInHeader />
        <SignInForm form={form} onSubmit={onSubmit} />
        <SignInFooter />
      </Card>
    </div>
  );
}
