module ManualsHelper
  def manual_json(manual)
    { manual_id: manual.id, pages: manual.pages, current_page: 0, edit_mode: false, myPost: @my_post }.to_json(include: :blocks)
  end


  def new_manual? manual
    if(manual.created_at>Time.zone.now-1.day) 
      content_tag( :span, t('view.manual.new'), :class=>%w[badge badge-default])
    end
  end
  def my_manual? manual
    if(manual.user_id == (current_user||User.new).id) 
      content_tag( :span, t('view.manual.my'), :class=>%w[badge badge-success])
    end
  end

  def empty_manuals? manuals
    if(manuals.empty?)
      content_tag :h3, t("view.empty_find_result")
    end
  end
end