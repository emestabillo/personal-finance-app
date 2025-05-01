"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check for token on initial load
    const storedToken = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    setToken(storedToken);
    setIsLoading(false);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    setToken(token);
    // router.push("/dashboard");
    setTimeout(() => router.push("/dashboard"), 0); // Optional: ensures state is set
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
// "use client";

// import { createContext, useContext } from "react";

// type AuthContextType = {
//   token: string | null;
//   setToken: (token: string | null) => void;
//   isAuthenticated: boolean;
//   loading: boolean;
// };

// export const AuthContext = createContext<AuthContextType>({
//   token: null,
//   setToken: () => {},
//   isAuthenticated: false,
//   loading: true,
// });

// export const useAuth = () => useContext(AuthContext);
