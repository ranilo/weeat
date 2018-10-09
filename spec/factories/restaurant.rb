FactoryBot.define do
  factory :restaurant do
    name {Faker::Name.name}
    cuisine {Faker::Name.name}
    rating {0}
    address {Faker::Address}
    max_delivery_time {Faker::Number.rand}
    business_friendly {Faker::Boolean}
  end
end
