from flask import Flask, render_template, request, send_from_directory, jsonify
from flask_cors import CORS

application = Flask(__name__, static_folder="./client/build/static", template_folder="./client/build")

CORS(application, resources={r"/*": {"origins": "*"}})

@application.route("/api/fetch-songs", methods=['POST'])
def getSongs():
  if request.method == 'POST':
    search_term = request.data
    return search_term

@application.route("/", methods=['GET', 'POST'])
def index():
  return render_template('index.html')

if __name__ == '__main__':
  application.run(use_reloader=True, port=5000, threaded=True)