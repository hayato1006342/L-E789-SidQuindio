
from flask.views import MethodView
from flask import jsonify, request
import time



class LoginUserControllers(MethodView):
    def post(self):
        time.sleep(3)
        content = request.get_json()
        email = content.get("email")
        password = content.get("password")
        return jsonify({"Ingreso Exitoso": True}), 200


class RecuperacionUserControllers(MethodView):
    def post(self):
        time.sleep(3)
        content = request.get_json()
        codigo = content.get("codigo")
        password = content.get("password")
        password = content.get("validatepassword")
        return jsonify({"": True}), 200
        


class RegistroUserControllers(MethodView):
    def post(self):
        time.sleep(3)
        content = request.get_json()
        nombre = content.get("nombre")
        email = content.get("email")
        password = content.get("password")
        validatepassword = content.get("validatepassword")

        return jsonify({"Registro Exitoso": True}), 200
    
    def get():
        pass
    
    def put():
        pass
     
