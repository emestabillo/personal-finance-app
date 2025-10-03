# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
# Create a user
user1 = User.create!(
  email: 'example@example.com',
  password: 'password123',
  password_confirmation: 'password123'
)

user2 = User.create!(
  email: 'example2@example.com',
  password: 'password123',
  password_confirmation: 'password123'
)

# Create a pot for the user
Pot.create!(
  name: 'Vacation Fund',
  total_saved_cents: 50000,  # $500.00
  target_amount_cents: 200000,  # $2,000.00
  user: user1
)
Pot.create!(name: "Italy", total_saved_cents: 30000, target_amount_cents: 900000, user: user2)
Pot.create!(name: "Savings", total_saved_cents: 3200028, target_amount_cents: 10000000, user: user1)

transactions = [
  # User1 transactions
  {
    recipient_or_sender: "Whole Foods",
    amount_dollars: 85.25,
    category: "Groceries",
    transaction_type: "expense",
    transaction_date: Date.current - 2.days,
    user: user1
  },
  {
    recipient_or_sender: "Freelance Payment",
    amount_dollars: 1200.00,
    category: "General",
    transaction_type: "income",
    transaction_date: Date.current - 5.days,
    user: user1
  },
  # User2 transactions
  {
    recipient_or_sender: "Netflix",
    amount_dollars: 15.99,
    category: "Entertainment",
    transaction_type: "expense",
    transaction_date: Date.current - 1.day,
    user: user2
  },
  {
    recipient_or_sender: "Salary Deposit",
    amount_dollars: 2500.00,
    category: "General",
    transaction_type: "income",
    transaction_date: Date.current.beginning_of_month,
    user: user2
  }
]

# Create all transactions
transactions.each do |attrs|
  Transaction.create!(attrs)
end