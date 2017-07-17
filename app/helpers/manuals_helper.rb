module ManualsHelper
  def show_pages(pages)
    pages ||= []
    pages.each do |page|
      content_tag(:div, class: 'col-xs-4') do
        concat page.title
      end
    end
  end
end
