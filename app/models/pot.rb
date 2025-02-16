class Pot < ApplicationRecord
  belongs_to :user
  monetize :total_saved_cents, as: :total_saved
  monetize :target_amount_cents, as: :target_amount

  def percentage_saved
    (total_saved_cents.to_f / target_amount_cents.to_f) * 100
  end
end