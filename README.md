# stromtrooper
A mock server to depict usage of postman collections for mocking twitter api responses

## requriements:
1. node version 0.12.7 (Note: it should work for any version nothing special has been used in this).
2. postman client (any rest client)
3. npm 

## Setup:
1. Do a `git checkout` in any given folder.
2. Run `npm install` in the checked out fodler.
3. To start the server in the `stromtrooper` folder run command `node bin/www`

## Usage:
Below are the endpoints supported by the server:
```
- /1.1/search/tweets.json (Supportes statuses 200 and 400).
- /1.1/users/show.json (Supportes statuses 200 and 400).
- /1.1/statuses/mentions_timeline.json (beyond this only suports 200 status)
- /1.1/friends/list.json
- /1.1/followers/list.json
- /1.1/mutes/users/list.json
```

Note that server by default runs on port `3000`, I am assuming that there has been no port change you can test below endpoints.

If you hit server with no status query `http://localhost:3000/mock/1.1/search/tweets.json` it will assume status code as 200.
For 400 statusCode, explicity it needs to be mentioned in query `http://localhost:3000/mock/1.1/search/tweets.json?status=400`

##### Note: To generate random response based on the body schema attach `mockRandom=1` in the query params

Try: `http://localhost:3000/mock/1.1/search/tweets.json?mockRandom=1`
##TODO:
- Testcases :)
- Test suport for POST/PUT/DELETE/PATCH request, currently only tested GET 
