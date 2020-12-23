from flask import Flask, render_template, request, send_from_directory, jsonify, Response
from flask_cors import CORS
import os, glob, re
from youtube_search import YoutubeSearch
from pytube import YouTube
import pafy
import moviepy.editor as mp
import shutil

app = Flask(__name__, static_folder="./client/build/static", template_folder="./client/build")

TMP_FOLDER = '/'

CORS(app, resources={r"/*": {"origins": "*"}})

def cleanup():
  zips = glob.glob("./*.zip")
  mp3s = glob.glob("./*.mp3")
  print(mp3s);
  print(zips)
  if len(mp3s) > 0:
    for file in mp3s:
      print("Deleting: ", file)
      os.remove(file)
  if len(zips) > 0:
    for z in zips:
      print("Deleting: ", z)
      os.remove(z)

@app.route("/",methods=['GET', 'POST'])
def index():
  return render_template('index.html')

@app.route("/api/fetch-songs", methods=['POST'])
def getSongs():
  if request.method == 'POST':
    search_term = request.data
    results = YoutubeSearch(search_term, max_results=20).to_json()
    return results

@app.route("/api/download-songs", methods=["POST"])
def download_songs():
  if request.method == "POST":
    # Clean any previous files
    cleanup()

    body = request.data.decode("utf-8") 
    song_list = eval(body)
    
    # Download the file
    for song in song_list:
      url = 'https://www.youtube.com/watch?v=' + song
      pafy.new(url).getbest().download(TMP_FOLDER)

    # Convert file/s to mp3, zip and send to client
    for file in os.listdir(TMP_FOLDER):
      if re.search('mp4', file):
        mp4_path = os.path.join(TMP_FOLDER,file)
        mp3_path = os.path.join(TMP_FOLDER,os.path.splitext(file)[0]+'.mp3')
        print(mp3_path)
        new_file = mp.AudioFileClip(mp4_path)
        new_file.write_audiofile(mp3_path)
        os.remove(mp4_path)
        os.walk(TMP_FOLDER)
        shutil.make_archive('Music', 'zip', TMP_FOLDER)

    return Response("Downoad was successful", status=200, mimetype="application/json")

@app.route("/api/download-zip", methods=["GET", "POST"])
def download():
  try:
    return send_from_directory("./", filename="Music.zip", as_attachment=True, mimetype="application/zip")
  except FileNotFoundError:
    return Response("Error sending file", status=500, mimetype="application/json")    

if __name__ == '__main__':
  app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))