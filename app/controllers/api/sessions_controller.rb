class Api::SessionsController < ApplicationController
  def show
      if current_user
      @user = current_user
      render 'api/users/show' #json: {user: current_user }
    else 
      render json: { user: nil } 
    end
  end

  def create
    @user = User.find_by_credentials(params[:credential], params[:password])
      if @user
        login!(@user)
        render 'api/users/show' #json: {user: @user }
      else
        render json: { errors: ['The provided credentials were invalid.'] }, status: :unauthorized  
    end
  end

  def destroy
    logout! if current_user
    render json: { message: 'success' }
  end
end
