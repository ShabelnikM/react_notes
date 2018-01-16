# frozen_string_literal: true
class FoldersController < ApplicationController
  include Shared
  before_action :authenticate_user!

  def show
    folder = Folder.find(params[:id])
    if folder.user == current_user
      @folder = folder
      @folders = Folder.by_user(current_user)
      @notes = folder.notes
    else
      redirect_to root_url
    end
  end

  def create
    folder = current_user.folders.create(folder_params)
    create_action folder
  end

  def destroy
    folder = Folder.find(params[:id])
    authorize folder
    destroy_action folder
  end

  private

  def folder_params
    params.require(:folder).permit %i[title]
  end
end
