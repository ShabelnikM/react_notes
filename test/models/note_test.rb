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

require 'test_helper'

class NoteTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
