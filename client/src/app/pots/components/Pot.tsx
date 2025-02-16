import { cn } from "@/lib/utils";

export interface PotProps {
  id: number;
  name: string;
  total_saved: string;
  target_amount: string;
  percentage_saved: number;
}

export interface PotComponentProps {
  pot: PotProps;
  setSelectedPot: (pot: PotProps) => void;
  setActionType: (action: "add" | "withdraw") => void;
  setIsModalOpen: (isOpen: boolean) => void;
  showOptionsDropdown: boolean;
  setShowOptionsDropdown: (isOpen: boolean) => void;
}

export default function Pot({
  pot,
  setSelectedPot,
  setActionType,
  setIsModalOpen,
  showOptionsDropdown,
  setShowOptionsDropdown,
}: PotComponentProps) {
  return (
    <div key={pot.id} className="mb-4 p-4 border border-gray-200 rounded">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">{pot.name}</h2>
        <div className="relative">
          <button onClick={() => setShowOptionsDropdown(!showOptionsDropdown)}>
            ...
          </button>
          <div
            className={cn(
              `absolute border left-[-5rem] max-w-max max-h-0 invisible border-gray-200 bg-white rounded p-2`,
              { 'visible max-h-[10rem]': showOptionsDropdown }
            )}
          >
            <button className="w-full">Edit pot</button>
            <button className="w-full">Delete pot</button>
          </div>
        </div>
      </div>
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
