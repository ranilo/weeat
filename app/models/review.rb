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
  before_save :clean_comments
  after_save :update_rating
  after_destroy :update_rating

  def update_rating
    restaurant.update_rating
  end

  def clean_comments
    self.comment = comment.gsub!(/[^0-9A-Za-z]/, '')

  end

end
