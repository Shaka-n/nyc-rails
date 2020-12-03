class Station < ApplicationRecord
    has_many :transport_events
    has_many :favorites
    has_many :users, through: :favorites
end
