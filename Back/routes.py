from controllers import LoginUserControllers, RegistroUserControllers, RecuperacionUserControllers


user = {
    "login_user": "/api/v01/login", "login_user_controllers": LoginUserControllers.as_view("login_api"),
    "registro_user": "/api/v01/registro", "registro_user_controllers": RegistroUserControllers.as_view("register_api"),
    "recuperacion_user": "/api/v01/recuperacion", "recuperacion_user_controllers": RecuperacionUserControllers.as_view("recuperacion_api")
}

