import { ModalProps } from "./potTypes";

export default function ManagePotFundsModal({
  managePotFundsModalIsOpen,
  onClose,
  selectedPot,
  actionType,
  amount,
  setAmount,
  handleAction,
}: ModalProps) {
  if (!managePotFundsModalIsOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow empty input (user can delete all characters)
    if (value === "") {
      setAmount(0);
      return;
    }

    // Parse the input value as a number
    const numericValue = parseFloat(value);

    // Update the state only if the value is a valid non-negative number
    if (!isNaN(numericValue) && numericValue >= 0) {
      setAmount(numericValue);
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    setAmount(0);
    onClose();
  };

  // Handle add/withdraw action
  const handleConfirmAction = () => {
    handleAction();
    setAmount(0);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-bold mb-4">
          {actionType === "add" ? "Add to" : "Withdraw from"} &apos;
          {selectedPot.name}&apos;
        </h3>
        <input
          type="number"
          placeholder="Amount"
          value={amount || ""}
          onChange={handleInputChange}
          min="0"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <p>
          Current percentage saved: {selectedPot.percentage_saved.toFixed(2)}
        </p>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmAction}
            className={`px-4 py-2 ${
              actionType === "add" ? "bg-green-500" : "bg-red-500"
            } text-white rounded hover:${
              actionType === "add" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {actionType === "add" ? "Add" : "Withdraw"}
          </button>
        </div>
      </div>
    </div>
  );
}
