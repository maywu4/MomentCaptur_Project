json.user do
  json.extract! @user, :id, :username, :email, :first_name, :last_name, :age, :created_at, :updated_at, :about
  json.picture @user.photo.url
end


