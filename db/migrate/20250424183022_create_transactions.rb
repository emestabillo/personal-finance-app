class CreateTransactions < ActiveRecord::Migration[7.1]
  def change
    create_table :transactions do |t|
      t.string :recipient_sender, null: false
      t.string :avatar_url
      t.string :category
      t.date :transaction_date, null: false
      t.string :transaction_type, null: false
      t.integer :amount_cents, default: 0, null: false
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end

    add_index :transactions, :transaction_date
    add_index :transactions, :category
    add_index :transactions, :transaction_type
  end
end
