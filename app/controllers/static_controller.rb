class StaticController < ApplicationController

  def index
    @notes = Note.all
  end
end
