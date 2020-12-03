class AddDirectionToTransportEvents < ActiveRecord::Migration[6.0]
  def change
    add_column :transport_events, :direction, :string
  end
end
