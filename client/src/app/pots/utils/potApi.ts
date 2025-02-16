const API_BASE_URL = "http://localhost:4000/api/v1";

export const fetchPots = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/pots`, {
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
  // console.log(data);
  return data;
};

export const addMoneyToPot = async (
  potId: number,
  amountCents: number,
  token: string
) => {
  const response = await fetch(`${API_BASE_URL}/pots/${potId}/add_money`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify({ amount: amountCents }),
  });
  const data = await response.json();
  // console.log(data);
  return data;
};

export const withdrawMoneyFromPot = async (
  potId: number,
  amountCents: number,
  token: string
) => {
  const response = await fetch(`${API_BASE_URL}/pots/${potId}/withdraw_money`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify({ amount: amountCents }),
  });
  const data = await response.json();
  // console.log(data);
  return data;
};
