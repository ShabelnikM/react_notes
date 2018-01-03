# frozen_string_literal: true
class StaticController < ApplicationController

  def index
    @notes = Note.all
  end
end
