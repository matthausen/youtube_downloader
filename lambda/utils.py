import boto3
from botocore.exceptions import ClientError
import os, time
import moviepy.editor as mp
import shutil
from urllib.parse import urlparse


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

def extract_audio():
  s3 = boto3.resource('s3')
  bucket = s3.Bucket('whitechapel-dev-tracks')

  file_path = 's3://whitechapel-dev-tracks'

  # Convert all videos to mp3s and create a .zip file
  for obj in bucket.objects.all():
    if obj.key.endswith('.mp4'):
      file = obj.key
      mp4_path = os.path.join(file_path,file)
      print('mp4_path: ',mp4_path)
      mp3_path = os.path.join(file_path,os.path.splitext(file)[0]+'.mp3')
      print('mp3_path: ',mp3_path)
      new_file = mp.AudioFileClip(mp4_path)
      new_file.write_audiofile(mp3_path)  
      os.remove(mp4_path)
      shutil.make_archive('Music ' + str(time.time()), 'zip', file_path.path)