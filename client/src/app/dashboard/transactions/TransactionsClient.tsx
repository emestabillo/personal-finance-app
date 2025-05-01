"use client";

import { useFetch } from "@/hooks/useFetch";
import { fetchTransactions } from "./transactionApi";
import TransactionTable from "./TransactionTable";
import { useAuth } from "@/context/AuthContext";

export default function TransactionsClient() {
  const { token } = useAuth();

  const { data, loading, error } = useFetch(() => {
    if (!token) throw new Error("Authentication required");
    return fetchTransactions(token);
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return <TransactionTable transactions={data || []} />;
}
