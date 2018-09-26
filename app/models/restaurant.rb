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

end
