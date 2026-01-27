import { describe, it } from 'node:test'
import assert from 'node:assert'
import {
  HttpErr, NotFound, BadRequest, Forbidden,
  OnErBadRequest, OnErNotFound, OnErForbidden, OnErInternalServerError
} from '../src/http-err.js'

describe('HttpErr', () => {

  describe('status handling', () => {

    it('should use valid status code (400-599)', () => {
      const err = HttpErr(404)
      assert.strictEqual(err.status, 404)
      assert.strictEqual(err.message, 'Not Found')
    })

    it('should default to 500 for invalid status', () => {
      assert.strictEqual(HttpErr(200).status, 500)
      assert.strictEqual(HttpErr(600).status, 500)
      assert.strictEqual(HttpErr(499).status, 500)
    })

    it('should convert string status to number', () => {
      const err = HttpErr('403')
      assert.strictEqual(err.status, 403)
      assert.strictEqual(err.message, 'Forbidden')
    })
  })

  describe('context_dict', () => {

    it('should store context_dict in err.original', () => {
      const userId = 123
      const path = '/admin'
      const err = HttpErr(403, { userId, path })
      assert.strictEqual(err.original.userId, 123)
      assert.strictEqual(err.original.path, '/admin')
    })

    it('should handle null context_dict', () => {
      const err = HttpErr(404, null)
      assert.ok(err.original)
    })
  })

  describe('flag_dict', () => {

    it('should attach flag_dict properties to err', () => {
      const err = HttpErr(403, null, { code: 'NO_PERMISSION' })
      assert.strictEqual(err.code, 'NO_PERMISSION')
    })

    it('should always include status in flags', () => {
      const err = HttpErr(404, null, { code: 'USER_NOT_FOUND' })
      assert.strictEqual(err.status, 404)
      assert.strictEqual(err.code, 'USER_NOT_FOUND')
    })

    it('should not override existing status in flag_dict', () => {
      const err = HttpErr(404, null, { status: 999 })
      assert.strictEqual(err.status, 404)
    })

    it('should support string flag_dict as key-mirror', () => {
      const err = HttpErr(404, null, 'USER_NOT_FOUND')
      assert.strictEqual(err.USER_NOT_FOUND, 'USER_NOT_FOUND')
      assert.strictEqual(err.status, 404)
    })

    it('should support key-mirror in common errors', () => {
      assert.strictEqual(NotFound(null, 'USER_NOT_FOUND').USER_NOT_FOUND, 'USER_NOT_FOUND')
      assert.strictEqual(BadRequest(null, 'INVALID_INPUT').INVALID_INPUT, 'INVALID_INPUT')
      assert.strictEqual(Forbidden(null, 'NO_PERMISSION').NO_PERMISSION, 'NO_PERMISSION')
    })
  })

  describe('error instance', () => {

    it('should return Error instance', () => {
      const err = HttpErr(500)
      assert.ok(err instanceof Error)
    })

    it('should have msgs array with message', () => {
      const err = HttpErr(404)
      assert.ok(Array.isArray(err.msgs))
      assert.strictEqual(err.msgs[0], 'Not Found')
    })

    it('should have message equal to STATUS[status] and fixed at msgs[0]', () => {
      const err = HttpErr(403)
      assert.strictEqual(err.message, 'Forbidden')
      assert.strictEqual(err.msgs[0], 'Forbidden')
      err.m('access denied').m('check permission')
      assert.strictEqual(err.message, 'Forbidden')
      assert.strictEqual(err.msgs[0], 'Forbidden')
      assert.deepStrictEqual(err.msgs, ['Forbidden', 'access denied', 'check permission'])
    })

    it('should replace original Error message by Status message. if using OnEr<Name> error constructor', () => {
      const e = new Error('not found')
      const er = OnErNotFound(e)
      assert.strictEqual(e, er)
      assert.strictEqual(er.message, 'Not Found')
      assert.strictEqual(er.msgs.length, 2)
      assert.strictEqual(er.status, 404)
    })

    it('should have chainable methods m, f, c', () => {
      const err = HttpErr(404)
      assert.strictEqual(typeof err.m, 'function')
      assert.strictEqual(typeof err.f, 'function')
      assert.strictEqual(typeof err.c, 'function')
    })
  })
})

describe('OnEr<Name> wrappers', () => {

  describe('instance identity', () => {

    it('should return same Error instance', () => {
      const e = new Error('original error')
      const er = OnErBadRequest(e)
      assert.strictEqual(er, e)
    })

    it('should return same instance for all OnErr wrappers', () => {
      const e1 = new Error('test')
      const e2 = new Error('test')
      const e3 = new Error('test')
      const e4 = new Error('test')
      assert.strictEqual(OnErBadRequest(e1), e1)
      assert.strictEqual(OnErNotFound(e2), e2)
      assert.strictEqual(OnErForbidden(e3), e3)
      assert.strictEqual(OnErInternalServerError(e4), e4)
    })
  })

  describe('status flag', () => {

    it('should attach status via .f()', () => {
      const e = new Error('not found')
      const er = OnErNotFound(e)
      assert.strictEqual(er.status, 404)
    })

    it('should attach correct status for each wrapper', () => {
      assert.strictEqual(OnErBadRequest(new Error()).status, 400)
      assert.strictEqual(OnErNotFound(new Error()).status, 404)
      assert.strictEqual(OnErForbidden(new Error()).status, 403)
      assert.strictEqual(OnErInternalServerError(new Error()).status, 500)
    })
  })

  describe('non-Error input', () => {

    it('should convert plain object to Error', () => {
      const obj = { code: 'E_CUSTOM', data: 123 }
      const er = OnErBadRequest(obj)
      assert.ok(er instanceof Error)
      assert.strictEqual(er.status, 400)
      assert.strictEqual(er.code, 'E_CUSTOM')
      assert.strictEqual(er.data, 123)
    })

    it('should handle string input', () => {
      const er = OnErNotFound('some string')
      assert.ok(er instanceof Error)
      assert.strictEqual(er.status, 404)
    })
  })

  describe('context_dict merging (old wins)', () => {

    it('should preserve original context when merging', () => {
      const e = new Error('test')
      OnErBadRequest(e, { userId: 1 })
      OnErBadRequest(e, { userId: 2, path: '/api' })
      assert.strictEqual(e.original.userId, 1)
      assert.strictEqual(e.original.path, '/api')
    })
  })

  describe('flag_dict merging (new wins)', () => {

    it('should override flags with new values', () => {
      const e = new Error('test')
      e.code = 'OLD_CODE'
      OnErBadRequest(e, null, { code: 'NEW_CODE' })
      assert.strictEqual(e.code, 'NEW_CODE')
    })
  })

  describe('msgs accumulation', () => {

    it('should preserve and append msgs', () => {
      const e = new Error('original message')
      const er = OnErNotFound(e).m('wrapped once').m('wrapped twice')
      assert.deepStrictEqual(er.msgs, ['original message', 'Not Found', 'wrapped once', 'wrapped twice'])
    })
  })
})
