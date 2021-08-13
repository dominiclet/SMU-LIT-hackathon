from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

import sqlite3
import json
from datetime import timedelta

app = Flask(__name__)
app.config["CORS_HEADERS"] = "Content-Type"
cors = CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

# Authentication setup
TOKEN_EXPIRY = timedelta(days=1)
app.config["JWT_SECRET_KEY"] = "secretkey"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = TOKEN_EXPIRY
jwt = JWTManager(app)

@app.route("/test", methods=["GET"])
def test():
	return "We love Vivek!"

@app.route("/dbtest", methods=["GET"])
def dbtest():
	result = []
	with sqlite3.connect("vivek.db") as db:
		cur = db.cursor()
		data = cur.execute("SELECT * FROM client INNER JOIN preferences on client.id = preferences.id;")
		for row in data:
			print(row)
			print(row[8])
			print(json.loads(row[8])[0])
			result.append(row)
	return jsonify(result)

"""
Fetches client data
Returns JSON object
"""
@app.route("/clientData/<id>", methods=["GET"])
def client_data(id):
	with sqlite3.connect("vivek.db") as db:
		cur = db.cursor()
		data = cur.execute(f"SELECT * FROM client NATURAL JOIN preferences WHERE id = {id}")
		user = data.fetchone()
		json_data = {
			"id": user[0],
			"name": user[1],
			"age": user[2],
			"gender": user[3],
			"phone": user[4],
			"email": user[5],
			"password": user[6],
			"brief": user[10]
		}
		return jsonify(json_data)

"""
Fetches array of clients of lawyer
Returns the JSON barebones representation of a client
"""
@app.route("/getClientList", methods=["GET"])
@jwt_required()
def client_list():
	id = get_jwt_identity()
	with sqlite3.connect("vivek.db") as db:
		cur = db.cursor()
		data = cur.execute(f"SELECT * FROM lawyer WHERE id = {id};")
		user = data.fetchone()
		return jsonify(user[7]), 200

"""
For logging in user
Returns a jwt token for future client use
"""
@app.route("/login", methods=["POST"])
def login():
	email = request.json.get("email")
	password = request.json.get("password")
	is_lawyer = request.json.get("isLawyer")
	with sqlite3.connect("vivek.db") as db:
		cur = db.cursor()
		user_type = "lawyer" if is_lawyer else "client"
		data = cur.execute(f"SELECT * FROM {user_type} WHERE email = '{email}'")
		user = data.fetchone()
		if user and user[6] == password:
			access_token = create_access_token(identity=user[0])
			return jsonify(access_token=access_token, route=user_type), 200
		else:
			return "Bad email or password", 401

"""
For pinging of server for authentication
"""
@app.route("/ping/<user_type>", methods=['POST'])
@jwt_required()
def ping(user_type):
	# This portion verifies if user is lawyer or client (and that client cannot log in to lawyer site and vice versa)
	with sqlite3.connect("vivek.db") as db:
		cur = db.cursor()
		data = cur.execute(f"SELECT * FROM {user_type} WHERE id = {get_jwt_identity()}")
		user = data.fetchone()
		if user:
			return "", 200
		else:
			return "Forbidden page", 403