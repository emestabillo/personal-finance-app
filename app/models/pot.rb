class Pot < ApplicationRecord
  belongs_to :user
  monetize :total_saved_cents, with_model_currency: :total_saved_currency
  monetize :target_amount_cents, with_model_currency: :target_amount_currency
end
