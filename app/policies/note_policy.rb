# frozen_string_literal: true
class NotePolicy
  attr_reader :user, :note

  def initialize(user, note)
    @user = user
    @note = note
  end

  def update?
    owner?
  end

  def destroy?
    owner?
  end

  private

  def owner?
    @user == @note.user
  end
end
