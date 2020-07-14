from db_utils import post_insert, get_select
import flask
from flask import request

app = flask.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/v1/users/', methods=['GET', 'POST'])
def users():
    if request.method == 'POST':
        return post_insert(request, ['user_name', 'user_alias'], 'user')
    if request.method == 'GET':
        return get_select(request,['user_name', 'user_alias'], 'user')
    return "Invalid request type", 501


@app.route('/v1/meetings/', methods=['GET', 'POST'])
def meetings():
    if request.method == 'POST':
        return post_insert(request, ['meeting_id', 'meeting_pw', 'meeting_user_name'], 'meeting')
    if request.method == 'GET':
        return get_select(request, ['meeting_id', 'meeting_user_name'], 'meeting')
    return "Invalid request type", 501


app.run()
