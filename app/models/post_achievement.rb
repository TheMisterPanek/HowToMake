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

class PostAchievement < Achievement
  def self.call(_params)
    current_user = _params[:current_user]
    user_id = current_user.id
    post_achivement = current_user.achievements.where(type: 'PostAchievement').order(:progress).last
    PostAchievement.create(user_id: user_id, progress: 100);
  end

  def self.delta
    10
  end
end
