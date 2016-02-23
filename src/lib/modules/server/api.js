//'use strict';

let Promise = require('promise');

if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

/**
 */
define(['moltendb', 'modules/server'], function(moltendb, server) {
  function getSchema(req, res) {
  };

  function API(options) {
    return new Promise(function (resolve, reject) {
      // Check for express server
      if (options.app === undefined) {
        reject(new Error('No Express App given'));
      } else {
        // Check for pre
        let uri = '/';
        if (options.uri) {
        }

        // Schema requests
        app.get(uri + 'schema/:table', getSchema);

        // API
        app.get(uri);
      }
    });
  }



  moltendb.server.register('api', {
    label: 'API Server Module',
    description: 'Adds the ability to interacte with MoltenDB throught a CRUD '
        + 'API',
    paths: ['api','schema'],
    constructor: API
  });
})
