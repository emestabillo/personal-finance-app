import TransactionsClient from "@/app/dashboard/transactions/TransactionsClient";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function TransactionsPage() {
  return (
    <ProtectedRoute>
      <div className="p-6">
        <div>
          <h1 className="text-2xl font-bold mb-4">Transactions</h1>
          <TransactionsClient />
        </div>
      </div>
    </ProtectedRoute>
  );
}
