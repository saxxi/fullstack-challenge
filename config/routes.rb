Rails.application.routes.draw do
  namespace :api , defaults: { format: :json } do
    resources :comics, only: [:index, :show] do
      collection do
        get :upvotes
      end
    end
    put 'comics/:comic_id/upvote' => 'comics#upvote'
  end
end
