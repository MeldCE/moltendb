'use strict';

if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

let moltendb = {
  logger: console.log
};

/**
 * Logger function for MoltenDB that can be used to either log something to
 * the logger if the particular logging (given by id) is on or to determine
 * whether a particular logging is on
 *
 * @param {string|string[]} id String identifier or Array of string
 *        identifiers to allow for fine logging output
 * @param {*} [data] Thing to log to the logger
 *
 * @returns{boolean} Whether the particular logging is on
 */
moltendb.log = function moltenDbLog(id, data) {
  if (moltendb.options && moltendb.options.debug) {
    if (typeof id === 'string') {
      id = id.split('.');
    }

    let debug = moltendb.options.debug;
    while(debug instanceof Object) {
      if (!id.length) {
        break;
      }
      if (debug[id[0]]) {
        debug = debug[id.shift()];
      }
    }

    if (debug) {
      if (data) {
        moltendb.logger(data);
      }
      return true;
    }
  }
  return false;
};

/**
 * The MoltenDB namespace object used to store everything MoltenDB related
 */
define('moltendb', [], function() {
  return moltendb;
});
