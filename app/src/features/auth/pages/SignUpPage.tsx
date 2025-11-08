"use client";

import {
  signUpSchema,
  type SignUpSchema,
} from "@/common/components/forms/validations/auth";
import { Card } from "@/common/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignUpFooter } from "../components/SignUpFooter";
import { SignUpForm } from "../components/SignUpForm";
import { SignUpHeader } from "../components/SignUpHeader";

export function SignUpPage() {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpSchema) => {
    console.log({ data });
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
