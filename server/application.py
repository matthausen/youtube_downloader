from flask import Flask, render_template, request, send_from_directory, jsonify, Response, send_file
from flask_cors import CORS
import os, glob
from youtube_search import YoutubeSearch
import youtube_dl
from dotenv import load_dotenv
import boto3
# Might move this to aws lambda
from pydub import AudioSegment

load_dotenv()

S3_BUCKET = os.getenv("S3_BUCKET")

application = Flask(__name__)

CORS(application, resources={r"/*": {"origins": "*"}})

@application.route("/api/fetch-songs", methods=['POST'])
def getSongs():
  if request.method == 'POST':
    search_term = request.data
    results = YoutubeSearch(search_term, max_results=20).to_json()
    return results

# download_songs method always expects a list of song ids, wheter single or multiple    download
@application.route("/api/download-songs", methods=["POST"])
def download_songs():
  if request.method == "POST":
    body = request.data.decode("utf-8") 
    ydl_opts = {
      'format': 'bestaudio/best',
      'audioformat': 'mp3',
      'extractaudio': True,
      'postprocessor': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'mp3',
        'preferredquality': '192',
      }],
      'outtmpl': 'tmp/%(title)s.%(ext)s',
    }
    song_list = eval(body)
    for song in song_list:
      try:
        url = 'https://www.youtube.com/watch?v=' + song
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
          ydl.download([url])
          # TODO
          # Do the conversion if the file is not .mp3
          # AudioSegment.from_file("/tracks/file").export("/output/file", format="mp3")
          # Delete the file from the server
      except Exception as e:
        return Response("Failed to download track", status=500, mimetype='application/json')
    
    # Upload the file to S3
    s3 = boto3.resource('s3')
    for file in glob.glob('./tmp/*.webm'):
      s3.meta.client.upload_file(file, S3_BUCKET, 'mysong.webm')
    # Return the actual file or files to the frontend
    #return send_file('myfile.mp3', as_attachment=True)
    return Response("Success", status=200, mimetype='application/json')
    

if __name__ == '__main__':
  application.run(use_reloader=True, port=5000, threaded=True)