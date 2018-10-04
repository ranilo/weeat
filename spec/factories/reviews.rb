FactoryBot.define do
  factory :random_review, class: Review do
    name {Faker::Name.name}
    comment {Faker::String.random}
    rating {Faker::Number.rand(0..3)}
  end
end