import json, os, re, glob
from youtube_search import YoutubeSearch
import pafy
import moviepy.editor as mp
import boto3
from botocore.exceptions import ClientError
import shutil

def upload_file(file_name, bucket, object_name=None):
  
  if object_name is None:
      object_name = file_name

  s3_client = boto3.client('s3')
  try:
      response = s3_client.upload_file(file_name, bucket, object_name)
  except ClientError as e:
      logging.error(e)
      return False
  return True


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
  
  # Upload to S3 bucket
  for file in glob.glob("*.mp4"):
    s3 = boto3.client('s3')
    with open(file, "rb") as f:
      s3.upload_fileobj(f, "whitechapel-dev-tracks", file)
  
  # Convert all videos to mp3s and create a .zip file
  """for file in glob.glob("*.mp4"):
  mp4_path = os.path.join(os.getcwd(),file)
  mp3_path = os.path.join(os.getcwd(),os.path.splitext(file)[0]+'.mp3')
  new_file = mp.AudioFileClip(mp4_path)
  new_file.write_audiofile(mp3_path)  
  os.remove(mp4_path)
  shutil.make_archive('Music', 'zip', os.getcwd()) """

  response = {
    "statusCode": 200,
    "body": json.dumps(songs)
  }

  return response