require 'rails_helper'

FactoryBot.define do
  factory :restaurant do
  end
end


describe  ReviewsController , :type => :controller do
  context "GET index" do
    it "has a 200 status code" do
      get :index
      expect(response.status).to eq(200)
      expect(response.content_type).to eq "application/json"
    end
  end

  context 'POST a new review' do
    let(:restaurant) { FactoryBot.create(:restaurant)}
    let(:rating) {3}

    it "create a new review" do
      comment_str = "test comment"
      post :create, :params => {:review => {:name=>"test rev", :comment=>comment_str, :rating=>rating, :restaurant_id=>restaurant.id}}
      expect(response.status).to eq(200)
      expect(response.body).to include(comment_str)
      expect(controller.update_rating restaurant: restaurant).to eq rating
    end
  end


end