### Locally
1. Install dependencies
```sh
npm install
```
2. Run start script
```sh
npm run start
```
If you want to protect API with access token, you need to rename .env.example file to .env and update value for ACCESS_TOKEN.

### Docker

1. Build docker image
```sh
docker build . -t node_api
```

2. Run docker image
```
// With token
docker run -d -p 3000:3000 -e ACCESS_TOKEN="your_custom_token" node_api

// Without token
docker run -d -p 3000:3000 node_api
```
