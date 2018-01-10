# frozen_string_literal: true
Rails.application.routes.draw do

  devise_for :users
  root to: 'notes#index'
  resources :folders, only: %i[show create destroy]
  resources :notes, only: %i[create destroy]
end
