class AddMapIdToAirports < ActiveRecord::Migration[7.0]
  def change
    add_column :airports, :map_id, :integer
    add_index  :airports, :map_id
  end
end
