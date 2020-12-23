npm run build
aws s3 sync build/ s3://whitechapel-229107932276-react-app --acl public-read