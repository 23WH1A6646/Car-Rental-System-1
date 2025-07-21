import { createContext, useState, useContext, ReactNode } from "react";
import { toast } from "@/components/ui/sonner";
import axios from "axios";

interface User {
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType {
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  verifyOtp: (email: string, otp: string, newPassword: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  const login = async (email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      const { name, email: returnedEmail, role, message } = response.data;

      setAuthState({
        user: { name, email: returnedEmail, role },
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      toast.success(message || "Login successful");
    } catch (error: any) {
      const msg =
        error.response?.data?.message ||
        error.response?.data ||
        "Login failed";
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: msg,
      }));
      toast.error(msg);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        fullName: name,
        email,
        password,
      });

      // ✅ Don't auto-login — instead, show message and allow navigation to login
      toast.success("Registration successful! Please login.");

      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: null,
      }));
    } catch (error: any) {
      const msg =
        error.response?.data?.message ||
        error.response?.data ||
        "Registration failed";
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: msg,
      }));
      toast.error(msg);
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    toast.info("Logged out");
  };

  const verifyOtp = async (
    email: string,
    otp: string,
    newPassword: string
  ): Promise<boolean> => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/reset-password-otp", {
        email,
        otp,
        newPassword,
      });

      toast.success("Password reset successfully!");
      return true;
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to verify OTP";
      toast.error(msg);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ authState, setAuthState, login, register, logout, verifyOtp }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
