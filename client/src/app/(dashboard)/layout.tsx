"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isVerified, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isVerified) {
      router.push("/login");
    }
  }, [isLoading, isVerified, router]);

  if (isLoading || !isVerified) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
