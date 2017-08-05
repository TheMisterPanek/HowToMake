class ManualsChannel < ApplicationCable::Channel
  MANUAL_CHANNEL = 'Manuals_%s_channel'.freeze

  def self.channel_for_manual(manual_id)
    format(MANUAL_CHANNEL, manual_id)
  end

  def subscribed
    stream_from self.class.channel_for_manual(params[:manual_id])
  end

  def unsubscribed
    send_edit_mode false
  end

  def add_page(data)
    get_current_manual.pages.create(title: data['title'], manual_id: data['manual_id'])
  end

  def delete_page(data)
    get_current_manual.pages.find(data['id']).destroy
  end

  def add_imageblock(data)
    serializeData = {url: data['url'],x: 0,y: 0 ,height: 320, width: 200}
    blocks(data['current_page_id']).create(type: "Image",data: serializeData)
  end

  def add_textblock(data)
    serializeData = {text: data['text'], width: 215, x: 0, y: 0}
    blocks(data['current_page_id']).create(type: "Text", data: serializeData);
  end

  def add_videoblock data
    serializeData = {url: data['url'], width: 320, height: 200, x: 0, y: 0}
    blocks(data['current_page_id']).create(type: "Video", data: serializeData);
  end

  def move_block data
    Block.find(data['block_id']).update(data: data['data'])
  end

  def toggle_edit_mode data
    mode = current_user.manuals.find(params[:manual_id])|| false
    send_edit_mode mode && !data["edit_mode"]
  end

  def resize_block(data)
    Block.find(data['block_id']).update(data: data['data'])
  end

  def sort_page data
    Page.find(data['page_id']).update(position: data['newPosition']);
  end

  def send_edit_mode edit_mode
    action = {type: "TOGGLED_EDIT_MODE", edit_mode: edit_mode } 
    ActionCable.server.broadcast ManualsChannel.channel_for_manual(params[:manual_id]), action
  end


  def save_text block_data
    Block.find(block_data["block_id"]).update(data: block_data['data']);
  end

  def change_title data
    Page.find(data['page_id']).update(title: data['new_title']);
  end

  def create_comment data
    Comment.create(user_id: current_user.id, manual_id: params[:manual_id],text: data['text']);
  end

private

  def blocks page_id
    get_current_manual.pages.find(page_id).blocks 
  end


  def get_current_manual
    current_user.manuals.find(params[:manual_id]) 
  end


end
