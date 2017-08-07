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
    can? :edit, manual
    if(manual.user_id == (current_user||User.new).id) 
      content_tag( :span, t('view.manual.my'), :class=>%w[badge badge-success])
    end
  end

  def empty_manuals? manuals
    if(manuals.empty?)
      content_tag :h3, t("view.empty_find_result")
    end
  end

  def manual_head manual
    slice_text manual.name, 45
  end

  def manual_body text
    slice_text text,125
  end

  def slice_text text, count
    res = text.slice(0,count)
    res+= '...' if text.length>count
    res
  end
end