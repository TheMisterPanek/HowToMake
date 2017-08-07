# == Schema Information
#
# Table name: manuals
#
#  id          :integer          not null, primary key
#  name        :string
#  category_id :integer
#  user_id     :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  description :text
#

class Manual < ApplicationRecord
  include SearchCop

  search_scope :search do
    attributes :name, :description
    attributes comment: ["comments.text"]
    attributes user: "user.name"
    attributes page: ["pages.title"]
  end

  validates :category_id, presence: true
  validates :name, length: {within: 5..30}

  belongs_to :category, counter_cache: true
  belongs_to :user
  has_many :pages, -> {order(position: :asc)}, dependent: :destroy
  has_many :comments, dependent: :destroy
end
