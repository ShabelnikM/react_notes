# frozen_string_literal: true
class NotesController < ApplicationController
  include Shared
  before_action :authenticate_user!, except: %i[index]

  def index
    if current_user.present?
      @folders = Folder.by_user(current_user)
      @notes = Note.by_user(current_user).by_empty_folder
    end
  end

  def create
    note = current_user.notes.create(note_params)
    create_action note
  end

  def destroy
    note = Note.find(params[:id])
    authorize note
    destroy_action note
  end

  private

  def note_params
    params.require(:note).permit %i[text color]
  end
end
