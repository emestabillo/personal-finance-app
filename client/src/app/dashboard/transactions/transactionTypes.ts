import { z } from "zod";

// Define category types as a constant to reuse
export const CATEGORY_OPTIONS = [
  { value: "Entertainment", label: "🎬 Entertainment" },
  { value: "Bills", label: "💡 Bills" },
  { value: "Groceries", label: "🛒 Groceries" },
  { value: "Dining Out", label: "🍽️ Dining Out" },
  { value: "Transportation", label: "🚗 Transportation" },
  { value: "Personal Care", label: "💆 Personal Care" },
  { value: "General", label: "📦 General" },
] as const;

// Extract the type for values
export type TransactionCategory = (typeof CATEGORY_OPTIONS)[number]["value"];

// For API responses (what you GET from server)
export interface Transaction {
  id: number;
  recipient_or_sender: string;
  category: TransactionCategory;
  transaction_date: string;
  amount_dollars: number;
  transaction_type: "income" | "expense";
  recurring: boolean;
}

// For API request payload (POST to server)
export interface TransactionCreatePayload {
  recipient_or_sender: string;
  category: TransactionCategory;
  date: string;
  amount_dollars: number; // Converted to cents (e.g., 1099)
  transaction_type: "income" | "expense";
  recurring: boolean;
}

export const transactionFormSchema = z.object({
  recipient_or_sender: z.string().min(1, "Name is required"),
  category: z.enum(
    [
      CATEGORY_OPTIONS[0].value,
      ...CATEGORY_OPTIONS.slice(1).map((c) => c.value),
    ],
    { required_error: "Please select a category" }
  ),
  date: z.string().min(1, "Date is required"),
  amount_dollars: z
    .string()
    .min(1, "Amount is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Must be a valid dollar amount"),
  transaction_type: z.enum(["income", "expense"]),
  recurring: z.boolean().default(false),
});

export type TransactionFormInput = z.infer<typeof transactionFormSchema>;
