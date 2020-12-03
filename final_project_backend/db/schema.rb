# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_11_30_180514) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.string "body"
    t.bigint "line_id"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "rating"
    t.index ["line_id"], name: "index_comments_on_line_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "favorites", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "station_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "gtfs_stop_id"
    t.index ["station_id"], name: "index_favorites_on_station_id"
    t.index ["user_id"], name: "index_favorites_on_user_id"
  end

  create_table "lines", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "stations", force: :cascade do |t|
    t.string "complex_id"
    t.string "gtfs_stop_id"
    t.string "division"
    t.string "route"
    t.string "stop_name"
    t.string "borough"
    t.string "lines"
    t.string "structure"
    t.string "gtfs_lat"
    t.string "gtfs_long"
    t.string "north_d_label"
    t.string "south_d_label"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "transport_events", force: :cascade do |t|
    t.string "station_code"
    t.bigint "station_id"
    t.datetime "arrival"
    t.datetime "departure"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "direction"
    t.index ["station_id"], name: "index_transport_events_on_station_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.bigint "station_id"
    t.index ["station_id"], name: "index_users_on_station_id"
  end

  add_foreign_key "comments", "lines"
  add_foreign_key "comments", "users"
  add_foreign_key "favorites", "stations"
  add_foreign_key "favorites", "users"
  add_foreign_key "transport_events", "stations"
end
