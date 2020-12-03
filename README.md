Domain: youtubemusicdownload.app

## Deployment

Refer to this guide for deployment: 
https://adamraudonis.medium.com/how-to-deploy-a-website-on-aws-with-docker-flask-react-from-scratch-d0845ebd9da4

ECS + docker for the service
S3 for the frontend
Route55 for the domain
CDN

## TODO:

- Bugfix: The file is downloaded ion m4a or webm format instead of .mp3

- Trigger the download in the browser. The music is downloaded on a file storage and then provided to the FE via send_file flask method

- Plug in in Google Analytics

- Deployment: Refer to point above