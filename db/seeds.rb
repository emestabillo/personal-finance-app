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