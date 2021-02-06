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


### TODO

- clean bucket after function is called
- change endpoints in frontend
- deploy frontend on s3
- Redirect domain url