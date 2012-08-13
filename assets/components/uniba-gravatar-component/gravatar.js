/**
 * Module dependencies.
 */

var md5 = require('md5-component')
  , jsonp = require('jsonp/jsonp')

/**
 * Creates an avatar <img> element
 *
 * @param {String} email
 * @param {Number} size (150)
 * @return {Image} 
 * @api public
 */

exports.img = function (email, size) {
  size = size || 150;
  var url = 'https://www.gravatar.com/avatar/' + md5(email);
  var el = document.createElement('img');
  el.setAttribute('src', url);
  if (size) {
    el.setAttribute('width', size);
    el.setAttribute('height', size);
  }
  return el;
}

/**
 * Looks up a profile.
 *
 * @param {String} email
 * @param {Function} callback
 * @api public
 */

exports.profile = function (email, fn) {
  jsonp('https://www.gravatar.com/' + md5(email) + '.json', function (err, obj) {
    if (err) return fn(err);
    if (obj && obj.entry) {
      fn(null, obj.entry[0]);
    } else {
      fn(new Error('Bad response'));
    }
  });
}

/**
 * Shortcut to produce a username from an email.
 *
 * @param {String} email
 * @param {Function} callback
 * @api public
 */

exports.username = function (email, fn) {
  exports.profile(email, function (err, prof) {
    if (err) return fn(err);
    if (prof && prof.preferredUsername) {
      fn(null, prof.preferredUsername);
    } else {
      fn(null, '');
    }
  });
}
