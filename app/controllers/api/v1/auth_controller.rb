class Api::V1::AuthController < ApplicationController
  before_action :authenticate_user!

  def validate
    render json: {valid: true}, status: :ok
  end
end
