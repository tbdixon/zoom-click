import flask
from flask import request, jsonify

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/api/', methods=['GET'])
def home():
    return "Hello World"


app.run()
