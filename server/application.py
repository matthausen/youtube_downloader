from flask import Flask, render_template, request, send_from_directory, jsonify, Response
from flask_cors import CORS
import os, glob, re
from youtube_search import YoutubeSearch
from pytube import YouTube
import moviepy.editor as mp
import shutil

application = Flask(__name__)

TMP_FOLDER = './tmp'

CORS(application, resources={r"/*": {"origins": "*"}})

@application.route("/api/fetch-songs", methods=['POST'])
def getSongs():
  if request.method == 'POST':
    search_term = request.data
    results = YoutubeSearch(search_term, max_results=20).to_json()
    return results

# download_songs method always expects a list of song ids, both for single and multiple download
@application.route("/api/download-songs", methods=["POST"])
def download_songs():
  if request.method == "POST":
    body = request.data.decode("utf-8") 
    song_list = eval(body)
    # Download the file and Upload the file to S3
    for song in song_list:
      url = 'https://www.youtube.com/watch?v=' + song
      YouTube(url).streams.filter(only_audio=True).first().download(TMP_FOLDER)

    # Convert file/s to mp3, zip and send to client
    for file in os.listdir(TMP_FOLDER):
      if re.search('mp4', file):
        mp4_path = os.path.join(TMP_FOLDER,file)
        mp3_path = os.path.join(TMP_FOLDER,os.path.splitext(file)[0]+'.mp3')
        new_file = mp.AudioFileClip(mp4_path)
        new_file.write_audiofile(mp3_path)
        os.remove(mp4_path)
        os.walk(TMP_FOLDER)
        shutil.make_archive('Song', 'zip', TMP_FOLDER)
    try:
      return send_from_directory('./', filename="Song.zip", as_attachment=True)
    except FileNotFoundError:
      return Response("Error sending file to client", status=500, mimetype="application/json")
    

if __name__ == '__main__':
  application.run(use_reloader=True, port=5000, threaded=True)