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

// --- Name generation ---

const ADD_ERR_SUFFIX = new Set([410, 418])  // Gone, Teapot - 負面語義不夠強


// --- Generate all functions ---

const HTTP_STATUSES = Object.keys(STATUS).map(Number).filter(s => s >= 400 && s <= 599)

const http_err_dict = {}
const on_http_err_dict ={}

for (const status of HTTP_STATUSES) {
  http_err_dict[status_to_name(status)] = create_HttpErr(status)
  on_http_err_dict['OnEr' + status_to_name(status, { is_HttpErr: false })] = create_OnHttpErr(status)
}

// --- Core function ---

export function HttpErr(status, context_dict = null, flag_dict = null) {
  status = Number(status)
  if (status < 400 || status > 599 || !STATUS[status])
    status = 500

  return Err(STATUS[status], context_dict, flag_dict).f({status})
}

// --- 4xx Client Errors ---

export const {
  BadRequest,
  Unauthorized,
  PaymentRequired,
  Forbidden,
  NotFound,
  MethodNotAllowed,
  NotAcceptable,
  ProxyAuthRequired,
  ReqTimeout,
  Conflict,
  GoneErr,
  LengthRequired,
  PreconditionFailed,
  PayloadTooLarge,
  UriTooLong,
  UnsupportedMediaType,
  RangeNotSatisfiable,
  ExpectationFailed,
  TeapotErr,
  MisdirectedReq,
  UnprocessableEntity,
  Locked,
  FailedDependency,
  TooEarly,
  UpgradeRequired,
  PreconditionRequired,
  TooManyReqs,
  ReqHeaderFldTooLarge,
  UnavailableForLegalReasons
} = http_err_dict

// --- 5xx Server Errors ---

export const {
  InternalServerErr,
  NotImplemented,
  BadGateway,
  ServiceUnavailable,
  GatewayTimeout,
  HttpVersionNotSupported,
  VariantAlsoNegotiates,
  InsufficientStorage,
  LoopDetected,
  BandwidthLimitExceeded,
  NotExtended,
  NetworkAuthRequired
} = http_err_dict

// --- OnEr wrappers (all) ---

export const {
  // 4xx
  OnErBadRequest,
  OnErUnauthorized,
  OnErPaymentRequired,
  OnErForbidden,
  OnErNotFound,
  OnErMethodNotAllowed,
  OnErNotAcceptable,
  OnErProxyAuthRequired,
  OnErReqTimeout,
  OnErConflict,
  OnErGone,
  OnErLengthRequired,
  OnErPreconditionFailed,
  OnErPayloadTooLarge,
  OnErUriTooLong,
  OnErUnsupportedMediaType,
  OnErRangeNotSatisfiable,
  OnErExpectationFailed,
  OnErTeapot,
  OnErMisdirectedReq,
  OnErUnprocessableEntity,
  OnErLocked,
  OnErFailedDependency,
  OnErTooEarly,
  OnErUpgradeRequired,
  OnErPreconditionRequired,
  OnErTooManyReqs,
  OnErReqHeaderFldTooLarge,
  OnErUnavailableForLegalReasons,
  // 5xx
  OnErInternalServerErr,
  OnErNotImplemented,
  OnErBadGateway,
  OnErServiceUnavailable,
  OnErGatewayTimeout,
  OnErHttpVersionNotSupported,
  OnErVariantAlsoNegotiates,
  OnErInsufficientStorage,
  OnErLoopDetected,
  OnErBandwidthLimitExceeded,
  OnErNotExtended,
  OnErNetworkAuthRequired
} = on_http_err_dict


function status_to_name(status, { is_HttpErr = true } = {}) {
  let name = STATUS[status]
    .replace(/[^a-zA-Z ]/g, '')
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('')
    .replace(/Authentication/g, 'Auth')
    .replace(/Request/g, 'Req')
    .replace(/Fields/g, 'Fld')
    .replace(/Error$/g, 'Err')
    .replace(/^ImATeapot$/, 'Teapot')
    .replace(/^BadReq$/, 'BadRequest')

  if (is_HttpErr && ADD_ERR_SUFFIX.has(status)) name += 'Err'

  return name
}

// --- Factory functions ---

function create_HttpErr(status) {
  return (context_dict, flag_dict) => HttpErr(status, context_dict, flag_dict)
}

function create_OnHttpErr(status) {
  return (err, context_dict, flag_dict) => {
    const er = OnErr(err, context_dict, flag_dict)
      .f({ status })
      .m(STATUS[status]) // keep the message history

    // HttpErr.message MUST keep consistent with STATUS[status]
    er.message = STATUS[status]
    return er
  }
}