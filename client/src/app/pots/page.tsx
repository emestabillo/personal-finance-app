"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PotProps } from "./components/Pot";
import Pot from "./components/Pot";
import ManageFundsModal from "./components/ManageFundsModal";
import { fetchPots, addMoneyToPot, withdrawMoneyFromPot } from "./utils/potApi";

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
        <Pot
          key={pot.id}
          pot={pot}
          setSelectedPot={setSelectedPot}
          setActionType={setActionType}
          setIsModalOpen={setIsModalOpen}
        />
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
