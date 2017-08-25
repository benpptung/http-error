# http-error

```
npm install benpptung/http-error -S
```

# Why
http-error is designed for the following reasons:

- Server logging, when something wrong, we should know why, `original` property is designed for this

- Hide server message for security reason and tell the user what you want to say, so `reason`, `info` are designed if Http status code is not enough

# Usage
```
const OnBadGateway = require('http-error').OnBadGateway;


db.find(something, onError);

function onError(err) {

  callback(OnBadGateway(err));
}

```
