# == Schema Information
#
# Table name: restaurants
#
#  id                :bigint(8)        not null, primary key
#  name              :string
#  cuisine           :string
#  rating            :integer
#  address           :text
#  max_delivery_time :decimal(, )
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  business_friendly :boolean
#

class Restaurant < ApplicationRecord
  has_many :reviews

  def update_rating
    reload
    size = reviews.length
    updated_rating = size == 0 ? 0 : reviews.to_a.sum {|review| review.rating} / size
    update(rating: updated_rating)
  end


end
