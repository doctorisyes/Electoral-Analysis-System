import os
from flask import Flask
from backend.routes import mainBlueprint

app = Flask(__name__)
app.register_blueprint(mainBlueprint)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  # Use PORT env var or default 5000 locally
    app.run(host='0.0.0.0', port=port, debug=False)  # Listen on all interfaces