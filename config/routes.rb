# frozen_string_literal: true
Rails.application.routes.draw do

  devise_for :users
  root to: 'notes#index'
  resources :folders, only: %i[show create destroy]
  put 'folders/:id/notes/:note_id', to: 'notes_connection#create'
  delete 'folders/:id/notes/:note_id', to: 'notes_connection#destroy'
  resources :notes, only: %i[create destroy]
end
