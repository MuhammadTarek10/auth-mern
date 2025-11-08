"use client";

import {
  signInSchema,
  type SignInSchema,
} from "@/common/components/forms/validations/auth";
import { Card } from "@/common/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignInFooter } from "../components/SignInFooter";
import { SignInForm } from "../components/SignInForm";
import { SignInHeader } from "../components/SignInHeader";

export function SignInPage() {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInSchema) => {
    console.log({ data });
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
