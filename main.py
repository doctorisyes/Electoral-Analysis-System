# Run with virtualenv and install dependencies from requirements.txt in order to run main.py

from flask import Flask # Allow python to acess Flask
from backend.routes import mainBlueprint # Acess the routes.py file with all of the routes eg: /home etc.

app = Flask(__name__) # Create a Flask app instance
app.register_blueprint(mainBlueprint) # Register the routes from routes.py with the Flask app

if __name__ == '__main__': # Only run this if this file is run directly
    app.run(host="localhost", port=5000, debug=True) # Host the app on a web server on localhost and port 5000