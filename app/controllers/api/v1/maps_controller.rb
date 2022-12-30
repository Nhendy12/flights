class Api::V1::MapsController < ApplicationController
  before_action :set_map, only: %i[ show update destroy ]

  # GET /maps
  def index
    @maps = Map.all

    render json: @maps
  end

  # GET /maps/1
  def show
    render json: @map
  end

  # POST /maps
  def create
    # Check that a file has been provided
    unless params[:file]
      render json: { error: 'No file provided' }, status: :bad_request
      return
    end

    # Parse the CSV file
    begin
      csv_data = CSV.parse(params[:file].read, headers: true)
    rescue CSV::MalformedCSVError
      render json: { error: 'Invalid CSV file' }, status: :bad_request
      return
    end

    puts map_params
    puts "-----------------------"

    #@map = Map.new(map_params)

    #if @map.save
     # render json: @map, status: :created, location: @map
    #else
     # render json: @map.errors, status: :unprocessable_entity
    #end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_map
      @map = Map.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def map_params
      params.require(:map).permit(:map_id)
    end
end
