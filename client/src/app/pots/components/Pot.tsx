export interface PotProps {
  id: number;
  name: string;
  total_saved: string;
  target_amount: string;
  percentage_saved: number;
}

interface PotComponentProps {
  pot: PotProps;
  setSelectedPot: (pot: PotProps) => void;
  setActionType: (action: "add" | "withdraw") => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function Pot({
  pot,
  setSelectedPot,
  setActionType,
  setIsModalOpen,
}: PotComponentProps) {
  return (
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
  );
}
