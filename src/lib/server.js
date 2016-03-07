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
        // Make the URI absolute
        options.uri = path.join('/', options.uri);
        moltendb.options = options;
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
          } catch(newErr) {
            newErr.message = 'Error creating settings from defaults: '
                + newErr.message;
            return reject(newErr);
          }
        } else {
          return reject(err);
        }
      }

      // Load the module libraries
      try {
        // Add module registers
        //XXX moltendb.storage = require('modules/storage');
        require('modules/storage');
        require('modules/server');
        // Load all modules synchronously
        require('modules/storage/json-crud');
        require('modules/server/api');
        //  'glob!./modules/types/**/*.js',
        //  'glob!./modules/storage/**/*.js'

        console.log(moltendb.storage.list());
      } catch(err) {
        console.log('error', err.stack);
        return Promise.reject(err);
      }

      // Start load of config file as a JSON database
      try {
        let dbPromise = jsonCrud(options.configFile);
        
        dbPromise.then(function saveConfig(config) {
          console.log('config loaded', config);
          moltendb.config = config;

          return Promise.resolve();
        }).then(function loadSystemTables() {
          // Load tables and views databases
          return Promise.all([
            moltendb.config.read('tables').then(function(tables) {
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

                // Write it back to the settings
                return moltendb.config.create('tables'. tables)
                    .then(function() {
                  return Promise.resolve(tables);
                });
              } else {
                return Promise.resolve(tables);
              }
            }).then(function(tables) {
              // Check the engine exists
              if (moltendb.storage.have(tables.engine)) {
                console.log('tables', tables);
                return moltendb.storage.create(tables.engine, tables);
              } else {
                return Promise.reject(new Error('Storage engine '
                    + tables.engine + ' for tables table does not exst'));
              }
            }),
            moltendb.config.read('views').then(function(views) {
              if (views === undefined) {
                views = {
                  engine: 'json-crud',
                  path: 'data/views/'
                };

                // Write it back to the settings
                return moltendb.config.create('views'. views)
                    .then(function() {
                  return Promise.resolve(views);
                });
              } else {
                return Promise.resolve(views);
              }
            }).then(function(views) {
              // Check the engine exists
              if (moltendb.storage.have(views.engine)) {
                return moltendb.storage.create(views.engine, views);
              } else {
                return Promise.reject(new Error('Storage engine '
                    + views.engine + ' for views table does not exst'));
              }
            })
          ]).then(function saveTablesAndLoadModuleConfig(dbs) {
            console.log('system tables are', dbs);
            moltendb.tables = dbs[0];
            moltendb.views = dbs[1];
            
            // Check to see if we have settings for what to load
            return moltendb.config.read('modules');
          });
        }).then(function loadServerModules(modules) {
          let ownApp = false;
          // Load application if we don't have one already
          if (!options.app) {
            // Start our own app
            options.app = require('express')();
            ownApp = true;
          }

          moltendb.app = options.app;

          // Create out own socket

          // Load the default modules
          if (modules === undefined) {
            modules = {
              api: true
            };
            moltendb.config.create('modules', modules);
          }

          // Start loading modules
          let m, servers = [];
          for (m in modules) {
            if (modules[m] && moltendb.server.have(m)) {
              servers.push(moltendb.server.create(m));
            }
          }

          console.log(servers, 'ownApp is', ownApp);
          return Promise.all(servers).then(function() {
            console.log('servers ready');
            return Promise.resolve(ownApp);
          });
        }).then(function startOwnAppListening(ownApp) {
          console.log('ownApp is', ownApp);
          // Set app to listen if it is our own
          if (ownApp) {
            try {
              moltendb.app.listen(options.port, options.address);
              console.log('MoltenDB listening on ' + options.address + ':'
                  + options.port);
            } catch(err) {
              return Promise.reject(err);
            }
          }

          return Promise.resolve();
        }).catch(function moltendbError(err) {
          console.log('got an error');
          reject(err);
        });
      } catch(err) {
        return reject(err);
      }
    });
  };
});
