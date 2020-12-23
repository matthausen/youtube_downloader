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

Bash into application to evrify changes:
- `heroku run bash -a APP_NAME`


## TODO:

- Add user feedback (snackbar) when download is in progress and done.

- Deploy

- Plug in in Google Analytics

- Customise theme

- CCI

- Browser logo
