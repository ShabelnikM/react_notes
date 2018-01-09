# frozen_string_literal: true
Rails.application.routes.draw do

  devise_for :users
  root to: 'notes#index'
  resource :notes, only: %i[create destroy]
end
