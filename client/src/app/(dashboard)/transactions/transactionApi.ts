const API_BASE_URL = "http://localhost:4000/api/v1";

export const fetchTransactions = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/transactions`, {
    method: "GET",
    headers: {
      Authorization: `${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Authentication failed. Please log in again.");
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log(data);
  return data;
};

export const newTransaction = async (
  recipient_sender: string,
  category: string,
  date: string,
  amount: string,
  transaction_type: string,
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
        recipient_sender,
        category,
        date,
        amount,
        transaction_type,
        // amount_cents: Math.round(target_amount * 100), // Convert dollars to cents
      },
    }),
  });
  if (!response.ok) {
    const errorText = await response.json(); // Log the error response
    console.error("Error response:", errorText);
    throw new Error(`Failed to add pot: ${errorText}`);
  } else {
    const data = await response.json();
    console.log("Backend response:", data);
    return data;
  }
};
