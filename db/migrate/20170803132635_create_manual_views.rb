class CreateManualViews < ActiveRecord::Migration[5.1]
  def change
    create_table :manual_views do |t|
      t.integer :manual_id
      t.integer :user_id

      t.timestamps
    end
  end
end
