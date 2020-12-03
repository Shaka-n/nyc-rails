class User < ApplicationRecord
    has_many :favorites
    has_many :comments
    has_many :stations, through: :favorites
end
