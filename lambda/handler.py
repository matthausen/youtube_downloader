import json
from youtube_search import YoutubeSearch

def get_tracks(event, context):
  print(json.dumps(event))
  request = json.dumps(event)
  search_term=request["body"]
  print('search term: ', search_term)
  result = YoutubeSearch(search_term, max_results=20).to_json()

  print(result)

  response = {
      "statusCode": 200,
      "body": json.dumps(event["body"])
  }

  return response