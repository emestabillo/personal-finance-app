class Api::V1::PotsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_pot, only: [:show, :update, :destroy]

  def index
    @pots = current_user.pots
    render json: @pots
  end

  def show
    @pot = current_user.pots.find(params[:id])
    render json: @pot
  end

  def create
    @pot = current_user.pots.new(pot_params)

    if @pot.save
     render json: @pot, status: :created
    else
      render json: @pot.errors, status: :unprocessable_entity
    end
  end

  def update
    @pot = current_user.pots.find(params[:id])
    if @pot.update(pot_params)
      render json: @pot
    else
      render json: @pot.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @pot = current_user.pots.find(params[:id])
    @pot.destroy
  end

  private

  def pot_params
    params.require(:pot).permit(:name, :total_saved_cents, :target_amount_cents)
  end
end
