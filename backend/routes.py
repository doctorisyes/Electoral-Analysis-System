from flask import Blueprint, render_template # Access the Blueprint class and the render_template function from Flask

mainBlueprint = Blueprint('main_blueprint', __name__) # Create an instance of the blueprint class

@mainBlueprint.route('/') # Add the folowing function as the "/" page of the blurprint
def index():
    return render_template('index.html') # Return the rendered HTML file index.html