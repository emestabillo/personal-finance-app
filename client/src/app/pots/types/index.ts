export interface PotProps {
  id: number;
  name: string;
  total_saved: string;
  target_amount: string;
  percentage_saved: number;
}

export interface ManagePotFundsProps {
  pot: PotProps;
  setSelectedPot: (pot: PotProps) => void;
  setActionType: (action: "add" | "withdraw") => void;
  setManagePotFundsModalIsOpen: (managePotFundsModalIsOpen: boolean) => void;
  showOptionsDropdown: boolean;
  setShowOptionsDropdown: (managePotFundsModalIsOpen: boolean) => void;
}

export interface DeletePotModalProps {
  pot: PotProps;
  showDeletePotModal: boolean;
  setShowDeletePotModal: (show: boolean) => void;
  onDeleteSuccess: () => void;
}

export interface ModalProps {
  managePotFundsModalIsOpen: boolean;
  onClose: () => void;
  selectedPot: {
    id: number;
    name: string;
    total_saved: string;
    target_amount: string;
    percentage_saved: number;
  };
  actionType: "add" | "withdraw";
  amount: number;
  setAmount: (amount: number) => void;
  handleAction: () => void;
}
