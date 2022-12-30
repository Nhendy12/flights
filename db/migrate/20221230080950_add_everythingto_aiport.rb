class AddEverythingtoAiport < ActiveRecord::Migration[7.0]
  def change
    add_column :airports, :aiport_id, :string, null: false
    add_index :airports, :aiport_id, unique: true

    add_column :airports, :name, :string
    add_column :airports, :city, :string
    add_column :airports, :county, :string
    add_column :airports, :IATA_FAA, :string
    add_column :airports, :ICAO, :string
    add_column :airports, :lat, :string
    add_column :airports, :long, :string
    add_column :airports, :altitude, :string
    add_column :airports, :timezone, :string
  end
end
