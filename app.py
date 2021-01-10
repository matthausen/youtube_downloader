from flask import Flask, render_template, request, send_from_directory, jsonify, Response
from flask_cors import CORS
import os, glob, re, time
from youtube_search import YoutubeSearch
from pytube import YouTube

from rq import Queue
from worker import conn
from utils import download_and_convert

q = Queue(connection=conn)

app = Flask(__name__, static_folder="./client/build/static", template_folder="./client/build")

TMP_FOLDER = './tmp'

CORS(app, resources={r"/*": {"origins": "*"}})

def cleanup():
  zips = glob.glob("./*.zip")
  mp3s = glob.glob("./tmp/*.mp3")
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
    try:
      os.mkdir(TMP_FOLDER)
    except Exception:
      print("Directory already exists: ", Exception)
    # Clean any previous files
    cleanup()

    body = request.data.decode("utf-8") 
    song_list = eval(body)

    # start worker here
    q.enqueue(download_and_convert, 'http://heroku.com')

    return Response("Downoad was successful", status=200, mimetype="application/json")

@app.route("/api/download-zip", methods=["GET", "POST"])
def download():
  zips = glob.glob("./*.zip")
  music_file = ''
  if len(zips) > 0:
    for z in zips:
      music_file = z
      print("send file: ", music_file)
  try:
    return send_from_directory("./", filename=music_file, as_attachment=True, mimetype="application/zip", cache_timeout=-1)
  except FileNotFoundError:
    return Response("Error sending file", status=500, mimetype="application/json")    

if __name__ == '__main__':
  app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))