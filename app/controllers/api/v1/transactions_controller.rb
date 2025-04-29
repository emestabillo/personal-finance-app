class Api::V1::TransactionsController < ApplicationController
  before_action :authenticate_user!

  def index
    @transactions = current_user.transactions
    render json: @transactions
  end
end
