class CreateFolders < ActiveRecord::Migration[5.1]
  def change
    create_table :folders do |t|
      t.references :user, foreign_key: true
      t.string :title

      t.timestamps
    end

    add_reference :notes, :folder, foreign_key: true
  end
end
