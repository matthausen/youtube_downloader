import json
from youtube_search import YoutubeSearch
import pafy
import moviepy.editor as mp
import boto3
from botocore.exceptions import ClientError


def get_tracks(event, context):

  search_term = event["body"]
  result = YoutubeSearch(search_term, max_results=20).to_json()

  response = {
      "statusCode": 200,
      "body": result
  }

  return response

def download_tracks(event, _):

  songs = event["body"]
  print(songs)

  for song in songs:
    url = 'https://www.youtube.com/watch?v=' + song
    pafy.new(url).getbest().download()

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