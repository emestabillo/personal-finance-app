"use client";
import { useState } from "react";
import useSWR from "swr";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { PotProps } from "./potTypes";
import Pot from "./Pot";
import ManagePotFundsModal from "./ManagePotFundsModal";
import { fetchPots, addMoneyToPot, withdrawMoneyFromPot } from "./potApi";
import DeletePotModal from "./DeletePotModal";
import AddEditPotModal from "./AddEditPot";

export default function Page() {
  const { token } = useAuth();
  const {
    data: pots,
    isLoading,
    error,
    mutate,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } = useSWR(token ? ["pots", token] : null, ([_, token]) => fetchPots(token));

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

  const handleAction = async () => {
    if (!selectedPot || amount <= 0) return;

    if (!token) {
      console.error("No authentication token found. Please log in.");
      return;
    }

    try {
      if (actionType === "add") {
        await addMoneyToPot(selectedPot.id, amount * 100, token);
      } else {
        await withdrawMoneyFromPot(selectedPot.id, amount * 100, token);
      }

      mutate(); // Refresh data
      setManagePotFundsModalIsOpen(false);
      setAmount(0);
    } catch (error) {
      console.error("Error performing action:", error);
    }
  };

  const onAddEditSuccess = () => {
    setShowAddEditPot(false);
    setTargetAmount("");
    setColorTag("");
    mutate(); // Refresh data
  };

  const handleDeleteSuccess = () => {
    mutate(); // Refresh data
    setShowDeletePotModal(false);
    setSelectedPot(undefined);
  };

  const handleAddPotModal = () => {
    setAddOrEditModal("add");
    setShowAddEditPot(!showAddEditPot);
    setSelectedPot(undefined);
  };

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <ProtectedRoute>
      <div className="p-6">
        <div>
          <h1 className="text-2xl font-bold mb-4">Your Pots</h1>
          <button onClick={handleAddPotModal}>+ Add new pot</button>
        </div>
        {pots &&
          pots.map((pot: PotProps) => (
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
              setAddOrEditModal={setAddOrEditModal}
              setShowAddEditPot={setShowAddEditPot}
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
              handleDeleteSuccess();
              setShowOptionsDropdown(false);
            }}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}
