class AddDescriptionToManual < ActiveRecord::Migration[5.1]
  def change
    add_column :manuals, :description, :text
  end
end
