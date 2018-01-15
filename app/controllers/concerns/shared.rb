# frozen_string_literal: true

module Shared
  extend ActiveSupport::Concern

  def create_action(resource)
    if resource.save
      render json: resource, status: 201
    else
      render json: resource.errors, status: 422
    end
  end

  def update_action(resource, updated_params, responce)
    if resource.update(updated_params)
      render json: responce, status: 200
    else
      render json: resource.errors, status: 422
    end
  end

  def destroy_action(resource)
    if resource.destroy
      render json: resource.class.all, status: 200
    else
      render json: resource.errors, status: 422
    end
  end
end
