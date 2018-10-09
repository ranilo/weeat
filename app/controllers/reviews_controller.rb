class ReviewsController < ApplicationController
  before_action :set_review, only: [:show, :edit, :update, :destroy]
  before_action :set_restaurant, only: [:create, :update]

  # GET /reviews
  # GET /reviews.json
  def index
    render_json content: Review.all
  end

  # GET /reviews/1
  # GET /reviews/1.json
  def show
    render_json content: @review
  end

  # GET /reviews/1/edit
  def edit
  end

  # POST /reviews
  # POST /reviews.json
  def create
    if @restaurant.present?
      review = Review.new(review_params)
      if review.save
        render_json content: review
      else
        render_json content: review.errors
      end
    else
      render json: {error: "restaurant id #{review_params[:restaurant_id]} does not exist"}, status: :forbidden
    end
  end

  # PATCH/PUT /reviews/1
  # PATCH/PUT /reviews/1.json
  def update
    if @restaurant.present?
      if @review.present?
        if @review.update(review_params)
          render_json content: @review
        else
          render_json content: @review.errors
        end
      end
    end

  end

  # DELETE /reviews/1
  # DELETE /reviews/1.json
  def destroy
    @review.destroy
  end


  def render_json (params)
    if (params[:content].nil?)
      render json:{}, status: :ok
    else
      render json: params[:content]
    end
  end

  private

  def set_review
    @review = Review.find_by_id(params[:id])
  end

  def set_restaurant
    @restaurant = Restaurant.find_by_id(params[:review][:restaurant_id])
  end

  def review_params
    params.require(:review).permit(:name, :rating, :comment, :restaurant_id)
  end
end
