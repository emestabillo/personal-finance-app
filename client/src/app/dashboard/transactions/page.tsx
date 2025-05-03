"use client";
import { useState } from "react";
import TransactionsClient from "@/app/dashboard/transactions/TransactionsClient";
import ProtectedRoute from "@/components/ProtectedRoute";
import TransactionModal from "./TransactionModal";

export default function TransactionsPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTransactionAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <ProtectedRoute>
      <div className="p-6">
        <header className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Transactions</h1>
          <TransactionModal onSuccess={handleTransactionAdded} />
        </header>
        <TransactionsClient key={refreshTrigger} />
      </div>
    </ProtectedRoute>
  );
}
