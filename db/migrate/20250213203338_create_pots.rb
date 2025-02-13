class CreatePots < ActiveRecord::Migration[7.1]
  def change
    create_table :pots do |t|
      t.string :name
      t.integer :total_saved_cents, default: 0
      t.integer :target_amount_cents, default: 0
      
      t.timestamps
    end
  end
end
