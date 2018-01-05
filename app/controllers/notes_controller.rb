# frozen_string_literal: true
class NotesController < ApplicationController
  before_action :authenticate_user!, except: %i[index]

  def index
    @notes = Note.where(user: current_user) if current_user.present?
  end

  def create
    note = current_user.notes.create(note_params)
    if note.save
      render json: note, status: 201
    else
      render json: note.errors, status: 422
    end
  end

  def destroy
    note = Note.find(params[:id])
    if note.destroy
      render json: Note.all, status: 200
    else
      render json: { errors: note.errors }, status: 422
    end
  end

  private

  def note_params
    params.require(:note).permit %i[text color]
  end
end
