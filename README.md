# YouTube Music Download App

Search for songs and artists with the python youtube api and select one or more songs to download directly from your browser.

### TODO:

- Change the UI:
- Change donation button
- Allow only one download at the time
- Add tooltip explaining the 30sec limit

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


