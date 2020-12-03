class CreateComments < ActiveRecord::Migration[6.0]
  def change

    create_table :lines do |t|
      t.string :name
      t.timestamps
    end
    
    create_table :comments do |t|
      t.string :body
      t.references :line, foreign_key: true
      t.references :user, foreign_key: true
      t.timestamps

      
    end
  end
end
