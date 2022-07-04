## Available Scripts

In the project root directory, you can run:
### `npm install`
To install all dependency for server side
### `npm start`

Will start the server at port 8080
After server booted, go to client folder
### `cd client`
### `npm install`
To install dependencies of client side (react)
### `npm start`
to start the webpack server that serve React app
at http://localhost:3000
in client package.json, we proxy to express server:
"proxy":"http://localhost:8080"
All request in client side will direct to express server
for mongo DB connect, need to install mongoDB Compact 
on local machine, or server will switch to global URI
to connect mongo Atlas


