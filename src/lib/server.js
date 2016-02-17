'use strict';

if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define('server', ['moltendb'], function(require) {
  let skemer = require('skemer');
  let fs = require('fs');
  let path = require('path');
  let jsonCrud = require('json-crud');

  let moltenOptions = require('../schemas/molten-options.json');

  return function(options) {
    return new Promise(function(resolve, reject) {
      // Validate the initial options
      options = skemer.validateNew({
        schema: moltenOptions
      }, options);

      // Check if the file exists
      try {
        fs.accessSync(path.resolve(process.cwd(), options.configFile),
          fs.R_OK | fs.W_OK);
      } catch(err) {
        if (err.code === 'ENOENT') {
          // Try and create the default settings
          try {
            cp.sync('settings.json', options.configFile);
          } catch(err) {
            err.message = 'Error creating settings from defaults: '
                + err.message;
            return reject(err);
          }
        } else {
          return reject(err);
        }
      }

      // Start load of config file as a JSON database
      let dbPromise = jsonCrud(options.configFile)
      
      dbPromise.then(function(config) {
        // Load all modules
        require([
          'glob!./modules/types/**/*.js',
          'glob!./modules/storage/**/*.js'
        ], function() {
          // Load the system tables
        });
      }, function jsonCrudError(err) {
        reject(err);
      });
    });
  }
});
