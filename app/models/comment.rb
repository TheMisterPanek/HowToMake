# == Schema Information
#
# Table name: comments
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  manual_id  :integer
#  text       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :manual

  after_create_commit {ActionCable.server.broadcast ManualsChannel.channel_for_manual(manual_id), send_comment_data}

  def send_comment_data
    {type: "ADD_COMMENT", comment: self.as_json}
  end
end
