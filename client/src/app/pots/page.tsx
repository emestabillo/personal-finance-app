"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface PotProps {
  id: number;
  name: string;
  total_saved: string;
  target_amount: string;
  percentage_saved: number;
}

export default function Page() {
  const [pots, setPots] = useState<PotProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPots = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authentication token found. Please log in.");
        router.push("/"); // Redirect to login page
        return;
      }

      try {
        const response = await fetch("http://localhost:4000/api/v1/pots", {
          method: "get",
          headers: {
            "Authorization": `${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Authentication failed. Please log in again.");
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Received pots data:", result);

        setPots(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error instanceof Error ? error.message : String(error));
        if (
          error instanceof Error &&
          error.message.includes("Authentication failed")
        ) {
          router.push("/");
        }
      }
    };

    fetchPots();
  }, [router]);

  if (error) return <div>Error: {error}</div>;
  if (!pots) return <div>Loading...</div>;

  return (
    <div>
      <h1>Your Pots</h1>
      {pots.map((pot) => (
        <div key={pot.id}>
          <h2>{pot.name}</h2>
          <p>Total Saved: {pot.total_saved}</p>
          <p>Target Amount: {pot.target_amount}</p>
          <p>Percentage Saved: {pot.percentage_saved.toFixed(2)}%</p>
        </div>
      ))}
    </div>
  );
}
