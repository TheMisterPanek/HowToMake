module ApplicationHelper

  def show_category manual
    unless manual && manual.category
      return nil
    end
    category = content_tag :p do
      content_tag :strong, Manual.human_attribute_name("category") +
      ": "+
      manual.category.name if manual
    end
    return category
  end

  def show_author manual
    unless manual && manual.category
      return nil
    end
    author = content_tag :p do
      content_tag :strong, Manual.human_attribute_name("author") +
      ": "+
      manual.user.name if manual
    end
    return author

  end

end
