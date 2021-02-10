# YouTube Music DOwnload App

Search for songs and artists with the python youtube api and select one or more songs to download directly from your browser.

PS:
There is a limit of 30 seconds execution. Make sure your connection is stable


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


