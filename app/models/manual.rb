# == Schema Information
#
# Table name: manuals
#
#  id          :integer          not null, primary key
#  name        :string
#  category_id :string
#  user_id     :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  description :text
#

class Manual < ApplicationRecord
  validates :name, :category_id, presence: true
  belongs_to :category
  belongs_to :user
  has_many :pages, -> {order(position: :asc)}, dependent: :destroy
end
