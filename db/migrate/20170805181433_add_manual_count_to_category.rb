class AddManualCountToCategory < ActiveRecord::Migration[5.1]
  def change
    add_column :categories, :manuals_count, :integer
  end
end
