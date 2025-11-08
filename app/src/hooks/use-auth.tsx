import type {
  SignInSchema,
  SignUpSchema,
} from "@/common/components/forms/validations/auth";
import type { User } from "@/common/models";
import { authService } from "@/services/auth.service";
import { userService } from "@/services/user.service";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTimer, setRefreshTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    initializeAuth();
  }, []);

  useEffect(() => {
    const handleLogout = () => {
      setUser(null);
      clearRefreshTimer();
    };

    window.addEventListener("auth:logout", handleLogout);
    return () => {
      window.removeEventListener("auth:logout", handleLogout);
    };
  }, []);

  useEffect(() => {
    if (!user) clearRefreshTimer();
  }, [user]);

  const clearRefreshTimer = () => {
    if (refreshTimer) {
      clearTimeout(refreshTimer);
      setRefreshTimer(null);
    }
  };

  const scheduleTokenRefresh = (expiresIn: number) => {
    clearRefreshTimer();

    const refreshBeforeMs = Math.min(5 * 60 * 1000, expiresIn * 1000 * 0.2);
    const refreshIn = expiresIn * 1000 - refreshBeforeMs;

    const timer = setTimeout(async () => {
      try {
        const response = await authService.refreshToken();
        if (response.data.expires_in) {
          scheduleTokenRefresh(response.data.expires_in);
        }
      } catch (error) {
        setUser(null);
      }
    }, refreshIn);

    setRefreshTimer(timer);
  };

  const initializeAuth = async () => {
    try {
      const response = await userService.getProfile();
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (data: SignInSchema) => {
    try {
      const authResponse = await authService.signIn(data.email, data.password);
      toast.success(authResponse?.message || "Sign in successful");

      const profileResponse = await userService.getProfile();
      setUser(profileResponse.data);

      if (authResponse.data.expires_in) {
        scheduleTokenRefresh(authResponse.data.expires_in);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      toast.error(errorMessage);
      throw error;
    }
  };

  const signUp = async (data: SignUpSchema) => {
    try {
      const authResponse = await authService.signUp(
        data.name,
        data.email,
        data.password
      );
      toast.success(authResponse?.message || "Sign up successful");

      const profileResponse = await userService.getProfile();
      setUser(profileResponse.data);

      if (authResponse.data.expires_in) {
        scheduleTokenRefresh(authResponse.data.expires_in);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      toast.error(errorMessage);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
      clearRefreshTimer();
      toast.success("Signed out successfully");
    } catch (error: unknown) {
      setUser(null);
      clearRefreshTimer();
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      toast.error(errorMessage);
    }
  };

  const updateUser = (user: User) => {
    setUser(user);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
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
