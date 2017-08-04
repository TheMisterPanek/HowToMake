module ManualsHelper
  def manual_json(manual)
    { manual_id: manual.id, pages: manual.pages, current_page: 0, edit_mode: false, myPost: @my_post }.to_json(include: :blocks)
  end

end
