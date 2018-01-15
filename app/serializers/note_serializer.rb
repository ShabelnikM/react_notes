# frozen_string_literal: true

class NoteSerializer < ActiveModel::Serializer
  attributes %i[
    id
    user
    folder
    color
    text
  ]
end
