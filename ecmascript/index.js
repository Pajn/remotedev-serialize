var jsan = require('jsan');
var serialize = require('./serialize');

module.exports = function() {
  return {
    stringify: function(data) {
      return jsan.stringify(data, serialize().replacer, null, true);
    },
    parse: function(data) {
      return jsan.parse(data, serialize().reviver);
    },
    serialize: serialize
  }
};
