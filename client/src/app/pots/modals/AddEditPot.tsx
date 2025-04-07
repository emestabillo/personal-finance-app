import { useState, useEffect } from "react";
import { AddEditPotProps } from "../types";
import { colorOptions, budgetCategories } from "../utils/dropdownData";
import { cn } from "@/lib/utils";
import { addPot } from "../utils/potApi";

export default function AddEditPotModal({
  pot = {
    id: 0,
    name: "",
    total_saved: "0",
    target_amount: "0",
    percentage_saved: 0,
  },
  addOrEditModal,
  setColorTag,
  setTargetAmount,
  showAddEditPot,
  setShowAddEditPot,
  onAddEditSuccess,
}: AddEditPotProps) {
  const [potName, setPotName] = useState(pot.name || "");
  const [localTargetAmount, setLocalTargetAmount] = useState(
    pot.target_amount || ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync localTargetAmount with pot.target_amount when pot changes
  useEffect(() => {
    setLocalTargetAmount(pot.target_amount || "");
  }, [pot.target_amount]);

  const handleTargetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow empty input (user can delete all characters)
    if (value === "") {
      setLocalTargetAmount("");
      setTargetAmount("");
      return;
    }

    // Parse the input value as a number
    const numericValue = parseFloat(value);

    // Update the state only if the value is a valid non-negative number
    if (!isNaN(numericValue) && numericValue >= 0) {
      setLocalTargetAmount(value); // Keep as string for display
      setTargetAmount(numericValue.toString()); // Send as string to parent
    }
  };

  const handleSave = async () => {
    if (!potName || !localTargetAmount) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }

      const targetAmountNumber = parseFloat(localTargetAmount);
      if (isNaN(targetAmountNumber) || targetAmountNumber < 0) {
        throw new Error("Invalid target amount. Please enter a valid number.");
      }

      console.log("Saving pot with:", { potName, targetAmountNumber }); // Debugging log

      const newPot = await addPot(potName, targetAmountNumber, token);
      console.log("New pot created:", newPot); // Debugging log

      // Reset form and close modal
      setPotName("");
      setLocalTargetAmount("");
      setShowAddEditPot(false);
      onAddEditSuccess(); // Notify parent of success
    } catch (error) {
      console.error("Error saving pot:", error);
      setError(error instanceof Error ? error.message : "Failed to save pot.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        `fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 invisible max-h-0 z-10`,
        {
          "visible max-h-[100rem]": showAddEditPot,
        }
      )}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-bold mb-4">
          {addOrEditModal === "add" ? "Add new" : "Edit"}
        </h3>
        <p>
          {addOrEditModal === "add"
            ? "Choose a category to set a spending budget. These categories can help you monitor spending."
            : "As your budgets change, feel free to update your spending limits."}
        </p>
        <div>
          <label htmlFor="name">Pot Name:</label>
          <input
            type="text"
            name="name"
            value={potName}
            onChange={(e) => setPotName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
        </div>
        <div>
          <label htmlFor="target-amount">Target:</label>
          <input
            type="number"
            name="target-amount"
            placeholder="e.g. 2000"
            value={localTargetAmount}
            onChange={handleTargetAmountChange}
            min="0"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
        </div>
        <div>
          <label htmlFor="color-tag">Budget Category:</label>
          <select name="budget-category" id="budget-category">
            {budgetCategories.map((category) => {
              const { key, label } = category;
              return (
                <option key={key} value={key}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="color-tag">Color Tag:</label>
          <select
            name="color-tag"
            id="color-tag"
            onChange={(e) => setColorTag(e.target.value)}
          >
            {colorOptions.map((color) => {
              const { key, label } = color;
              return (
                <option key={key} value={key}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-end mt-4">
          <button
            onClick={() => {
              setShowAddEditPot(false);
              setPotName("");
              setLocalTargetAmount("");
            }}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
