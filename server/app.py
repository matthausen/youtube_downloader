from flask import Flask, render_template, request, send_from_directory, jsonify, Response
from flask_cors import CORS
from youtube_search import YoutubeSearch
import youtube_dl

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/api/fetch-songs", methods=['POST'])
def getSongs():
  if request.method == 'POST':
    search_term = request.data
    results = YoutubeSearch(search_term, max_results=20).to_json()
    return results


@app.route("/api/download-songs", methods=["POST"])
def download_songs():
  if request.method == "POST":
    body = request.data.decode("utf-8") 
    ydl_opts = {
      'format': 'bestaudio/best',
      'postprocessor': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'mp3',
        'preferredquality': '192',
      }]
    }
    song_list = []
    song_list.append(body)
    for song in song_list:
      try:
        url = 'https://www.youtube.com/watch?v=' + song
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
          ydl.download([url])
          return Response("File successfully downloaded to server", status=200, mimetype='application/json')
      except Exception as e:
        return Response("Failed to download track", status=500, mimetype='application/json')

if __name__ == '__main__':
  app.run(use_reloader=True, port=5000, threaded=True)