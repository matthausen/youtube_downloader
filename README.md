## TODO
- add function to search for tracks
- add function to download tracks to s3 bucket

### S3 bucket for tracks
- `bucket_arn = 'arn:aws:s3:::whitechapel-dev-tracks'`

https://www.serverless.com/blog/serverless-python-packaging

## Deployment
Start a serverless framework project with boilerplate:

- ```serverless create \
  --template aws-python3 \
  --name PROJECT-NAME \
  --path PROJECT-NAME

Initialise a npm module

- `npm init`

Manage python dependencies installing:

- `npm install --save serverless-python-requirements`

Inject python dependencies:

- `plugins:
  - serverless-python-requirements

custom:
  pythonRequirements:
    dockerizePip: non-linux`

Deploy:

- `serverless deploy` or
- `sls deploy`

Invoke function

- `serverless invoke -f hello --log`
