# == Schema Information
#
# Table name: achievements
#
#  id         :integer          not null, primary key
#  type       :string
#  progress   :decimal(, )
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Achievement < ApplicationRecord
  validates :user_id, presence: true
  belongs_to :user

  def self.call(_params)
    raise NotImplemetedError
  end
end
