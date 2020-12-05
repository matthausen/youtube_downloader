## Push the frontend code to AWS S3

Run: 
- `yarn build`

and to push ot the bucket
- `aws s3 sync build/ s3://whitechapel-229107932276-react-app --acl public-read`