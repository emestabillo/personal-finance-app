class Api::V1::TransactionsController < ApplicationController
  before_action :authenticate_user!

  def index
    @transactions = current_user.transactions
    render json: @transactions.as_json(
      methods: [:amount_dollars, :formatted_amount]
    )
  end

  def create
    @transaction = current_user.transactions.new(transaction_params)

    if @transaction.save
        render json: @transaction.as_json(
          methods: [:amount_dollars, :formatted_amount]
        ), status: :created
    else
      render json: { error: @transaction.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def transaction_params
    params.require(:transaction).permit(:recipient_sender, :category, :transaction_date, :amount_dollars, :transaction_type)
  end
end
