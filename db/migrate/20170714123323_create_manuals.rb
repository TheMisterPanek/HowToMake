class CreateManuals < ActiveRecord::Migration[5.1]
  def change
    create_table :manuals do |t|
      t.string :name
      t.integer :category_id
      t.integer :user_id

      t.timestamps
    end

    add_index :manuals, :name, unique: true
  end
end
