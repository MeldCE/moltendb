'use strict';

if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

/**
 */
define('modules/types', ['moltendb', 'modules/registry'],
    function(moltendb, registry) {
  return registry('type', {});
});

