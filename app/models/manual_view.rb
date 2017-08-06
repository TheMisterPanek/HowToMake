# == Schema Information
#
# Table name: manual_views
#
#  id         :integer          not null, primary key
#  manual_id  :integer
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ManualView < ApplicationRecord
  belongs_to :manual
  belongs_to :user
end
