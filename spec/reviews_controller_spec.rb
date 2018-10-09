require 'rails_helper'

describe  ReviewsController , :type => :controller do
  context 'GET #index' do
    it 'has a 200 status code' do
      get :index
      expect(response).to have_http_status(:success)
    end
    it 'returns json' do
      get :index
      expect(response.content_type).to eq 'application/json'
    end
  end

  context 'POST a new review' do
    let(:restaurant) { FactoryBot.create(:restaurant)}
    let(:review) { FactoryBot.build_stubbed :random_review, restaurant_id: restaurant.id }

    it 'has a 200 status code' do
      post :create, params:  {review: review.as_json}
      expect(response).to have_http_status(:success)
    end

    it 'create a new review' do
      post :create, params:  {review: review.as_json}
      expect(response.body).to include('id')
    end

    it 'returns json' do
      post :create, params:  {review: review.as_json}
      expect(response.content_type).to eq 'application/json'
    end
  end

  context 'POST a review for a missing restaurant' do
    let(:review) { FactoryBot.build_stubbed :random_review, restaurant_id: 403 }

    it 'has a 200 status code' do
      post :create, params:  {review: review.as_json}
      expect(response).to have_http_status(:forbidden)
    end
  end


  context 'adding a review' do
    let(:restaurant) {FactoryBot.create(:restaurant)}

     it 'check restaurant review updated' do
       review = FactoryBot.create(:random_review, restaurant_id: restaurant.id, rating: 2)
       expect(restaurant.reload.rating).to eq review.rating
     end
  end


end