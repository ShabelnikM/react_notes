# frozen_string_literal: true
# == Schema Information
#
# Table name: notes
#
#  id         :integer          not null, primary key
#  text       :text
#  color      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#  folder_id  :integer
#

class Note < ApplicationRecord
  belongs_to :user
  belongs_to :folder, optional: true

  validates :color, :text, :user, presence: true
  validates :text, length: { minimum: 2, maximum: 200 }

  scope :by_user, ->(user) { where(user: user) }
  scope :by_empty_folder, ->{ where(folder: nil) }
end
