'use strict';

if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

/**
 */
define('modules/storage', ['moltendb', 'modules/registry'],
    function setupStorageEngineRegistry(moltendb, registry) {
   moltendb.storage = registry('storage', {});
   return moltendb.storage;
});

