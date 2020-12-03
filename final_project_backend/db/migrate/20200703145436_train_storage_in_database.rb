class TrainStorageInDatabase < ActiveRecord::Migration[6.0]
  def change

    create_table :transport_events do |table|
      table.string :station_code
      table.references :station, foreign_key: true
      table.timestamp :arrival
      table.timestamp :departure
      table.timestamps
    end

    create_table :users do |table|
      table.string :name
      table.references :station
    end

    create_table :favorites do |table|
      table.references :user, foreign_key: true
      table.references :station, foreign_key: true
      table.timestamps
    end
  end
end
