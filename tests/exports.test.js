import { describe, it } from 'node:test'
import assert from 'node:assert'
import {
  // Core
  HttpErr,

  // 4xx Client Errors
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
  UnavailableForLegalReasons,

  // 5xx Server Errors
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
  NetworkAuthRequired,

  // OnEr 4xx
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

  // OnEr 5xx
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
} from '../src/http-err.js'

describe('Export naming spec', () => {

  describe('HttpErr shortcuts - 4xx', () => {

    it('BadRequest (400)', () => assert.strictEqual(typeof BadRequest, 'function'))
    it('Unauthorized (401)', () => assert.strictEqual(typeof Unauthorized, 'function'))
    it('PaymentRequired (402)', () => assert.strictEqual(typeof PaymentRequired, 'function'))
    it('Forbidden (403)', () => assert.strictEqual(typeof Forbidden, 'function'))
    it('NotFound (404)', () => assert.strictEqual(typeof NotFound, 'function'))
    it('MethodNotAllowed (405)', () => assert.strictEqual(typeof MethodNotAllowed, 'function'))
    it('NotAcceptable (406)', () => assert.strictEqual(typeof NotAcceptable, 'function'))
    it('ProxyAuthRequired (407)', () => assert.strictEqual(typeof ProxyAuthRequired, 'function'))
    it('ReqTimeout (408)', () => assert.strictEqual(typeof ReqTimeout, 'function'))
    it('Conflict (409)', () => assert.strictEqual(typeof Conflict, 'function'))
    it('GoneErr (410)', () => assert.strictEqual(typeof GoneErr, 'function'))
    it('LengthRequired (411)', () => assert.strictEqual(typeof LengthRequired, 'function'))
    it('PreconditionFailed (412)', () => assert.strictEqual(typeof PreconditionFailed, 'function'))
    it('PayloadTooLarge (413)', () => assert.strictEqual(typeof PayloadTooLarge, 'function'))
    it('UriTooLong (414)', () => assert.strictEqual(typeof UriTooLong, 'function'))
    it('UnsupportedMediaType (415)', () => assert.strictEqual(typeof UnsupportedMediaType, 'function'))
    it('RangeNotSatisfiable (416)', () => assert.strictEqual(typeof RangeNotSatisfiable, 'function'))
    it('ExpectationFailed (417)', () => assert.strictEqual(typeof ExpectationFailed, 'function'))
    it('TeapotErr (418)', () => assert.strictEqual(typeof TeapotErr, 'function'))
    it('MisdirectedReq (421)', () => assert.strictEqual(typeof MisdirectedReq, 'function'))
    it('UnprocessableEntity (422)', () => assert.strictEqual(typeof UnprocessableEntity, 'function'))
    it('Locked (423)', () => assert.strictEqual(typeof Locked, 'function'))
    it('FailedDependency (424)', () => assert.strictEqual(typeof FailedDependency, 'function'))
    it('TooEarly (425)', () => assert.strictEqual(typeof TooEarly, 'function'))
    it('UpgradeRequired (426)', () => assert.strictEqual(typeof UpgradeRequired, 'function'))
    it('PreconditionRequired (428)', () => assert.strictEqual(typeof PreconditionRequired, 'function'))
    it('TooManyReqs (429)', () => assert.strictEqual(typeof TooManyReqs, 'function'))
    it('ReqHeaderFldTooLarge (431)', () => assert.strictEqual(typeof ReqHeaderFldTooLarge, 'function'))
    it('UnavailableForLegalReasons (451)', () => assert.strictEqual(typeof UnavailableForLegalReasons, 'function'))
  })

  describe('HttpErr shortcuts - 5xx', () => {

    it('InternalServerErr (500)', () => assert.strictEqual(typeof InternalServerErr, 'function'))
    it('NotImplemented (501)', () => assert.strictEqual(typeof NotImplemented, 'function'))
    it('BadGateway (502)', () => assert.strictEqual(typeof BadGateway, 'function'))
    it('ServiceUnavailable (503)', () => assert.strictEqual(typeof ServiceUnavailable, 'function'))
    it('GatewayTimeout (504)', () => assert.strictEqual(typeof GatewayTimeout, 'function'))
    it('HttpVersionNotSupported (505)', () => assert.strictEqual(typeof HttpVersionNotSupported, 'function'))
    it('VariantAlsoNegotiates (506)', () => assert.strictEqual(typeof VariantAlsoNegotiates, 'function'))
    it('InsufficientStorage (507)', () => assert.strictEqual(typeof InsufficientStorage, 'function'))
    it('LoopDetected (508)', () => assert.strictEqual(typeof LoopDetected, 'function'))
    it('BandwidthLimitExceeded (509)', () => assert.strictEqual(typeof BandwidthLimitExceeded, 'function'))
    it('NotExtended (510)', () => assert.strictEqual(typeof NotExtended, 'function'))
    it('NetworkAuthRequired (511)', () => assert.strictEqual(typeof NetworkAuthRequired, 'function'))
  })

  describe('OnEr wrappers - 4xx', () => {

    it('OnErBadRequest (400)', () => assert.strictEqual(typeof OnErBadRequest, 'function'))
    it('OnErUnauthorized (401)', () => assert.strictEqual(typeof OnErUnauthorized, 'function'))
    it('OnErPaymentRequired (402)', () => assert.strictEqual(typeof OnErPaymentRequired, 'function'))
    it('OnErForbidden (403)', () => assert.strictEqual(typeof OnErForbidden, 'function'))
    it('OnErNotFound (404)', () => assert.strictEqual(typeof OnErNotFound, 'function'))
    it('OnErMethodNotAllowed (405)', () => assert.strictEqual(typeof OnErMethodNotAllowed, 'function'))
    it('OnErNotAcceptable (406)', () => assert.strictEqual(typeof OnErNotAcceptable, 'function'))
    it('OnErProxyAuthRequired (407)', () => assert.strictEqual(typeof OnErProxyAuthRequired, 'function'))
    it('OnErReqTimeout (408)', () => assert.strictEqual(typeof OnErReqTimeout, 'function'))
    it('OnErConflict (409)', () => assert.strictEqual(typeof OnErConflict, 'function'))
    it('OnErGone (410)', () => assert.strictEqual(typeof OnErGone, 'function'))
    it('OnErLengthRequired (411)', () => assert.strictEqual(typeof OnErLengthRequired, 'function'))
    it('OnErPreconditionFailed (412)', () => assert.strictEqual(typeof OnErPreconditionFailed, 'function'))
    it('OnErPayloadTooLarge (413)', () => assert.strictEqual(typeof OnErPayloadTooLarge, 'function'))
    it('OnErUriTooLong (414)', () => assert.strictEqual(typeof OnErUriTooLong, 'function'))
    it('OnErUnsupportedMediaType (415)', () => assert.strictEqual(typeof OnErUnsupportedMediaType, 'function'))
    it('OnErRangeNotSatisfiable (416)', () => assert.strictEqual(typeof OnErRangeNotSatisfiable, 'function'))
    it('OnErExpectationFailed (417)', () => assert.strictEqual(typeof OnErExpectationFailed, 'function'))
    it('OnErTeapot (418)', () => assert.strictEqual(typeof OnErTeapot, 'function'))
    it('OnErMisdirectedReq (421)', () => assert.strictEqual(typeof OnErMisdirectedReq, 'function'))
    it('OnErUnprocessableEntity (422)', () => assert.strictEqual(typeof OnErUnprocessableEntity, 'function'))
    it('OnErLocked (423)', () => assert.strictEqual(typeof OnErLocked, 'function'))
    it('OnErFailedDependency (424)', () => assert.strictEqual(typeof OnErFailedDependency, 'function'))
    it('OnErTooEarly (425)', () => assert.strictEqual(typeof OnErTooEarly, 'function'))
    it('OnErUpgradeRequired (426)', () => assert.strictEqual(typeof OnErUpgradeRequired, 'function'))
    it('OnErPreconditionRequired (428)', () => assert.strictEqual(typeof OnErPreconditionRequired, 'function'))
    it('OnErTooManyReqs (429)', () => assert.strictEqual(typeof OnErTooManyReqs, 'function'))
    it('OnErReqHeaderFldTooLarge (431)', () => assert.strictEqual(typeof OnErReqHeaderFldTooLarge, 'function'))
    it('OnErUnavailableForLegalReasons (451)', () => assert.strictEqual(typeof OnErUnavailableForLegalReasons, 'function'))
  })

  describe('OnEr wrappers - 5xx', () => {

    it('OnErInternalServerErr (500)', () => assert.strictEqual(typeof OnErInternalServerErr, 'function'))
    it('OnErNotImplemented (501)', () => assert.strictEqual(typeof OnErNotImplemented, 'function'))
    it('OnErBadGateway (502)', () => assert.strictEqual(typeof OnErBadGateway, 'function'))
    it('OnErServiceUnavailable (503)', () => assert.strictEqual(typeof OnErServiceUnavailable, 'function'))
    it('OnErGatewayTimeout (504)', () => assert.strictEqual(typeof OnErGatewayTimeout, 'function'))
    it('OnErHttpVersionNotSupported (505)', () => assert.strictEqual(typeof OnErHttpVersionNotSupported, 'function'))
    it('OnErVariantAlsoNegotiates (506)', () => assert.strictEqual(typeof OnErVariantAlsoNegotiates, 'function'))
    it('OnErInsufficientStorage (507)', () => assert.strictEqual(typeof OnErInsufficientStorage, 'function'))
    it('OnErLoopDetected (508)', () => assert.strictEqual(typeof OnErLoopDetected, 'function'))
    it('OnErBandwidthLimitExceeded (509)', () => assert.strictEqual(typeof OnErBandwidthLimitExceeded, 'function'))
    it('OnErNotExtended (510)', () => assert.strictEqual(typeof OnErNotExtended, 'function'))
    it('OnErNetworkAuthRequired (511)', () => assert.strictEqual(typeof OnErNetworkAuthRequired, 'function'))
  })

  describe('Core', () => {

    it('HttpErr', () => assert.strictEqual(typeof HttpErr, 'function'))
  })
})
