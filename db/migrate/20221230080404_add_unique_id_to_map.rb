class AddUniqueIdToMap < ActiveRecord::Migration[7.0]
  def change
    add_column :maps, :map_id, :string, null: false
    add_index :maps, :map_id, unique: true
  end
end
