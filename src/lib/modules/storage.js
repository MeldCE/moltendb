'use strict';

if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

/**
 */
define('modules/storage', ['moltendb', 'modules/registry'],
    function(moltendb, registry) {
  return registry('storage', {});
});

