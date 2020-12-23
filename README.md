Domain: youtubemusicdownload.app

## Deployment

### Frontend
Navigate to the `client` folder and build:
- `npm run build`

Then upload to S3:
- `aws s3 sync build/ s3://whitechapel-229107932276-react-app --acl public-read`

### Backend
Build and push the image:
- `docker build -t matthausen/whitechapel:latest`
- `docker push matthausen/whitechapel`

The image is uploaded to the docker hub registry: "registry.hub.docker.com/matthausen/whitechapel:latest"
- `pip install awsebcli`
- `eb init`
- `eb deploy`

Refer to this guide for deployment: 
https://adamraudonis.medium.com/how-to-deploy-a-website-on-aws-with-docker-flask-react-from-scratch-d0845ebd9da4

- ElasticBeanstalk + Docker container
- S3 for the frontend
- Route55 for the domain
- CDN

## TODO:

- Add user feedback (snackbar) when download is in progress and done.

- Deploy

- Plug in in Google Analytics

- Customise theme

- CCI

- Browser logo
