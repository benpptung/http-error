# http-error

HTTP Error utilities based on @lvigil/err.

## Install

```bash
pnpm add github:benpptung/http-error
```

## Usage

```js
import { NotFound, BadRequest, HttpErr, OnErNotFound } from 'http-error'

// 404
if (!user) throw NotFound({ userId })

// 400 with context
if (!valid) throw BadRequest({ input })

// Generic HTTP error
throw HttpErr(403, { userId, path, grant, gate })

// Wrap existing error
catch (err) {
  throw OnErNotFound(err, { userId })
}
```

## API

- `HttpErr(status, [context_dict], [flag_dict])` - Generic HTTP error (400-599)

Shorthand for common HTTP errors:

- `NotFound()`, `BadRequest()`, `Unauthorized()`, `Forbidden()`, `InternalServerError()`, etc.

- `OnErNotFound(err)`, `OnErBadRequest(err)`, etc. - Wrap existing errors

All errors have `.status` property.
