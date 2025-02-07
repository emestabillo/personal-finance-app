class CreatePots < ActiveRecord::Migration[7.1]
  def change
    create_table :pots do |t|
      t.string :name
      t.numeric :total_saved
      t.numeric :target_amount

      t.timestamps
    end
  end
end
