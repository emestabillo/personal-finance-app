class CreateBudgets < ActiveRecord::Migration[7.1]
  def change
    create_table :budgets do |t|
      t.references :user, null: false, foreign_key: true
      t.string :category, null: false
      t.integer :maximum_cents, null: false, default: 0
      t.timestamps
    end

    add_index :budgets, [:user_id, :category], unique: true
  end
end
