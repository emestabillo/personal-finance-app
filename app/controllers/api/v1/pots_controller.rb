class Api::V1::PotsController < ApplicationController
  before_action :set_pot, only: [:show, :update, :destroy]

  # GET /pots
  def index
    @pots = Pot.all
    render json: @pots
  end

  # GET /pots/1
  def show
    render json: @pot
  end

  # POST /pots
  def create
    @pot = Pot.new(pot_params)

    if @pot.save
     render json: @pot, status: :created, location: @pot
    else
      render json: @pot.errors, status: :unprocessable_entity
    end
  end

  def update
    if @pot.update(pot_params)
      render json: @pot
    else
      render json: @pot.errors, status: :unprocessable_entity
    end
  end

  # DELETE /pots/1
  def destroy
    @pot.destroy
  end

  private

  def set_pot
    @pot = Pot.find(params[:id])
  end

  def pot_params
    params.require(:pot).permit(:name, :total_saved_cents, :target_amount_cents)
  end
end
