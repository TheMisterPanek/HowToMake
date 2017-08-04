Rails.application.routes.draw do
  resources :manuals
  root 'manuals#index'

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  scope '/admin' do
    resources :users
    resources :categories
  end
end
