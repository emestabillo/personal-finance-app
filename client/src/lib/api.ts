export async function fetchTransactions(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/transactions`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }

  return response.json();
}
