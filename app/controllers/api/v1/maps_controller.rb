require 'csv'

class Api::V1::MapsController < ApplicationController
  before_action :set_map, only: %i[ show update destroy ]

  # GET /maps
  def index
    @maps = Map.all

    render json: @maps
  end

  # GET /maps/1
  def show
    render json: @map.as_json(include: [:airports])
  end

  # POST /maps
  def create
    # Check that a file has been provided
    unless map_params[:csv_file]
      render json: { error: 'No file provided' }, status: :bad_request
      return
    end

    # Parse the CSV file
    begin
      csv_data = CSV.parse(map_params[:csv_file].read, headers: true, encoding: "ISO8859-1")
    rescue CSV::MalformedCSVError
      render json: { error: 'Invalid CSV file' }, status: :bad_request
      return
    end

    puts map_params
    puts csv_data
    puts "-----------------------"

    @map = Map.create!(map_id: map_params[:map_id])

    if @map
      csv_data.each do |row|
        @map.airports.build(aiport_id: row[0],  name: row[1], city: row[2], county: row[3], IATA_FAA: row[4], ICAO: row[5], lat: row[6].to_f, long: row[7].to_f, altitude: row[8], timezone: row[9])
      end
    end

    if @map.save
      render json: @map, status: :created
    else
      render json: @map.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_map
      @map = Map.where(map_id: params[:id])
    end

    # Only allow a list of trusted parameters through.
    def map_params
      params.require(:map).permit(:map_id, :csv_file)
    end
end
