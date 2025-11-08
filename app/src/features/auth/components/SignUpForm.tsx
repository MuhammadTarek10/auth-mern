import { CustomFormField } from "@/common/components/forms/CustomFormField";
import type { SignUpSchema } from "@/common/components/forms/validations/auth";
import { Button } from "@/common/components/ui/button";
import { CardContent, CardFooter } from "@/common/components/ui/card";
import { Form } from "@/common/components/ui/form";
import type { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<SignUpSchema>;
  onSubmit: (data: SignUpSchema) => void;
}

export function SignUpForm({ form, onSubmit }: Props) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <CustomFormField
            control={form.control}
            name="name"
            label="Name"
            placeholder="Enter your name"
            type="input"
          />
          <CustomFormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
            type="input"
            inputType="email"
          />
          <CustomFormField
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="input"
            inputType="password"
          />
          <CustomFormField
            control={form.control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            type="input"
            inputType="password"
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" size="lg">
            Sign Up
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
