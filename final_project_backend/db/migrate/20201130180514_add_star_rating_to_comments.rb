class AddStarRatingToComments < ActiveRecord::Migration[6.0]
  def change
    add_column :comments, :rating, :integer
  end
end
