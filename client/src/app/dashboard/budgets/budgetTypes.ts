export type BudgetProps = {
  id: number;
  name: string;
  total_saved: string;
  target_amount: string;
  percentage_saved: number;
};

export type budgetComponentProps = {
  // budget: PotProps;
  // setSelectedBudget: (budget: BudgetProps) => void;
  // setActionType: (action: "add" | "withdraw") => void;
  setManageBudgetFundsModalIsOpen: (
    manageBudgetFundsModalIsOpen: boolean
  ) => void;
  showOptionsDropdown: boolean;
  setShowOptionsDropdown: (show: boolean) => void;
  showDeleteBudgetModal: boolean;
  setShowDeleteBudgetModal: (show: boolean) => void;
  setAddOrEditModal: (mode: "add" | "edit") => void;
  setShowAddEditBudget: (show: boolean) => void;
};
