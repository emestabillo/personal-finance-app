class Pot < ApplicationRecord
  belongs_to :user
  monetize :total_saved_cents, as: :total_saved
  monetize :target_amount_cents, as: :target_amount

  def percentage_saved
    return 0 if target_amount_cents.zero?
   (total_saved_cents.to_f / target_amount_cents) * 100
  end
end