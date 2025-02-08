class CreatePots < ActiveRecord::Migration[7.1]
  def change
    create_table :pots do |t|
      t.string :name
      t.integer :total_saved
      t.integer :target_amount

      t.timestamps
    end
  end
end