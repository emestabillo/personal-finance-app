import TransactionsClient from "@/app/dashboard/transactions/TransactionsClient";
import ProtectedRoute from "@/components/ProtectedRoute";
import TransactionModal from "./TransactionModal";

export default function TransactionsPage() {
  return (
    <ProtectedRoute>
      <div className="p-6">
        <header className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Transactions</h1>
          <TransactionModal />
        </header>
        <TransactionsClient />
      </div>
    </ProtectedRoute>
  );
}
