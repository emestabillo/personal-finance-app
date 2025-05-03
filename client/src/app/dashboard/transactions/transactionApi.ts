import { TransactionFormInput } from "./transactionTypes";

const API_BASE_URL = "http://localhost:4000/api/v1"; // Include /api/v1

export const fetchTransactions = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/transactions`, {
    method: "GET",
    headers: {
      "Authorization": `${token}`,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Authentication failed. Please log in again.");
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const createTransaction = async (
  formData: TransactionFormInput,
  token: string
) => {
  const response = await fetch(`${API_BASE_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify({
      transaction: {
        // Note the nested transaction object
        recipient_sender: formData.recipient_sender,
        category: formData.category,
        transaction_date: formData.date,
        amount_cents: Math.round(parseFloat(formData.amount_cents) * 100),
        transaction_type: formData.transaction_type,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create transaction");
  }

  return await response.json();
};
