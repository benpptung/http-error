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

  if (original !== Object(original)) {
    original = {};
  }

  var err = new Error(message);
  err.status = status;
  err.original = original;
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

exports.OnBadGateway = function(err, original) {
  err.status = 502;
  err.original = Object.assign( {}, original, err.original);
  return err;
};