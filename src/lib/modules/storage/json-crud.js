//'use strict';

if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

/**
 */
define(['moltendb', 'modules/storage', 'json-crud'], function(moltendb, storage, jsonCrud) {
  moltendb.storage.register('json-crud', {
    label: 'JSON File Storage',
    description: 'Store information in either a single JSON file or in a '
        + 'folder with a JSON file for each object',
    options: jsonCrud.optionsSchema,
    writable: true,
    readable: true,
    constructor: jsonCrud
  });
});
