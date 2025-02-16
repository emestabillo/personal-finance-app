class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :created_at

  has_many :pots, serializer: PotSerializer
end
