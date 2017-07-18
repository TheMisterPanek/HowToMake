class CreateAchievements < ActiveRecord::Migration[5.1]
  def change
    create_table :achievements do |t|
      t.string :type
      t.decimal :progress
      t.integer :user_id
      t.timestamps
    end
  end
end
