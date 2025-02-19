import { DeletePotModalProps } from "../types";
import { deletePot } from "../utils/potApi";
import { cn } from "@/lib/utils";

export default function DeletePotModal({
  pot,
  showDeletePotModal,
  setShowDeletePotModal,
  onDeleteSuccess,
}: DeletePotModalProps) {
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found. Please log in.");
      return;
    }

    try {
      await deletePot(pot.id, token);
      console.log("Pot deleted successfully");
      onDeleteSuccess();
      setShowDeletePotModal(false);
    } catch (error) {
      console.error("Error deleting pot:", error);
      console.log("Failed to delete pot. Please try again.");
    }
  };
  return (
    <div
      className={cn(`fixed inset-0 invisible max-h-0 z-10`, {
        "visible max-h-[100rem]": showDeletePotModal,
      })}
    >
      <div className="flex items-center justify-center bg-black bg-opacity-50 h-full">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h3 className="text-xl font-bold mb-4">
            Delete &apos;{pot.name}&apos;
          </h3>
          <p>Are you sure?</p>
          <button className="w-full border" onClick={handleDelete}>
            Yes, confirm deletion
          </button>
          <button
            className="w-full border"
            onClick={() => {
              setShowDeletePotModal(false);
            }}
          >
            No, go back
          </button>
        </div>
      </div>
    </div>
  );
}
