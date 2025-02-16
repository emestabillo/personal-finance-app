class AddUserToPots < ActiveRecord::Migration[7.1]
  def change
    add_reference :pots, :user, null: false, foreign_key: true
  end
end
