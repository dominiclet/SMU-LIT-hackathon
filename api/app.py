from os import name
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

import sqlite3
import json
from datetime import timedelta

import sys

# for data
import pandas as pd
import numpy as np
import re
# for processing
import nltk
nltk.download('wordnet')
# for bag-of-words
from sklearn import feature_extraction, feature_selection, model_selection, naive_bayes, pipeline, manifold, preprocessing

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
		data = cur.execute(f"SELECT * FROM client NATURAL JOIN preferences WHERE id = {id};")
		user = data.fetchone()
		json_data = {
			"id": user[0],
			"name": user[1],
			"age": user[2],
			"gender": user[3],
			"phone": user[4],
			"email": user[5],
			"password": user[6],
			"progress": user[7],
			"brief": user[11]
		}
		return jsonify(json_data)

"""
Fetches logged-in client data
"""
@app.route("/currClientData", methods=["GET"])
@jwt_required()
def curr_client_data():
	name = get_jwt_identity()
	with sqlite3.connect("vivek.db") as db:
		cur = db.cursor()
		data = cur.execute(f"SELECT * FROM client NATURAL JOIN preferences WHERE name = '{name}'")
		user = data.fetchone()
		json_data = {
			"id": user[0],
			"name": user[1],
			"age": user[2],
			"gender": user[3],
			"phone": user[4],
			"email": user[5],
			"password": user[6],
			"progress": user[7],
			"brief": user[11]
		}
		return jsonify(json_data)

"""
Fetches array of clients of lawyer
Returns the JSON barebones representation of a client
"""
@app.route("/getClientList", methods=["GET"])
@jwt_required()
def client_list():
	name = get_jwt_identity()
	with sqlite3.connect("vivek.db") as db:
		cur = db.cursor()
		data = cur.execute(f"SELECT * FROM lawyer WHERE name = '{name}';")
		user = data.fetchone()
		return jsonify(user[7]), 200

"""
Fetches lawyer data
Returns JSON object
"""
@app.route("/lawyerData/<id>", methods=["GET"])
def lawyer_data(id):
	with sqlite3.connect("vivek.db") as db:
		cur = db.cursor()
		data = cur.execute(f"SELECT * FROM lawyer WHERE id = {id};")
		user = data.fetchone()
		json_data = {
			"id": user[0],
			"name": user[1],
			"age": user[2],
			"gender": user[3],
			"phone": user[4],
			"email": user[5],
			"password": user[6],
			"firm": user[8]
		}
		return jsonify(json_data)

"""
Editing case brief
"""
@app.route("/editCaseBrief", methods=["POST"])
@jwt_required()
def edit_case_brief():
	name = get_jwt_identity()
	brief_data = request.json.get("brief")
	with sqlite3.connect("vivek.db") as db:
		cur = db.cursor()
		data = cur.execute(f"SELECT id FROM client WHERE name='{name}';")
		id = data.fetchone()[0]
		cur.execute(f"UPDATE preferences SET brief='{brief_data}' WHERE id={id};")
		db.commit()
		return "Brief updated", 200

"""
Moving on to next stage (by accepting lawyer or completing case)
"""
@app.route("/incrementStage", methods=["POST"])
@jwt_required()
def increment_stage():
	name = get_jwt_identity()
	with sqlite3.connect("vivek.db") as db:
		cur = db.cursor()
		data = cur.execute(f"SELECT progress FROM client WHERE name = '{name}';")
		progress = data.fetchone()[0]
		cur.execute(f"UPDATE client SET progress={progress+1} WHERE name='{name}';")
		db.commit()
		return "Increment done", 200

"""
Go back to previous stage
"""
@app.route("/decrementStage", methods=["POST"])
@jwt_required()
def decrement_stage():
	name = get_jwt_identity()
	with sqlite3.connect("vivek.db") as db:
		cur = db.cursor()
		data = cur.execute(f"SELECT progress FROM client WHERE name = '{name}';")
		progress = data.fetchone()[0]
		cur.execute(f"UPDATE client SET progress={progress-1} WHERE name='{name}';")
		db.commit()
		return "Decrement done", 200

"""
Add client to list of clients to be displayed to lawyer to accept/decline
"""
@app.route("/addClient/<lawyer_id>", methods=["POST"])
@jwt_required()
def add_client(lawyer_id):
	name = get_jwt_identity()
	with sqlite3.connect("vivek.db") as db:
		cur = db.cursor()
		id = cur.execute(f"SELECT id FROM client WHERE name='{name}';").fetchone()[0]
		data = {
			"name" : name,
			"id" : id,
		}
		client_list_str = cur.execute(f"SELECT clients FROM lawyer WHERE id={lawyer_id};").fetchone()[0]
		client_list = json.loads(client_list_str)
		client_list.append(data)
		cur.execute(f"UPDATE lawyer SET clients='{json.dumps(client_list)}' WHERE id={lawyer_id};")
		data = cur.execute(f"SELECT progress FROM client WHERE name = '{name}';")
		progress = data.fetchone()[0]
		cur.execute(f"UPDATE client SET progress={progress+1} WHERE name='{name}';")
		db.commit()
		return "Client selected lawyer", 200

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
			access_token = create_access_token(identity=user[1])
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
		data = cur.execute(f"SELECT * FROM {user_type} WHERE name = '{get_jwt_identity()}'")
		user = data.fetchone()
		if user:
			return "", 200
		else:
			return "Forbidden page", 403



@app.route("/nlpCase", methods=['POST'])
def nlp_case():
	df = pd.read_csv(
        "../public/df.csv")
	
	casedestxt = request.json.get("description")
	print(casedestxt)

	def utils_preprocess_text(text, flg_stemm=False, flg_lemm=True, lst_stopwords=None):
		# clean (convert to lowercase and remove punctuations and characters and then strip)
		text = re.sub(r'[^\w\s]', '', str(text).lower().strip())

		# Tokenize (convert from string to list)
		lst_text = text.split()
		# remove Stopwords
		if lst_stopwords is not None:
		    lst_text = [word for word in lst_text if word not in
		                lst_stopwords]

		## Stemming (remove -ing, -ly, ...)
		if flg_stemm == True:
		    ps = nltk.stem.porter.PorterStemmer()
		    lst_text = [ps.stem(word) for word in lst_text]

		# Lemmatisation (convert the word into root word)
		if flg_lemm == True:
		    lem = nltk.stem.wordnet.WordNetLemmatizer()
		    lst_text = [lem.lemmatize(word) for word in lst_text]

		# back to string from list
		text = " ".join(lst_text)
		return text
	nltk.download('stopwords')
	lst_stopwords = nltk.corpus.stopwords.words("english")
	df["text_clean"] = df["text"].apply(lambda x: utils_preprocess_text(
	    x, flg_stemm=False, flg_lemm=True, lst_stopwords=lst_stopwords))
	# Count (classic BoW)
	vectorizer = feature_extraction.text.CountVectorizer(
	    max_features=10000, ngram_range=(1, 2))

	# Tf-Idf (advanced variant of BoW)
	vectorizer = feature_extraction.text.TfidfVectorizer(
	    max_features=10000, ngram_range=(1, 2))
	corpus = df["text_clean"]
	vectorizer.fit(corpus)
	X_train = vectorizer.transform(corpus)
	dic_vocabulary = vectorizer.vocabulary_
	y = df["y"]
	X_names = vectorizer.get_feature_names()
	p_value_limit = 0.95
	df_features = pd.DataFrame()
	for cat in np.unique(y):
	    chi2, p = feature_selection.chi2(X_train, y == cat)
	    df_features = df_features.append(pd.DataFrame(
	        {"feature": X_names, "score": 1-p, "y": cat}))
	    df_features = df_features.sort_values(
	        ["y", "score"], ascending=[True, False])
	    df_features = df_features[df_features["score"] > p_value_limit]
	X_names = df_features["feature"].unique().tolist()

	vectorizer = feature_extraction.text.TfidfVectorizer(vocabulary=X_names)
	vectorizer.fit(corpus)
	X_train = vectorizer.transform(corpus)
	dic_vocabulary = vectorizer.vocabulary_

	classifier = naive_bayes.MultinomialNB()

	# pipeline
	model = pipeline.Pipeline([("vectorizer", vectorizer),
	                           ("classifier", classifier)])
	# train classifier
	model["classifier"].fit(X_train, y)

	result = model.predict([casedestxt])
	caselaw = result[0]
	return caselaw, 200

"""
For registration of lawyer
"""
@app.route("/register/lawyer", methods=['POST'])
def register_lawyer():
	name = request.json.get("name")
	age = request.json.get("age")
	gender = request.json.get("gender")
	mobile = request.json.get("mobile")
	email = request.json.get("email")
	password = request.json.get("password")
	firm = request.json.get("firm")

	with sqlite3.connect("vivek.db") as db:
		cur = db.cursor()
		cur.execute(f"INSERT INTO lawyer (name, age, gender, phone, email, password, clients, firm) VALUES ('{name}', '{age}', '{gender}', '{mobile}', '{email}', '{password}', '[]', '{firm}');")
		# insert languages, availability, areas of law into another table
		db.commit()
		return "Registered", 200

"""
For registration of client (AND PERHAPS NLP)
"""
@app.route("/register/client", methods=['POST'])
def register_client():
	data = request.json
	name = data.get("name")
	age = data.get("age")
	gender = data.get("gender")
	email = data.get("email")
	mobile = data.get("mobile")
	budget = data.get("budget")
	languages = data.get("languages")
	lawyerGender = data.get("lawyergender")
	urgent = data.get("urgent")
	password = data.get("password")
	areaOfLaw = data.get("areaOfLaw")
	caseDescription = data.get("caseDescription")
	if data.get("areaOfLaw") != "Not sure":
		# NLP not needed
		with sqlite3.connect("vivek.db") as db:
			cur = db.cursor()
			res = cur.execute(f"INSERT INTO client (name, age, gender, phone, email, password, progress, allocated_lawyer) VALUES ('{name}', {age}, '{gender}', '{mobile}', '{email}', '{password}', 1, 2);")
			cur.execute(f"INSERT INTO preferences (languages, lawyer_gender, urgent, brief, category) VALUES ('{languages}', '{lawyerGender}', '{urgent}', '{caseDescription}', '{areaOfLaw}');")
			db.commit()
			return "Registered", 200
