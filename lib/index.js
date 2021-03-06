'use strict';

var STATUS = require('http').STATUS_CODES;

exports.HttpError = HttpError;
function HttpError(status, message, original) {

  if (!/^\d+$/.test(status) || (status < 400) || (status > 599)) {
    status = 500;
  }

  if (typeof message !== 'string') {
    original = message;
    message = STATUS[status];
  }

  var err = new InfoError(message, original);
  err.status = status;
  return err;
}

/**
 *
 * @param message
 * @param [original]
 * @constructor
 */
exports.InfoError = InfoError;
function InfoError(message, original) {
  if (original !== Object(original)) {
    original = {};
  }

  var err = new Error(message);
  err.original = original;
  err.browser = browser;
  err.toUserJSON = toUserJSON;
  return err;
}

exports.NotFound = function(message, original) {
  return HttpError(404, message, original);
};

exports.Forbidden = function(message, original) {
  return HttpError(403, message, original);
};

exports.BadRequest = function(message, original) {
  return HttpError(400, message, original);
}

exports.BadGateway = function(message, original) {
  return HttpError(502, message, original);
}

exports.OnErNotFound = function(err, original) {
  let er = OnError(err, original)
  if (!er.status) er.status = 404
  return er
}

exports.OnErBadRequest = function(err, original) {
  let er = OnError(err, original)
  if (!er.status) er.status = 400
  return er
}

exports.OnErForbidden = function(err, original) {
  let er = OnError(err, original);
  if (!er.status) er.status = 403;
  return er
}

exports.OnErBadGateway = exports.OnBadGateway = function(err, original) {
  let er = OnError(err, original);
  if (!er.status) er.status = 502;
  return er;
};

exports.OnError = OnError;
/**
 * OnError
 * @param       {Error} err
 * @param       {Object} [original]
 * @constructor
 */
function OnError(err, original) {
  if (Object(err) !== err) err = {}; // defensive, if err is undefined.

  // fix bug -- original might be null
  err.original = Object.assign( {}, original, err.original);
  err.browser = browser;
  err.toUserJSON = toUserJSON;

  if (err.response && err.response.text) {
    var errText = err.response.text
    try {
      errText = JSON.parse(err.response.text)
    }
    catch (er) { /* continue */ }
    err.original.errText = errText
  }

  return err;
}

/**
 * attach note to error for browser user.
 * @param  {Object} note
 * @param  {string} note.reason
 * @param  {Object} note.info
 * @return {Error}
 * @note {
 *    reason: is.string,
 *    info: is.object
 * }
 */
function browser(note) {
  this.reason = note.reason;
  this.info = note.info;
  this.cor_id = note.cor_id;
  return this;
}

/**
 * return a json object for browser or public user, no message or original data
 * @param  {number} [cor_id]
 * @return {Object}
 */
function toUserJSON(cor_id) {
  return {
    ok: false,
    cor_id: this.cor_id || cor_id,
    message: this.reason || STATUS[this.status] || 'error',
    reason: this.reason,
    info: this.info
  }
}
