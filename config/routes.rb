Rails.application.routes.draw do
  get 'current_user', to: 'current_user#index'
  devise_for :users, 
    path: '', 
    path_names: {
      sign_in: 'login',
      sign_out: 'logout',
      registration: 'signup'
    },
    controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
    }
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :pots, only: [:index, :show, :create, :update, :destroy] do
        member do
          post 'add_money'
          post 'withdraw_money'
        end
      end
      resources :transactions, only: [:index, :create]
      resources :budgets, only: [:index, :show, :create, :update, :destroy] do
      end
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
