class PotsController < ApplicationController
  def index
    @pots = Pot.all
    render json: @pots
  end

  def show
    render json: @pot
  end

  # def create
  #   @pot = Pot.new(pot_params)

  #   if @pot.save
  #     redirect_to pots_path, notice: "Pot created successfully"
  #   else
  #     render :new
  #   end
  # end

  # def destroy
  #   @pot.destroy
  #   redirect_to pots_path, notice: "Pot deleted successfully"
  # end

  private

  def set_pot
    @pot = Pot.find(params[:id])
  end
end
