# frozen_string_literal: true

class FolderSerializer < ActiveModel::Serializer
  attributes %i[
    id
    user
    folder
    color
    text
  ]
end
