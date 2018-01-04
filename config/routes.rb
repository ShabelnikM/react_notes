# frozen_string_literal: true
Rails.application.routes.draw do

  root to: 'notes#index'
  resource :notes, only: %i[create destroy]
end
