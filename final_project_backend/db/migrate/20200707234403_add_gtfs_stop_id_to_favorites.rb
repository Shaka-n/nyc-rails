class AddGtfsStopIdToFavorites < ActiveRecord::Migration[6.0]
  def change
    add_column :favorites, :gtfs_stop_id, :string
  end
end
