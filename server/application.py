from flask import Flask, render_template, request, send_from_directory, jsonify, Response
from flask_cors import CORS
import os, glob, re
from youtube_search import YoutubeSearch
from pytube import YouTube
import pafy
import moviepy.editor as mp
import shutil

application = Flask(__name__)

TMP_FOLDER = './tmp'

CORS(application, resources={r"/*": {"origins": "*"}})

def cleanup():
  mp3s = glob.glob("/tmp/*.mp3")
  zips = glob.glob("./*.zip")
  for file in mp3s:
    os.remove(file)
  for z in zips:
    os.remove(z)

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
    # Download the file
    for song in song_list:
      url = 'https://www.youtube.com/watch?v=' + song
      pafy.new(url).getbest().download(TMP_FOLDER)
      #YouTube(url).streams.filter(only_audio=True).first().download(TMP_FOLDER)

    # Convert file/s to mp3, zip and send to client
    for file in os.listdir(TMP_FOLDER):
      if re.search('mp4', file):
        mp4_path = os.path.join(TMP_FOLDER,file)
        mp3_path = os.path.join(TMP_FOLDER,os.path.splitext(file)[0]+'.mp3')
        new_file = mp.AudioFileClip(mp4_path)
        new_file.write_audiofile(mp3_path)
        os.remove(mp4_path)
        os.walk(TMP_FOLDER)
        shutil.make_archive('Music', 'zip', TMP_FOLDER)

    return Response("Downoad was successful", status=200, mimetype="application/json")

@application.route("/api/download-zip", methods=["GET", "POST"])
def download():
  try:
    return send_from_directory("./"], filename="Music.zip", as_attachment=True, mimetype="application/zip")
  except FileNotFoundError:
    return Response("Error sending file", status=500, mimetype="application/json")
  cleanup()
    

if __name__ == '__main__':
  application.run(use_reloader=True, port=5000, threaded=True)