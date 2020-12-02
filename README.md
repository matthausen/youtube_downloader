Domain: youtubemusicdownload.app

## Deployment

Refer to this guide for deployment: 
https://adamraudonis.medium.com/how-to-deploy-a-website-on-aws-with-docker-flask-react-from-scratch-d0845ebd9da4

ECS + docker for the service
S3 for the frontend
Route55 for the domain
CDN

## TODO:

- Select multiple song and create a virtual list (chips component) of songs to be downloaded all at once

- Trigger the download in the browser. The music is doewnloaded on a file storage and then provided to the FE via send_file flask method

- Plug in in Google Analytics

- Deployment: Refer to point above