# frozen_string_literal: true
class ApplicationController < ActionController::Base
  include Pundit
  protect_from_forgery with: :exception
  rescue_from Pundit::NotAuthorizedError, with: :auth_error

  private

  def auth_error(_)
    render json: { error: 'You are not allowed to perform this action!' }, status: 403
  end
end
