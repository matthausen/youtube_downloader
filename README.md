Domain: youtubemusicdownload.app

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
