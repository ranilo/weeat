class ReviewsController < ApplicationController
  before_action :set_review, only: [:show, :edit, :update, :destroy]
  before_action :set_restaurant, only: [:create]

  # GET /reviews
  # GET /reviews.json
  def index
    @reviews = Review.all
    render_json content:@reviews
  end

  # GET /reviews/1
  # GET /reviews/1.json
  def show
  end

  # GET /reviews/1/edit
  def edit
  end

  # POST /reviews
  # POST /reviews.json
  def create
    if(@restaurant)
    @review = Review.new(review_params)

      if @review.save
        update_rating restaurant: @restaurant
        render json: @review
      else
        render json: @review.errors
      end
    else
      render json:{}, status:403
      end
    end

  # PATCH/PUT /reviews/1
  # PATCH/PUT /reviews/1.json
  def update
      if @review.update(review_params)
        update_rating restaurant: @restaurant
        render json: @review
      else
        render json: @review.errors
      end
  end

  # DELETE /reviews/1
  # DELETE /reviews/1.json
  def destroy
    @review.destroy
    render status: 200, json: @review
  end

  def update_rating (params)
      restaurant = Restaurant.find(params[:restaurant][:id])
      size = restaurant.reviews.length
      updated = size == 0 ? 0 : restaurant.reviews.to_a.sum{|review| review.rating} / size
      restaurant.rating = updated
      restaurant.save
    restaurant.rating

  end


  def render_json (params)
    if(params[:content].nil?)
      render status:200, json: {}
    else
      render json: params[:content]
    end
  end

  private
    def set_review
      @review = Review.find(params[:id])
    end

    def set_restaurant
      begin
        @restaurant = Restaurant.find(params[:review][:restaurant_id])
      rescue StandardError
        @restaurant= nil
      end

    end

    def review_params
      params.require(:review).permit(:name, :rating, :comment, :restaurant_id)
    end
end
