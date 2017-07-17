# == Schema Information
#
# Table name: pages
#
#  id         :integer          not null, primary key
#  title      :string
#  manual_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Page < ApplicationRecord
  belongs_to :manual
  has_many :blocks
end
