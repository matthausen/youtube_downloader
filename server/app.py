from flask import Flask, render_template, request, send_from_directory, jsonify
from flask_cors import CORS
from youtube_search import YoutubeSearch

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/api/fetch-songs", methods=['POST'])
def getSongs():
  if request.method == 'POST':
    search_term = request.data
    results = YoutubeSearch(search_term, max_results=20).to_json()
    return results

if __name__ == '__main__':
  app.run(use_reloader=True, port=5000, threaded=True)