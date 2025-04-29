"use client";

import { useRouter } from "next/navigation";
import { useAuthenticatedFetch } from "@/hooks/useAuthenticatedFetch";
import { fetchTransactions } from "./TransactionApi";
import TransactionTable from "./TransactionTable";

export default function TransactionsClient() {
  const router = useRouter();
  const {
    data: transactions,
    error,
    loading,
  } = useAuthenticatedFetch(fetchTransactions, [router]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return <TransactionTable transactions={transactions || []} />;
}
