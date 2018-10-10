Rails.application.routes.draw do
  resources :reviews
  resources :restaurants

  root 'application#index'
end