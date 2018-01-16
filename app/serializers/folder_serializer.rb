# frozen_string_literal: true

class FolderSerializer < ActiveModel::Serializer
  attributes %i[
    id
    title
  ]

  has_many :notes
end
