import { Err, OnErr } from '@lvigil/err'
import { STATUS_CODES as STATUS } from 'http'
export { Err, OnErr }

/**
 * @typedef {Error & {
 *   status: number,
 *   m: function(string): HttpError,
 *   f: function(Object|string): HttpError,
 *   c: function(Object): HttpError
 * }} HttpError
 */

/**
 * Creates an HTTP error with status code and optional context/flags.
 * Invalid status codes default to 500.
 * @param {number|string} status - HTTP status code (400-599)
 * @param {Object|null} [context_dict] - Context for debugging
 * @param {Object|string|null} [flag_dict] - Flags for program logic
 * @returns {HttpError}
 */
export function HttpErr(status, context_dict = null, flag_dict = null) {
  status = Number(status)
  if (status < 400 || status > 599 || !STATUS[status]) 
    status = 500

  const message = STATUS[status]
  
  flag_dict = { ...flag_dict, status }
  
  return Err(message, context_dict, flag_dict)
}

// 4xx Client Errors

/** 
 * @param {Object|null} [context_dict] 
 * @param {Object|string|null} [flag_dict] 
 * @returns {HttpError} 
 **/
export function BadRequest(context_dict, flag_dict) { 
  return HttpErr(400, context_dict, flag_dict)
}

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function Unauthorized(context_dict, flag_dict) { return HttpErr(401, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function PaymentRequired(context_dict, flag_dict) { return HttpErr(402, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function Forbidden(context_dict, flag_dict) { return HttpErr(403, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function NotFound(context_dict, flag_dict) { return HttpErr(404, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function MethodNotAllowed(context_dict, flag_dict) { return HttpErr(405, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function NotAcceptable(context_dict, flag_dict) { return HttpErr(406, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function ProxyAuthRequired(context_dict, flag_dict) { return HttpErr(407, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function RequestTimeout(context_dict, flag_dict) { return HttpErr(408, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function Conflict(context_dict, flag_dict) { return HttpErr(409, context_dict, flag_dict) }

/** 
 * @param {Object|null} [context_dict] 
 * @param {Object|string|null} [flag_dict] 
 * @returns {HttpError} 
 **/
export function GoneErr(context_dict, flag_dict) { 
  return HttpErr(410, context_dict, flag_dict) 
}

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function LengthRequired(context_dict, flag_dict) { return HttpErr(411, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function PreconditionFailed(context_dict, flag_dict) { return HttpErr(412, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function PayloadTooLarge(context_dict, flag_dict) { return HttpErr(413, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function URITooLong(context_dict, flag_dict) { return HttpErr(414, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function UnsupportedMediaType(context_dict, flag_dict) { return HttpErr(415, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function RangeNotSatisfiable(context_dict, flag_dict) { return HttpErr(416, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function ExpectationFailed(context_dict, flag_dict) { return HttpErr(417, context_dict, flag_dict) }

/** 
 * @param {Object|null} [context_dict] 
 * @param {Object|string|null} [flag_dict] 
 * @returns {HttpError} */
export function TeapotErr(context_dict, flag_dict) { 
  return HttpErr(418, context_dict, flag_dict) 
}

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function MisdirectedRequest(context_dict, flag_dict) { return HttpErr(421, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function UnprocessableEntity(context_dict, flag_dict) { return HttpErr(422, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function Locked(context_dict, flag_dict) { return HttpErr(423, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function FailedDependency(context_dict, flag_dict) { return HttpErr(424, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function TooEarly(context_dict, flag_dict) { return HttpErr(425, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function UpgradeRequired(context_dict, flag_dict) { return HttpErr(426, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function PreconditionRequired(context_dict, flag_dict) { return HttpErr(428, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function TooManyRequests(context_dict, flag_dict) { return HttpErr(429, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function HeaderFieldsTooLarge(context_dict, flag_dict) { return HttpErr(431, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function UnavailableForLegalReasons(context_dict, flag_dict) { return HttpErr(451, context_dict, flag_dict) }

// 5xx Server Errors

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function InternalServerError(context_dict, flag_dict) { return HttpErr(500, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function NotImplemented(context_dict, flag_dict) { return HttpErr(501, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function BadGateway(context_dict, flag_dict) { return HttpErr(502, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function ServiceUnavailable(context_dict, flag_dict) { return HttpErr(503, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function GatewayTimeout(context_dict, flag_dict) { return HttpErr(504, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function HTTPVersionNotSupported(context_dict, flag_dict) { return HttpErr(505, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function VariantAlsoNegotiates(context_dict, flag_dict) { return HttpErr(506, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function InsufficientStorage(context_dict, flag_dict) { return HttpErr(507, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function LoopDetected(context_dict, flag_dict) { return HttpErr(508, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function NotExtended(context_dict, flag_dict) { return HttpErr(510, context_dict, flag_dict) }

/** @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function NetworkAuthRequired(context_dict, flag_dict) { return HttpErr(511, context_dict, flag_dict) }

// OnEr wrappers - 常用的

/** @param {Error} err 
 * @param {Object|null} [context_dict] 
 * @param {Object|string|null} [flag_dict] 
 * @returns {HttpError} 
 **/
export function OnErBadRequest(err, context_dict, flag_dict) { 
  return OnErr(err, context_dict, flag_dict).f({ status: 400 }) 
}

/** @param {Error} err @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function OnErUnauthorized(err, context_dict, flag_dict) { return OnErr(err, context_dict, flag_dict).f({ status: 401 }) }

/** @param {Error} err @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function OnErForbidden(err, context_dict, flag_dict) { return OnErr(err, context_dict, flag_dict).f({ status: 403 }) }

/** @param {Error} err @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function OnErNotFound(err, context_dict, flag_dict) { return OnErr(err, context_dict, flag_dict).f({ status: 404 }) }

/** @param {Error} err @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function OnErConflict(err, context_dict, flag_dict) { return OnErr(err, context_dict, flag_dict).f({ status: 409 }) }

/** @param {Error} err @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function OnErUnprocessableEntity(err, context_dict, flag_dict) { return OnErr(err, context_dict, flag_dict).f({ status: 422 }) }

/** @param {Error} err @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function OnErTooManyRequests(err, context_dict, flag_dict) { return OnErr(err, context_dict, flag_dict).f({ status: 429 }) }

/** @param {Error} err @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function OnErInternalServerError(err, context_dict, flag_dict) { return OnErr(err, context_dict, flag_dict).f({ status: 500 }) }

/** @param {Error} err @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function OnErBadGateway(err, context_dict, flag_dict) { return OnErr(err, context_dict, flag_dict).f({ status: 502 }) }

/** @param {Error} err @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function OnErServiceUnavailable(err, context_dict, flag_dict) { return OnErr(err, context_dict, flag_dict).f({ status: 503 }) }

/** @param {Error} err @param {Object|null} [context_dict] @param {Object|string|null} [flag_dict] @returns {HttpError} */
export function OnErGatewayTimeout(err, context_dict, flag_dict) { return OnErr(err, context_dict, flag_dict).f({ status: 504 }) }