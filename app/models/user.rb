class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable,:jwt_authenticatable, jwt_revocation_strategy: self

  has_many :pots, dependent: :destroy
  has_many :transactions
end
