from flask import Flask, jsonify
from flask_cors import CORS

import sqlite3

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
		data = cur.execute("SELECT * FROM client;")
		for row in data:
			result.append(row)
	return jsonify(result)