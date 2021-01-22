import json


def hello(event, context):
    body = {
        "message": "Welcome to whitechapel project!",
        "input": event
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response
