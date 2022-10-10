Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  #route only active in development to test user auth
  # post 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do
    resources :users, only: :create
    resource :session, only: [:show, :create, :destroy]
  end

  #catch-all route after all of other routes
  get '*path', to: "static_pages#frontend_index"
end
