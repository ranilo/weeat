class ReviewsController < ApplicationController
  before_action :set_review, only: [:show, :edit, :update, :destroy]
  before_action :set_restaurant, only: [:create, :update]

  # GET /reviews
  # GET /reviews.json
  def index
    @reviews = Review.all
    render_json content: @reviews
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
    if (@restaurant)
      @review = Review.new(review_params)

      if @review.save
        render json: @review
      else
        render json: @review.errors
      end
    else
      render json: {:error=>"restaurant #{review_params[:restaurant_id]} dose not exist"}, status: Rack::Utils.status_code(:forbidden)
    end
  end

  # PATCH/PUT /reviews/1
  # PATCH/PUT /reviews/1.json
  def update
    if @restaurant
      if @review.update(review_params)
        render json: @review
      else
        render json: @review.errors
      end
    end

  end

  # DELETE /reviews/1
  # DELETE /reviews/1.json
  def destroy
    @review.destroy
    render status: 200, json: @review
  end


  def render_json (params)
    if (params[:content].nil?)
      render status: Rack::Utils.status_code(:ok), json: {}
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
      @restaurant = nil
    end

  end

  def review_params
    params.require(:review).permit(:name, :rating, :comment, :restaurant_id)
  end
end
