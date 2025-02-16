# class PotsController < ApplicationController
#   def index
#     @pots = current_user.pots
#     render json: PotSerializer.new(@pots).serializable_hash[:data].map { |pot| pot[:attributes] }
#   end

#   def show
#     @pot = current_user.pots.find(params[:id])
#     render json: PotSerializer.new(@pot).serializable_hash[:data][:attributes]
#   end

#   def create
#     @pot = current_user.pots.new(pot_params)

#     if @pot.save
#       render json: PotSerializer.new(@pot).serializable_hash[:data][:attributes]
#     else
#       render json: @pot.errors, status: :unprocessable_entity
#     end
#   end

#   def update
#     @pot = current_user.pots.find(params[:id])
#     if @pot.update(pot_params)
#       render json: PotSerializer.new(@pot).serializable_hash[:data][:attributes]
#     else
#       render json: @pot.errors, status: :unprocessable_entity
#     end
#   end

#   def destroy
#     @pot = current_user.pots.find(params[:id])
#     @pot.destroy
#     head :no_content
#   end

#   private

#   def pot_params
#     params.require(:pot).permit(:name, :total_saved_cents, :target_amount_cents, :user_id)
#   end
# end

# # pot serializer
# class PotSerializer
#   include JSONAPI::Serializer
  
#   attributes :id, :name, :user_id, :created_at, :updated_at

#   attribute :total_saved do |object|
#     Money.new(object.total_saved_cents).format
#   end

#   attribute :target_amount do |object|
#     Money.new(object.target_amount_cents).format
#   end
# end