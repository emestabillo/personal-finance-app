"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { token, isVerified } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token || !isVerified) {
      router.push("/login");
    }
  }, [token, isVerified, router]);

  if (!token || !isVerified) {
    return null; //or loading spinner
  }

  return <>{children}</>;
}
