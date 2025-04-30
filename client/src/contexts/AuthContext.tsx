"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { usePathname } from "next/navigation";
import { verifyToken } from "@/lib/auth";

interface AuthContextType {
  token: string | null;
  isVerified: boolean;
  setToken: (token: string | null) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const router = useRouter();
  const pathname = usePathname();

  const setToken = useCallback(async (newToken: string | null) => {
    setIsLoading(true);
    try {
      if (newToken) {
        const isValid = await verifyToken(newToken);
        if (isValid) {
          if (typeof window !== "undefined") {
            localStorage.setItem("token", newToken);
          }
          setTokenState(newToken);
          setIsVerified(true);
        } else {
          logout();
        }
      } else {
        logout();
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    setTokenState(null);
    setIsVerified(false);
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (storedToken) {
          await setToken(storedToken);
        } else {
          setIsVerified(false);
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };
    initializeAuth();
  }, [setToken, logout]);

  // useEffect(() => {
  //   // Skip auth check for login page
  //   if (pathname === "/login") return;

  //   if (!isLoading) {
  //     if (!isVerified) {
  //       router.push("/login");
  //     }
  //   }
  // }, [isLoading, isVerified, pathname, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  // Don't render protected routes if not verified
  if (!isVerified && pathname !== "/login") {
    return null;
  }

  return (
    <AuthContext.Provider value={{ token, isVerified, setToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
