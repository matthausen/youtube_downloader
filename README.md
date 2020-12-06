Domain: youtubemusicdownload.app

## Deployment

Refer to this guide for deployment: 
https://adamraudonis.medium.com/how-to-deploy-a-website-on-aws-with-docker-flask-react-from-scratch-d0845ebd9da4

ECS + docker for the service
S3 for the frontend
Route55 for the domain
CDN

## TODO:


- Save file to S3 bucket

- Conversion from m4a or webm to .mp3 (aws lambda trigger) - pydub AudioSegment.from_file("/tracks/file").export("/output/file", format="mp3")

- Trigger download in the browser.

- Delete file from s3 bucket

- Add user feedback (snackbar) when download is in progress and done.

- Plug in in Google Analytics

- Deployment: AWS ECS (contasiners) vs ElasticBeanStalk

- browser logo

- Customise theme