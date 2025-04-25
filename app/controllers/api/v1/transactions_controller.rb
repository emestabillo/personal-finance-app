class Api::V1::TransactionsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_transaction, only: [:show, :update, :destroy]

  def index
    @transactions = current_user.transactions
    render json: transactions
  end
end
