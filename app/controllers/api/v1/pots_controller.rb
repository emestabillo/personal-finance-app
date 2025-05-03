class Api::V1::PotsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_pot, only: [:show, :update, :destroy, :add_money, :withdraw_money]

  def index
    @pots = current_user.pots
    render json: serialize_pots(@pots)
  end

  def show
    @pot = current_user.pots.find(params[:id])
    render json: serialize_pot(@pot)
  end

  def create
    @pot = current_user.pots.new(pot_params)

    if @pot.save
      render json: serialize_pot(@pot)
    else
      render json: @pot.errors, status: :unprocessable_entity
    end
  end

  def update
    @pot = current_user.pots.find(params[:id])
    if @pot.update(pot_params)
      render json: serialize_pot(@pot)
    else
      render json: @pot.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @pot = current_user.pots.find(params[:id])
    @pot.destroy
    head :no_content
  end

  def add_money
    amount = params[:amount].to_i
    if amount > 0
      @pot = current_user.pots.find(params[:id])
      @pot.total_saved_cents += amount

      if @pot.save
       render json: {
        id: @pot.id,
        name: @pot.name,
        total_saved: @pot.total_saved.format,
        target_amount: @pot.target_amount.format,
        percentage_saved: @pot.percentage_saved
      }
      else
        render json: @pot.errors, status: :unprocessable_entity
      end
      
    else
      render json: { error: 'Amount must be greater than 0' }, status: :unprocessable_entity
    end
  end

  def withdraw_money
    amount = params[:amount].to_i
    if amount > 0 && @pot.total_saved_cents >= amount
      @pot = current_user.pots.find(params[:id])
      @pot.total_saved_cents -= amount

      if @pot.save
        render json: {
        id: @pot.id,
        name: @pot.name,
        total_saved: @pot.total_saved.format,
        target_amount: @pot.target_amount.format,
        percentage_saved: @pot.percentage_saved
      }
      else
        render json: @pot.errors, status: :unprocessable_entity
      end

    else
      render json: { error: 'Invalid amount or insufficient funds' }, status: :unprocessable_entity
    end
  end

  private

  def set_pot
    @pot = current_user.pots.find(params[:id])
  end

  def pot_params
    params.require(:pot).permit(:name, :total_saved_cents, :target_amount_cents)
  end

  def serialize_pot(pot)
    PotSerializer.new(pot).serializable_hash[:data][:attributes].merge(
      percentage_saved: pot.percentage_saved
    )
  end

  def serialize_pots(pots)
    pots.map do |pot|
      PotSerializer.new(pot).serializable_hash[:data][:attributes].merge(
        percentage_saved: pot.percentage_saved
      )
    end
  end
end