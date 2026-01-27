import { describe, it } from 'node:test'
import assert from 'node:assert'
import {
  HttpErr, NotFound, BadRequest, Forbidden,
  OnErBadRequest, OnErNotFound, OnErForbidden, OnErInternalServerError
} from '../src/http-err.js'

describe('HttpErr', () => {

  describe('status', () => {

    it('should accept valid status code (400-599)', () => {
      const err = HttpErr(404)
      assert.strictEqual(err.status, 404)
    })

    it('should default to 500 for invalid status', () => {
      assert.strictEqual(HttpErr(200).status, 500)
      assert.strictEqual(HttpErr(399).status, 500)
      assert.strictEqual(HttpErr(600).status, 500)
    })

    it('should convert string status to number', () => {
      const err = HttpErr('403')
      assert.strictEqual(err.status, 403)
    })
  })

  describe('message', () => {

    it('should equal STATUS[status]', () => {
      assert.strictEqual(HttpErr(400).message, 'Bad Request')
      assert.strictEqual(HttpErr(404).message, 'Not Found')
      assert.strictEqual(HttpErr(500).message, 'Internal Server Error')
    })

    it('should remain unchanged after calling .m()', () => {
      const err = HttpErr(403)
      err.m('access denied').m('check permission')
      assert.strictEqual(err.message, 'Forbidden')
    })
  })

  describe('message history (msgs)', () => {

    it('should be an array', () => {
      const err = HttpErr(404)
      assert.ok(Array.isArray(err.msgs))
    })

    it('should start with STATUS[status] as first element', () => {
      const err = HttpErr(404)
      assert.strictEqual(err.msgs[0], 'Not Found')
      assert.strictEqual(err.msgs.length, 1)
    })

    it('should append messages via .m() in chronological order', () => {
      const err = HttpErr(403)
      err.m('access denied').m('check permission')
      assert.deepStrictEqual(err.msgs, ['Forbidden', 'access denied', 'check permission'])
    })
  })

  describe('context_dict', () => {

    it('should store in err.original', () => {
      const err = HttpErr(403, { userId: 123, path: '/admin' })
      assert.strictEqual(err.original.userId, 123)
      assert.strictEqual(err.original.path, '/admin')
    })

    it('should handle null', () => {
      const err = HttpErr(404, null)
      assert.ok(err.original)
    })
  })

  describe('flag_dict', () => {

    it('should attach properties to err', () => {
      const err = HttpErr(403, null, { code: 'NO_PERMISSION' })
      assert.strictEqual(err.code, 'NO_PERMISSION')
    })

    it('should not override status', () => {
      const err = HttpErr(404, null, { status: 999 })
      assert.strictEqual(err.status, 404)
    })

    it('should support string as key-mirror', () => {
      const err = HttpErr(404, null, 'USER_NOT_FOUND')
      assert.strictEqual(err.USER_NOT_FOUND, 'USER_NOT_FOUND')
    })

    it('should work with shorthand functions', () => {
      assert.strictEqual(NotFound(null, 'USER_NOT_FOUND').USER_NOT_FOUND, 'USER_NOT_FOUND')
      assert.strictEqual(BadRequest(null, 'INVALID_INPUT').INVALID_INPUT, 'INVALID_INPUT')
      assert.strictEqual(Forbidden(null, 'NO_PERMISSION').NO_PERMISSION, 'NO_PERMISSION')
    })
  })

  describe('chainable methods', () => {

    it('should return Error instance', () => {
      const err = HttpErr(500)
      assert.ok(err instanceof Error)
    })

    it('should have m, f, c methods', () => {
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
      const e = new Error('original')
      const er = OnErBadRequest(e)
      assert.strictEqual(er, e)
    })

    it('should work for all wrappers', () => {
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

  describe('status', () => {

    it('should attach correct status for each wrapper', () => {
      assert.strictEqual(OnErBadRequest(new Error()).status, 400)
      assert.strictEqual(OnErNotFound(new Error()).status, 404)
      assert.strictEqual(OnErForbidden(new Error()).status, 403)
      assert.strictEqual(OnErInternalServerError(new Error()).status, 500)
    })
  })

  describe('message', () => {

    it('should replace original message with STATUS[status]', () => {
      const e = new Error('db connection failed')
      const er = OnErInternalServerError(e)
      assert.strictEqual(er.message, 'Internal Server Error')
    })

    it('should remain unchanged after calling .m()', () => {
      const e = new Error('original')
      const er = OnErNotFound(e).m('additional info')
      assert.strictEqual(er.message, 'Not Found')
    })
  })

  describe('message history (msgs)', () => {

    it('should preserve original message as first element', () => {
      const e = new Error('db error')
      const er = OnErInternalServerError(e)
      assert.strictEqual(er.msgs[0], 'db error')
    })

    it('should append STATUS[status] as second element', () => {
      const e = new Error('db error')
      const er = OnErInternalServerError(e)
      assert.strictEqual(er.msgs[1], 'Internal Server Error')
      assert.strictEqual(er.msgs.length, 2)
    })

    it('should maintain chronological order regardless of constructor type', () => {
      // HttpErr: starts with STATUS[status]
      const err1 = HttpErr(404).m('first').m('second')
      assert.deepStrictEqual(err1.msgs, ['Not Found', 'first', 'second'])

      // OnEr<Name>: starts with original message, then STATUS[status]
      const err2 = OnErNotFound(new Error('original')).m('first').m('second')
      assert.deepStrictEqual(err2.msgs, ['original', 'Not Found', 'first', 'second'])
    })

    it('should append via .m() after STATUS[status]', () => {
      const e = new Error('original message')
      const er = OnErNotFound(e).m('wrapped once').m('wrapped twice')
      assert.deepStrictEqual(er.msgs, ['original message', 'Not Found', 'wrapped once', 'wrapped twice'])
    })
  })

  describe('context_dict merging', () => {

    it('should merge with old values winning', () => {
      const e = new Error('test')
      OnErBadRequest(e, { userId: 1 })
      OnErBadRequest(e, { userId: 2, path: '/api' })
      assert.strictEqual(e.original.userId, 1)
      assert.strictEqual(e.original.path, '/api')
    })
  })

  describe('flag_dict merging', () => {

    it('should merge with new values winning', () => {
      const e = new Error('test')
      e.code = 'OLD_CODE'
      OnErBadRequest(e, null, { code: 'NEW_CODE' })
      assert.strictEqual(e.code, 'NEW_CODE')
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
})
