# frozen_string_literal: true
# == Schema Information
#
# Table name: folders
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Folder < ApplicationRecord
  belongs_to :user
  has_many :notes

  validates :title, :user, presence: true
  validates :title, length: { minimum: 2, maximum: 50 }

  scope :by_user, ->(user) { where(user: user) }
end
