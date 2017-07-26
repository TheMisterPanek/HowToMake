module ManualsHelper
  def show_pages(pages)
    pages ||= []
    pages.each do |page|
      content_tag(:div, class: 'col-xs-4') do
        concat page.title
      end
    end
  end
  def manual_json(manual)
    { manual_id: manual.id, pages: manual.pages, current_page: 0 }.to_json(include: :blocks)
  end
end
