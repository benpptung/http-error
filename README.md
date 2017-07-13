# http-error

```
npm install benpptung/http-error -S
```

# Usage
```
const OnBadGateway = require('http-error').OnBadGateway;


db.find(something, onError);

function onError(err) {
  
  callback(OnBadGateway(err));
}

```