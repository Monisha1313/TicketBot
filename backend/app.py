from flask import Flask
from flask_cors import CORS
from config import Config
from models import db
from routes.chat import chat_bp
from routes.bookings import bookings_bp
from routes.exhibits import exhibits_bp
from routes.analytics import analytics_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})
    db.init_app(app)

    app.register_blueprint(chat_bp, url_prefix="/api/chat")
    app.register_blueprint(bookings_bp, url_prefix="/api/bookings")
    app.register_blueprint(exhibits_bp, url_prefix="/api/exhibits")
    app.register_blueprint(analytics_bp, url_prefix="/api/analytics")

    with app.app_context():
        db.create_all()

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5000)