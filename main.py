# Run with virtualenv and install dependencies from requirements.txt in order to run main.py

from flask import Flask # Allow python to acess Flask
from backend.routes import mainBlueprint # Acess the routes.py file with all of the routes eg: /home etc.
import webview # Import pywebview to create a webview for the app

app = Flask(__name__) # Create a Flask app instance
app.register_blueprint(mainBlueprint) # Register the routes from routes.py with the Flask app

if __name__ == '__main__': # Only run this if this file is run directly
    webview.create_window('Electoral Analysis System', app, width=1280, height=810)
    webview.start()