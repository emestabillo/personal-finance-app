export interface TransactionProps {
  id: number;
  recipient_sender: string;
  category: string;
  transaction_date: string;
  amount_cents: string;
  transaction_type: "income" | "expense";
}
