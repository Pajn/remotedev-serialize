var helpers = require('../helpers');
var mark = helpers.mark;
var extract = helpers.extract;
var refer = helpers.refer;
var jsanCycle = require('jsan/lib/cycle');

var jsanOptions = {
  'date': true,
  'function': true,
  'regex': true,
  'undefined': true,
  'error': true,
  'symbol': true,
  'map': true,
  'set': true,
  'nan': true,
  'infinity': true
}

module.exports = function serialize() {
  return {
    replacer: function replacer(key, value) {
      if (value instanceof Map) return mark(jsanCycle.decycle(Array.from(value.entries()), jsanOptions, replacer), 'Map');
      if (value instanceof Set) return mark(jsanCycle.decycle(Array.from(value.values()), jsanOptions, replacer), 'Set');
      return value;
    },

    reviver: function(key, value) {
      if (typeof value === 'object' && value !== null && '__serializedType__'  in value) {
        var data = value.data;
        switch (value.__serializedType__) {
          case 'Map': return new Map(jsanCycle.retrocycle(data));
          case 'Set': return new Set(jsanCycle.retrocycle(data));
          default: return data;
        }
      }
      return value;
    }
  }   
};
