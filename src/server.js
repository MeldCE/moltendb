'use strict';
var RequireJS = require('requirejs');
var Promise = require('promise');

RequireJS.config({
  nodeRequire: require,
  baseUrl: 'lib/'
});

// Promiseify requirejs
/*var requirejs = function() {
  return new Promise(function(resolve, reject) {

    try {

    } catch(err) {
      reject(err);
    }
  });
}*/

RequireJS(['server'], function(molten) {
  if (molten === undefined) {
    console.err('error');
  }
  console.log('yipee', arguments);
  molten.log('yipee', 'yipee');
});
