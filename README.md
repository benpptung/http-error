# http-error

HTTP Error utilities based on [@lvigil/err](https://www.npmjs.com/package/@lvigil/err).

## Install

```bash
pnpm add @lvigil/http-error
```

## Usage

```js
import { NotFound, BadRequest, HttpErr, OnErNotFound } from '@lvigil/http-error'

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

`err.message` is always HTTP status text (e.g. "Not Found"). Use `.m()` to append messages for debugging.

```js
throw NotFound({ userId }).m('user lookup failed')
// err.message === 'Not Found'
// err.msgs === ['Not Found', 'user lookup failed']
```

`OnEr<Name>` error instance also set `err.message` to HTTP status text, but preserve the original message in history:

```js
const e = new Error('db connection failed')
throw OnErInternalServerError(e)
// err.message === 'Internal Server Error'
// err.msgs === ['db connection failed', 'Internal Server Error']
```

See [@lvigil/err](https://github.com/benpptung/err) for the full error API.
