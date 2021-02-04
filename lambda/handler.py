import json, os, re, glob
import requests
from youtube_search import YoutubeSearch
import pafy
import boto3
import moviepy.editor as mp
from utils import upload_file, create_presigned_url

def get_songs(event, context):

  search_term = event["body"]
  result = YoutubeSearch(search_term, max_results=20).to_json()

  response = {
      "statusCode": 200,
      "body": result
  }

  return response

def convert_songs(event, _):
  body = event["body"]
  songs = eval(body)
  TMP_FOLDER = '/tmp'

  # aws lambda allows to write only in /tmp/tracks folder
  os.chdir(TMP_FOLDER)
  new_dir = os.path.join(TMP_FOLDER, 'tracks')
  os.mkdir(new_dir)
  os.chdir(new_dir)
   
   # Download all tracks videos as .mp4
  for song in songs:
    url = 'https://www.youtube.com/watch?v=' + song
    pafy.new(url).getbest().download()
  
  # Upload to s3 
  for file in glob.glob("*.mp4"):
    mp4_path = os.path.join(os.getcwd(),file)
    print(mp4_path)
    mp3_path = os.path.join(os.getcwd(),os.path.splitext(file)[0]+'.mp3')
    print(mp3_path)
    new_file = mp.AudioFileClip(mp4_path)
    new_file.write_audiofile(mp3_path)  
    os.remove(mp4_path)

  # Upload .mp3 files to S3 bucket
  s3 = boto3.client('s3')
  for file in glob.glob("*.mp3"):
    print(f'Uploading {file} to the bucket ...')
    with open(file, "rb") as f:
      s3.upload_fileobj(f, "whitechapel-dev-tracks", file)

  response = {
    "statusCode": 200,
    "body": json.dumps(songs)
  }

  return response

def download_songs(event, _):
  # read objects in bucket
  s3 = boto3.resource('s3')
  bucket = s3.Bucket('whitechapel-dev-tracks')
  pre_signed_urls = []

  for obj in bucket.objects.all():
    key = obj.key
    
    url = create_presigned_url('whitechapel-dev-tracks', key)
    
    if url is not None:
      pre_signed_urls.append(url)

  response = {
    "statusCode": 200,
    "body": json.dumps(pre_signed_urls)
  }

  return response