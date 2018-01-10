# frozen_string_literal: true
class NotesConnectionController < ApplicationController
  before_action :authenticate_user!
  before_action :set_resources

  def create
    case
      when @folder && @note && @folder.user == current_user && @note.user == current_user
        @note.update(folder: @folder)
        render json: { status: 'Note added' }, status: 200
      when @folder && @note && @folder.user == current_user
        render json: { errors: 'You are not note owner' }, status: 422
      when @folder && @note && @note.user == current_user
        render json: { errors: 'You are not folder owner' }, status: 422
      else
        render json: { errors: 'Action not allowed' }, status: 403
    end
  end

  def destroy
    if @note.update(folder: nil)
      render json: @folder.notes, status: 200
    else
      render json: { errors: @note.errors }, status: 422
    end
  end

  private

  def set_resources
    @folder = Folder.find(params[:id])
    @note = Note.find(params[:note_id])
  end
end
