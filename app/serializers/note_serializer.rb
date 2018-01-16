# frozen_string_literal: true

class NoteSerializer < ActiveModel::Serializer
  attributes %i[
    id
    color
    text
  ]
end
