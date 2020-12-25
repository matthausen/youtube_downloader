Domain: youtubemusicdownload.app

## Deployment
This app is deployed as a dyno on Heroku
Follow tutorial on: https://medium.com/swlh/how-to-deploy-a-react-python-flask-project-on-heroku-edb99309311

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

- Deployment with custom domain name

- Avatar for each song name

- Add duration on song list

- Plug in in Google Analytics

- CCI

- Browser logo
