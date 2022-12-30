# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_12_30_193710) do
  create_table "airports", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "aiport_id", null: false
    t.string "name"
    t.string "city"
    t.string "county"
    t.string "IATA_FAA"
    t.string "ICAO"
    t.decimal "lat", precision: 10, scale: 6, default: "0.0", null: false
    t.decimal "long", precision: 10, scale: 6, default: "0.0", null: false
    t.string "altitude"
    t.string "timezone"
    t.integer "map_id"
    t.index ["map_id"], name: "index_airports_on_map_id"
  end

  create_table "maps", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "map_id", null: false
    t.index ["map_id"], name: "index_maps_on_map_id", unique: true
  end

end
