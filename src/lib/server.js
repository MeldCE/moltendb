'use strict';

if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define('server', ['moltendb'], function(moltendb) {
  let skemer = require('skemer');
  let fs = require('fs');
  let path = require('path');
  let cp = require('cp');
  let jsonCrud = require('json-crud');

  let moltenOptions = require('json!schemas/molten-options.json');

  console.log('moltenOptions is', moltenOptions);

  return function(options) {
    console.log('returning promise');
    return new Promise(function(resolve, reject) {
      console.log('promise running');
      // Validate the initial options
      try {
        options = skemer.validateNew({
          schema: moltenOptions,
          parameterName: 'options'
        }, options || {});
      } catch (err) {
        return reject(err);
      }
      
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

      // Load the module libraries
      try {
        // Add module registers
        moltendb.storage = require('modules/storage');
        // Load all modules synchronously
        require('modules/storage/json-crud');
        //  'glob!./modules/types/**/*.js',
        //  'glob!./modules/storage/**/*.js'

        console.log(moltendb.storage.list());
      } catch(err) {
        console.log('error', err.stack);
        return Promise.reject(err);
      }

      // Start load of config file as a JSON database
      try {
        let dbPromise = jsonCrud(options.configFile)
        
        dbPromise.then(function(config) {
          console.log('config loaded', config);

          // Load tables and views databases
          config.read('tables').then(function(tables) {
            if (tables === undefined) {
              tables = {
                engine: 'json-crud',
                path: 'data/tables/'
              };

              // Check if table exists already
              try {
                fs.accessSync(path.resolve(process.cwd(), tables.path),
                    fs.R_OK | fs.W_OK);
              } catch (err) {
                if (err.code === 'ENOENT') {
                  // Copy template table database over
                } else {
                  return Promise.reject(err);
                }
              }
            }
            console.log('tables data', tables);
          }, function(err) {
            console.log('tab', err);
          });
        }, function jsonCrudError(err) {
          reject(err);
        });
      } catch(err) {
        return reject(err);
      }
    });
  }
});
