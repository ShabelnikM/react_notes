# frozen_string_literal: true
class NotesConnectionController < ApplicationController
  include Shared
  before_action :authenticate_user!
  before_action :set_resources

  def update
    update_action(@note, { folder: @folder }, { status: 'Note added' })
  end

  def destroy
    update_action(@note, { folder: nil }, @folder.notes)
  end

  private

  def set_resources
    @folder = Folder.find(params[:id])
    @note = Note.find(params[:note_id])
  end
end
