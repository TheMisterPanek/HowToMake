class ManualsController < ApplicationController
  before_action :set_manual, only: %i[edit update destroy]

  respond_to :html

  def index
    @manuals = Manual.all
    respond_with(@manuals)
  end

  def show
    @manual = Manual.includes(:user,:category,pages: :blocks).where(id: params[:id]).first
    user = current_user
    @my_post = @manual.user_id == (user||User.new).id
    puts @manual.user_id,current_user.instance_variable_get(:@id)
    respond_with(@manual)
  end

  def new
    @categories = Category.all
    @manual = Manual.new
    respond_with(@manual)
  end

  def edit
  end

  def create
    @manual = current_user.manuals.create(manual_params)
    AchievementEvent.send(:post, current_user: current_user, manual_id: @manual.id)
    @manual.save
    respond_with(@manual)
  end

  def update
    @manual.update(manual_params)
    respond_with(@manual)
  end

  def destroy
    @manual.destroy
    respond_with(@manual)
  end

  private

  def set_manual
    @edit_mode = true
    @manual = Manual.includes(:pages).find(params[:id])
    @pages = @manual.pages
  end

  def manual_params
    params.require(:manual).permit(:name, :category_id,:description, :tag_list)
  end
end
