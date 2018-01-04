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
#

class Note < ApplicationRecord;

  validates :text, :color, presence: true
end
