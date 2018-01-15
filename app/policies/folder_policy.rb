# frozen_string_literal: true
class FolderPolicy
  attr_reader :user, :folder

  def initialize(user, folder)
    @user = user
    @folder = folder
  end

  def destroy?
    owner?
  end

  private

  def owner?
    @user == @folder.user
  end
end
