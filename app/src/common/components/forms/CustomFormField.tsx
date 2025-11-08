import { Button } from "@/common/components/ui/button";
import { Checkbox } from "@/common/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import { Input } from "@/common/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/ui/select";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface CustomFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  placeholder: string;
  type: "input" | "textarea" | "select" | "checkbox";
  inputType?: React.ComponentProps<"input">["type"];
  className?: string;
  options?: { value: string; label: string }[];
}

export function CustomFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  placeholder,
  type = "input",
  inputType,
  className,
  options = [],
}: CustomFormFieldProps<TFieldValues, TName>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = inputType === "password";

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            type === "checkbox" &&
              "flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3",
            className
          )}>
          {type === "checkbox" ? (
            <>
              <FormControl>
                <Checkbox
                  className="cursor-pointer"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{label}</FormLabel>
                <FormMessage />
              </div>
            </>
          ) : (
            <>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                {type === "textarea" ? (
                  <textarea
                    placeholder={placeholder}
                    className={cn(
                      "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                      className
                    )}
                    {...field}
                  />
                ) : type === "select" ? (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className={cn("w-full", className)}>
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="relative">
                    <Input
                      type={
                        isPasswordField && showPassword ? "text" : inputType
                      }
                      placeholder={placeholder}
                      className={cn(isPasswordField && "pr-10", className)}
                      {...field}
                    />
                    {isPasswordField && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }>
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    )}
                  </div>
                )}
              </FormControl>
              <div className="flex justify-end items-center">
                <FormMessage />
              </div>
            </>
          )}
        </FormItem>
      )}
    />
  );
}
