class Transaction < ApplicationRecord
  belongs_to :user
  monetize :amount_cents, numericality: {greater_than:0}
  
  # Transaction type (required)
  enum transaction_type: { income: "income", expense: "expense" }

  # Categories from dropdown
  CATEGORIES = [
    'Entertainment', 'Bills', 'Groceries', 'Dining Out', 'Transportation', 'Personal Care', 'General'].freeze

  validates :recipient_sender, :transaction_date, :category, presence: true
  validates :category, inclusion: {in: CATEGORIES}
  validates :transaction_type, presence: true
  
  # Virtual attribute for dollar input (handles conversion to cents)
  def amount_dollars=(dollars)
    self.amount_cents = (dollars.to_f * 100).round
  end

  # Convert cents back to dollars for display
  def amount_dollars
    amount_cents.to_f / 100
  end
end
