'use strict';
var RequireJS = require('requirejs');
var Promise = require('promise');

RequireJS.config({
  nodeRequire: require,
  baseUrl: 'lib/',
  paths: {
    'json': '../ext/requirejs-plugins/src/json',
    'text': '../ext/requirejs-plugins/lib/text'
  },
  glob: 'lib/'
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

RequireJS(['server'], function(moltenServer) {
  moltenServer().then(function(moltendb) {
    console.log('yipee', arguments);
    moltendb.log('yipee', 'yipee');
  }, function(err) {
    console.error('error', err.stack);
  });
});
