import os
from flask import Flask
from backend.routes import mainBlueprint

app = Flask(__name__)
app.register_blueprint(mainBlueprint)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))  # Default to 8080 for DigitalOcean
    app.run(host='0.0.0.0', port=port, debug=False)
