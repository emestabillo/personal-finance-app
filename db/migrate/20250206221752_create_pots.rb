class CreatePots < ActiveRecord::Migration[7.1]
  def change
    create_table :pots do |t|
      t.string :name
      t.integer :total
      t.integer :target
      
      t.timestamps
    end
  end
end
