from controllers import LoginUserControllers,RegisterUserControllers,RecoberyUserControllers,AdminControllers,AtractivosUserControllers

user = {
    "Login_User": "/api/v01/login", "LoginUserController" : LoginUserControllers.as_view("login"),
    "Register_User": "/api/v01/register", "RegisterUserController" : RegisterUserControllers.as_view("register"),
    "Recobery_User": "/api/v01/recobery", "RecoberyUserController" : RecoberyUserControllers.as_view("recobery"),    
    "Atractivos_User": "/api/v01/atractivos", "AtractivosUserController" : AtractivosUserControllers.as_view("rtractivos")
}
admin = {
    "Admin": "/api/v01/admin", "AdminController" : AdminControllers.as_view("Admin")
}


