from flask import Flask
from routes import user,admin
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.add_url_rule(user["aogin_User"],view_func=user["login_user_controller"])
app.add_url_rule(user["register_User"],view_func=user["register_user_controller"])
app.add_url_rule(user["recobery_User"],view_func=user["recobery_user_controller"])
app.add_url_rule(user["atractivos_User"],view_func=user["atractivos_user_controller"])
app.add_url_rule(admin["admin"],view_func=user["admin_controller"])