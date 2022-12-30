class ChangeTypeOnLatAndLong < ActiveRecord::Migration[7.0]
  def change
    change_column :airports, :lat, :decimal, precision: 10, scale: 6, null: false, default: 0
    change_column :airports, :long, :decimal, precision: 10, scale: 6, null: false, default: 0
  end
end
