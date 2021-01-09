[youtubemusicdownload.app](https://www.youtubemusicdownload.app)

This web app allows the user to search artists, albums and tracks via the unofficial YouTube API and to download a single or multiple tracks on their laptop or smartphones as MP3

## Deployment
This app is deployed as a dyno on Heroku

Create aan app:
- `heroku create APP_NAME`

Add remote branch:
- `heroku git:remote -a APP_NAME`

Push changes to the branch:
- `git push heroku BRANCH_NAME:master`

Bash into application to verify changes:
- `heroku run bash -a APP_NAME`

Check latest logs:
- `heroku logs --tail`


## TODO:

- CCI

- Browser logo
