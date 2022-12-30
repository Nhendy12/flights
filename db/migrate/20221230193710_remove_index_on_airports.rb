class RemoveIndexOnAirports < ActiveRecord::Migration[7.0]
  def change
    remove_index :airports, :aiport_id
  end
end
