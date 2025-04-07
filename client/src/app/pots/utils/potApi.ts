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

export const addPot = async (
  name: string,
  target_amount: number,
  token: string
) => {
  const response = await fetch(`${API_BASE_URL}/pots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify({
      pot: {
        name,
        target_amount_cents: Math.round(target_amount * 100), // Convert dollars to cents
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

export const deletePot = async (potId: number, token: string) => {
  const response = await fetch(`${API_BASE_URL}/pots/${potId}`, {
    method: "DELETE",
    headers: {
      Authorization: `${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text(); // Log the error response
    console.error("Error response:", errorText);
    throw new Error(`Failed to delete pot: ${errorText}`);
  }
  if (response.status === 204) {
    return null; // or return a success message if you prefer
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  } else {
    return null; // or return a success message
  }
};
