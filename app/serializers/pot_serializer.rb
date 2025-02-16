class PotSerializer
  include JSONAPI::Serializer
  
  attributes :id, :name, :user_id, :created_at, :updated_at

  attribute :total_saved do |object|
    Money.new(object.total_saved_cents).format
  end

  attribute :target_amount do |object|
    Money.new(object.target_amount_cents).format
  end

  attribute :percentage_saved do |object|
    if object.target_amount_cents > 0
      (object.total_saved_cents.to_f / object.target_amount_cents * 100).round(2)
    else
      0.0
    end
  end
end
