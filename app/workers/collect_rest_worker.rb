require 'sidekiq'


class CollectRestWorker
  include Sidekiq::Worker

  sidekiq_options retry: false

  def perform (params)
    restaurant_count = 0
    # get variables from system params
    # get the count from db
    # update db count
    # get the rest by count save to db
    collect_rest (restaurant_count)
    # call get reviews async
    # set timer for next rest
  end

  def collect_rest (index)
    conn = Faraday::Connection.new
    res = conn.get do |req|
      req.url 'https://developers.zomato.com/api/v2.1/search', start: index, count: 1, entity_id: 280, entity_type: 'city'
      req.headers['Content-Type'] = 'application/json'
      req.headers['user-key'] = '5dff5d0b63d5c257a3c6bee533de22ff'
    end
    if res.success?
      hash = JSON.parse(res.body,  object_class: OpenStruct)
      hash['restaurants'].each do |restaurant|
        rest_params = {
            name: restaurant.restaurant.name,
            cuisine: restaurant.restaurant.cuisines.split(",")[0],
            address: restaurant.restaurant.location.address,
            max_delivery_time: rand(120),
            business_friendly: true
        }
        create(rest_params)

      end
    end
  end


  def create(rest_params)
    Restaurant.create (rest_params) if Restaurant.find_by_name(rest_params[:name]).nil?
  end
end
