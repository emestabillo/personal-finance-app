"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { PotProps } from "./potTypes";
import Pot from "./Pot";
import ManagePotFundsModal from "./ManagePotFundsModal";
import { fetchPots, addMoneyToPot, withdrawMoneyFromPot } from "./potApi";
import DeletePotModal from "./DeletePotModal";
import AddEditPotModal from "./AddEditPot";

export default function Page() {
  const [pots, setPots] = useState<PotProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showOptionsDropdown, setShowOptionsDropdown] = useState(false);
  const [selectedPot, setSelectedPot] = useState<PotProps | undefined>(
    undefined
  );
  const [managePotFundsModalIsOpen, setManagePotFundsModalIsOpen] =
    useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [actionType, setActionType] = useState<"add" | "withdraw">("add");
  const [showDeletePotModal, setShowDeletePotModal] = useState(false);
  const [showAddEditPot, setShowAddEditPot] = useState(false);
  const [addOrEditModal, setAddOrEditModal] = useState<"add" | "edit">("add");
  const [colorTag, setColorTag] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const router = useRouter();

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found. Please log in.");
      return;
    }

    try {
      const pots = await fetchPots(token);
      setPots(pots);
    } catch (error) {
      console.error("Error fetching pots:", error);
      setError(error instanceof Error ? error.message : String(error));
    }
  };

  useEffect(() => {
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

      setManagePotFundsModalIsOpen(false);
      setAmount(0);
    } catch (error) {
      console.error("Error performing action:", error);
      setError(error instanceof Error ? error.message : String(error));
    }
  };

  const onAddEditSuccess = () => {
    setShowAddEditPot(false);
    setTargetAmount("");
    setColorTag("");
    fetchData(); // Refetch pots from the backend
  };

  const handleDeleteSuccess = (deletedPotId: number) => {
    setPots(
      (prevPots) => prevPots?.filter((pot) => pot.id !== deletedPotId) || null
    );
    setShowDeletePotModal(false);
    setSelectedPot(undefined);
  };

  const handleAddPotModal = () => {
    setAddOrEditModal("add");
    setShowAddEditPot(!showAddEditPot);
    setSelectedPot(undefined);
  };

  if (error) return <div>Error: {error}</div>;
  if (!pots) return <div>Loading...</div>;

  return (
    <ProtectedRoute>
      <div className="p-6">
        <div>
          <h1 className="text-2xl font-bold mb-4">Your Pots</h1>
          <button onClick={handleAddPotModal}>+ Add new pot</button>
        </div>
        {pots.map((pot) => (
          <Pot
            key={pot.id}
            pot={pot}
            showOptionsDropdown={showOptionsDropdown}
            setShowOptionsDropdown={setShowOptionsDropdown}
            setSelectedPot={setSelectedPot}
            setActionType={setActionType}
            setManagePotFundsModalIsOpen={setManagePotFundsModalIsOpen}
            showDeletePotModal={showDeletePotModal}
            setShowDeletePotModal={setShowDeletePotModal}
            onDeleteSuccess={() => handleDeleteSuccess(pot.id)}
          />
        ))}
        <AddEditPotModal
          pot={selectedPot} // `selectedPot` can be `undefined`
          addOrEditModal={addOrEditModal}
          targetAmount={targetAmount}
          setTargetAmount={setTargetAmount}
          showAddEditPot={showAddEditPot}
          setShowAddEditPot={setShowAddEditPot}
          colorTag={colorTag}
          setColorTag={setColorTag}
          onAddEditSuccess={onAddEditSuccess}
        />
        <ManagePotFundsModal
          managePotFundsModalIsOpen={managePotFundsModalIsOpen}
          onClose={() => setManagePotFundsModalIsOpen(false)}
          selectedPot={selectedPot!}
          actionType={actionType}
          amount={amount}
          setAmount={setAmount}
          handleAction={handleAction}
        />
        {selectedPot && (
          <DeletePotModal
            pot={selectedPot}
            showDeletePotModal={showDeletePotModal}
            setShowDeletePotModal={setShowDeletePotModal}
            onDeleteSuccess={() => {
              handleDeleteSuccess(selectedPot.id);
              setShowOptionsDropdown(false);
            }}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}
