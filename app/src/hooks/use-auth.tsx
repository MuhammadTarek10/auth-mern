import type {
  SignInSchema,
  SignUpSchema,
} from "@/common/components/forms/validations/auth";
import type { User } from "@/common/models";
import { authService } from "@/services/auth.service";
import { createContext, useContext, useState, type ReactNode } from "react";
import { toast } from "sonner";

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (data: SignInSchema) => Promise<void>;
  signUp: (data: SignUpSchema) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (data: SignInSchema) => {
    try {
      const response = await authService.signIn(data.email, data.password);
      console.log({ response });
      toast.success(response?.message || "Sign in successful");
      setUser({
        //make some dummy
        _id: "123",
        name: "John Doe",
        email: data.email,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      toast.error(errorMessage);
      throw error;
    }
  };

  const signUp = async (data: SignUpSchema) => {
    try {
      const response = await authService.signUp(
        data.name,
        data.email,
        data.password
      );
      console.log({ response });
      toast.success(response?.message || "Sign up successful");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      toast.error(errorMessage);
      throw error;
    }
  };

  const signOut = async () => {
    setUser(null);
  };

  const updateUser = async (user: User) => {
    setUser(user);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
