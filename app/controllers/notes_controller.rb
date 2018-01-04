# frozen_string_literal: true
class NotesController < ApplicationController

  def index
    @notes = Note.all
  end

  def create
    note = Note.create(note_params)
    if note.save
      render json: note, status: 201
    else
      render json: note.errors, status: 422
    end
  end

  def destroy
    note = Note.find(params[:id])
    if note.destroy
      render json: {}, status: 204
    else
      render json: { errors: note.errors }, status: 422
    end
  end

  private

  def note_params
    params.require(:note).permit %i[text color]
  end
end
