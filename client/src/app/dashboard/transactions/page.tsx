"use client";

import useSWR from "swr";
import { fetchTransactions } from "./transactionApi";
import { useAuth } from "@/context/AuthContext";
import TransactionTable from "./TransactionTable";
import ProtectedRoute from "@/components/ProtectedRoute";
import TransactionModal from "./TransactionModal";

export default function TransactionsPage() {
  const { token } = useAuth();

  const {
    data: transactions,
    isLoading,
    error,
    mutate,
  } = useSWR(
    token ? ["transactions", token] : null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_, token]) => fetchTransactions(token)
  );

  const handleTransactionAdded = () => {
    mutate();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>; // Fix error display

  return (
    <ProtectedRoute>
      <div className="p-6">
        <header className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Transactions</h1>
          <TransactionModal onSuccess={handleTransactionAdded} />
        </header>
        <TransactionTable transactions={transactions || []} />
      </div>
    </ProtectedRoute>
  );
}
