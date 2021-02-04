import boto3
from botocore.exceptions import ClientError
import os, time
import moviepy.editor as mp
import shutil

# upload_file: function  to upload file to s3 bucket as .mp3
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

# create_presigned_url: function to generate a presigned URL to share an S3 object
def create_presigned_url(bucket_name, object_name, expiration=3600):

    s3_client = boto3.client('s3')
    try:
        response = s3_client.generate_presigned_url('get_object',
                                                    Params={'Bucket': bucket_name,
                                                            'Key': object_name},
                                                    ExpiresIn=expiration)
    except ClientError as e:
        logging.error(e)
        return None

    return response