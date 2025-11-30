class Api::V1::BudgetsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_budget, only: [:show, :update, :destroy]

  def index
    @budgets = current_user.budgets.order(created_at: :desc)
    render json: serialize_budgets(@budgets)
  end

  def show
    render json: serialize_budget(@budget)
  end

  def create
    @budget = current_user.budgets.new(budget_params)

    if @budget.save
      render json: serialize_budget(@budget), status: :created
    else
      render json: { errors: @budget.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @budget.update(budget_params)
      render json: serialize_budget(@budget)
    else
      render json: @budget.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @budget.destroy
    head :no_content
  end

  private

  def set_budget
    @budget = current_user.budgets.find(params[:id])
  end

  def budget_params
      params.require(:budget).permit(:maximum_cents, :category)
  end
end