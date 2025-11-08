import { CustomFormField } from "@/common/components/forms/CustomFormField";
import type { SignInSchema } from "@/common/components/forms/validations/auth";
import { CardContent } from "@/common/components/ui/card";
import { Form } from "@/common/components/ui/form";
import type { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<SignInSchema>;
  onSubmit: (data: SignInSchema) => void;
}

export function SignInForm({ form, onSubmit }: Props) {
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
        </CardContent>
      </form>
    </Form>
  );
}
