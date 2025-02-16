"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ManageFundsModal from "./components/ManageFundsModal";
import { fetchPots, addMoneyToPot, withdrawMoneyFromPot } from "./utils/potApi";

export interface PotProps {
  id: number;
  name: string;
  total_saved: string;
  target_amount: string;
  percentage_saved: number;
}
export default function Page() {
  const [pots, setPots] = useState<PotProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedPot, setSelectedPot] = useState<PotProps | null>(null);
  const [isOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [actionType, setActionType] = useState<"add" | "withdraw">("add");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No authentication token found. Please log in.");
      router.push("/");
      return;
    }

    const fetchData = async () => {
      try {
        const data = await fetchPots(token);
        setPots(data);
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

    fetchData();
  }, [router]);

  const handleAction = async () => {
    if (!selectedPot || amount <= 0) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found. Please log in.");
      return;
    }

    try {
      let response;
      if (actionType === "add") {
        response = await addMoneyToPot(selectedPot.id, amount * 100, token);
      } else {
        response = await withdrawMoneyFromPot(
          selectedPot.id,
          amount * 100,
          token
        );
      }

      // Update the pots state with the new data
      setPots(
        (prevPots) =>
          prevPots?.map((pot) =>
            pot.id === selectedPot.id
              ? {
                  ...pot,
                  total_saved: response.total_saved,
                  percentage_saved: response.percentage_saved,
                }
              : pot
          ) || null
      );

      setIsModalOpen(false);
      setAmount(0);
    } catch (error) {
      console.error("Error performing action:", error);
      setError(error instanceof Error ? error.message : String(error));
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!pots) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Pots</h1>
      {pots.map((pot) => (
        <div key={pot.id} className="mb-4 p-4 border border-gray-200 rounded">
          <h2 className="text-xl font-semibold">{pot.name}</h2>
          <p>Total Saved: {pot.total_saved}</p>
          <p>Target Amount: {pot.target_amount}</p>
          <p>Percentage Saved: {pot.percentage_saved.toFixed(2)}%</p>
          <div className="mt-2">
            <button
              onClick={() => {
                setSelectedPot(pot);
                setActionType("add");
                setIsModalOpen(true);
              }}
              className="px-4 py-2 bg-green-500 text-white rounded mr-2 hover:bg-green-600"
            >
              Add Money
            </button>
            <button
              onClick={() => {
                setSelectedPot(pot);
                setActionType("withdraw");
                setIsModalOpen(true);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Withdraw Money
            </button>
          </div>
        </div>
      ))}

      <ManageFundsModal
        isOpen={isOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPot={selectedPot!}
        actionType={actionType}
        amount={amount}
        setAmount={setAmount}
        handleAction={handleAction}
      />
    </div>
  );
}
