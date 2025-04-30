"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { SidebarProvider } from "./ui/sidebar";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </AuthProvider>
  );
}
