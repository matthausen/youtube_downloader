import json, os, re, glob
from youtube_search import YoutubeSearch
import pafy
import boto3
from utils import upload_file, extract_audio

def get_tracks(event, context):

  search_term = event["body"]
  result = YoutubeSearch(search_term, max_results=20).to_json()

  response = {
      "statusCode": 200,
      "body": result
  }

  return response

def download_tracks(event, _):
  body = event["body"]
  songs = eval(body)

  TMP_FOLDER = '/tmp'

  # aws lambda allows to write only in /tmp folder
  os.chdir(TMP_FOLDER)
   
   # Download all tracks videos as .mp4
  for song in songs:
    url = 'https://www.youtube.com/watch?v=' + song
    pafy.new(url).getbest().download()
  
  # Upload to s3 
  s3 = boto3.client('s3')
  for file in glob.glob("*.mp4"):  
    with open(file, "rb") as f:
      s3.upload_fileobj(f, "whitechapel-dev-tracks", file)

  response = {
    "statusCode": 200,
    "body": json.dumps(songs)
  }

  return response

def download_zip(event, _):
  
  extract_audio()
  
  response = {
    "statusCode": 200,
    "body": "Downloaded .zip"
  }

  return response