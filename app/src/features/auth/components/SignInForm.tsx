import { CustomFormField } from "@/common/components/forms/CustomFormField";
import type { SignInSchema } from "@/common/components/forms/validations/auth";
import { Button } from "@/common/components/ui/button";
import { CardContent, CardFooter } from "@/common/components/ui/card";
import { Form } from "@/common/components/ui/form";
import type { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<SignInSchema>;
  onSubmit: (data: SignInSchema) => void;
}

export function SignInForm({ form, onSubmit }: Props) {
  const rootError = form.formState.errors.root;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
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

          {rootError && (
            <p className="text-destructive text-sm" role="alert">
              {rootError.message}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" size="lg">
            Sign In
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
