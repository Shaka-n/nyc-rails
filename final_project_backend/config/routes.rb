Rails.application.routes.draw do
  resources :comments
  resources :favorites
  resources :stations
  resources :lines
  resources :transport_events
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
