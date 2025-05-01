import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        {/* Dashboard content */}
      </div>
    </ProtectedRoute>
  );
}
