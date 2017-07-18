# == Schema Information
#
# Table name: blocks
#
#  id         :integer          not null, primary key
#  page_id    :integer
#  data       :text
#  type       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Block < ApplicationRecord
  validates :page_id, :type, presence: true
  belongs_to :page

  def initialize
    raise NotImplementedError
  end
end
