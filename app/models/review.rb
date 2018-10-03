# == Schema Information
#
# Table name: reviews
#
#  id            :bigint(8)        not null, primary key
#  name          :string
#  rating        :integer
#  comment       :text
#  restaurant_id :bigint(8)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Review < ApplicationRecord
  belongs_to :restaurant
  validates_inclusion_of :rating, in: 0..3

end
