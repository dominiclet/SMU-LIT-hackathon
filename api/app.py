from flask import Flask, jsonify
from flask_cors import CORS

import sqlite3
import json

app = Flask(__name__)
app.config["CORS_HEADERS"] = "Content-Type"
cors = CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

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

@app.route("/clientData", methods=["GET"])
def client_data():
	with sqlite3.connect("vivek.db") as db:
		cur = db.cursor()
		data = cur.execute("SELECT * FROM client WHERE id = 1;")
		user = data.fetchone()
		json_data = {
			"id": user[0],
			"name": user[1],
			"age": user[2],
			"gender": user[3],
			"phone": user[4],
			"email": user[5],
			"password": user[6]
		}
		return jsonify(json_data)