class RestaurantsController < ApplicationController
  before_action :set_restaurant, only: [:show, :edit, :update, :destroy]

  # GET /restaurants
  # GET /restaurants.json
  def index
    @restaurants = Restaurant.all
    render json: @restaurants
  end

  # GET /restaurants/1
  # GET /restaurants/1.json
  def show
    render json: @restaurant
  end

  # GET /restaurants/new
  def new
    @restaurant = Restaurant.new
  end

  # GET /restaurants/1/edit
  def edit
  end

  # POST /restaurants
  # POST /restaurants.json
  def create
    @restaurant = Restaurant.create(restaurant_params)
      if @restaurant.save
        render json: @restaurant
      else
        render json: @restaurant.errors
      end

  end

  # PATCH/PUT /restaurants/1
  # PATCH/PUT /restaurants/1.json
  def update
      if @restaurant.update(restaurant_params)
        render json: @restaurant
      else
        render json: @restaurant.errors
      end
  end

  # DELETE /restaurants/1
  # DELETE /restaurants/1.json
  def destroy
    @restaurant.destroy
    render status: Rack::Utils.status_code(:ok), json: @restaurant
  end

  private
    def set_restaurant
      @restaurant = Restaurant.find(params[:id])
    end

    def restaurant_params
      params.require(:restaurant).permit(:name, :cuisine, :rating, :business_friendly, :address, :max_delivery_time)
    end
end
