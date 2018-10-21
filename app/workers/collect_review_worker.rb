require 'sidekiq'


class CollectReviewWorker
  include Sidekiq::Worker

  sidekiq_options retry: false

  def perform (params)
    collect_review (params)
  end

  def collect_review (params)
    conn = Faraday::Connection.new
    res = conn.get do |req|
      req.url 'https://developers.zomato.com/api/v2.1/reviews', res_id: params[:index], count: 5, start: 0
      req.headers['Content-Type'] = 'application/json'
      req.headers['user-key'] = '5dff5d0b63d5c257a3c6bee533de22ff'
    end
    if res.success?
      hash = JSON.parse(res.body,  object_class: OpenStruct)
      hash['user_reviews'].each do |review|
        review_params = {
            name: review.review.user.name,
            rating:review.review.rating-2,
            comment: review.review.review_text,
            restaurant_id: params['id']
        }
        create(review_params)

      end
    end
  end


  def create(params)
    # puts params
   review =  Review.create (params)
    puts review.id
  end
end
