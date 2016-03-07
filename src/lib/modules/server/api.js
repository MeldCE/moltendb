'use strict';

let Promise = require('promise');
let path = require('path');

if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

/**
 */
define(['moltendb', 'modules/server'], function(moltendb, server) {
  /**
   * Callback to handle schema GET requests
   *
   * @param {Express.Request} req Express Request object
   * @param {Express.Response} res Express Response object
   *
   * @returns {undefined}
   */
  function getSchema(req, res, next) {
    console.log('HELLO');
    // Get the table schema
    moltendb.tables.read(req.params.table).then(function returnSchema(schema) {
      try {
      if (schema === undefined) {
        res.sendStatus(404);
      } else {
        res.json(schema);
      }
      } catch(err) {
        res.status(500).send(err.stack);
      }
      next();
    }, function(err) {
      res.status(500).send(err.stack);
      next();
    });
  }

  /**
   * Callback to handle data GET requests
   *
   * @param {Express.Request} req Express Request object
   * @param {Express.Response} res Express Response object
   *
   * @returns {undefined}
   */
  function getData(req, res) {}

  /**
   * Callback to handle data PUT requests
   *
   * @param {Express.Request} req Express Request object
   * @param {Express.Response} res Express Response object
   *
   * @returns {undefined}
   */
  function storeData(req, res) {}

  /**
   * Callback to handle data DELETE requests
   *
   * @param {Express.Request} req Express Request object
   * @param {Express.Response} res Express Response object
   *
   * @returns {undefined}
   */
  function deleteData(req, res) {}

  /**
   * Constructor for API server module
   *
   * @param {Object} options Options for server module
   *
   * @returns {Promise} A Promise that the API server module will be set up
   *
   * @constructor
   */
  function API(options) {
    return new Promise(function (resolve, reject) {
      // Schema requests
      console.log('api', 'Adding listener for GET:'
          + path.join(moltendb.options.uri, options.schemaPath, ':table'));
      moltendb.app.get(path.join(moltendb.options.uri, options.schemaPath,
          ':table'), getSchema);

      // API
      console.log('api', 'Adding listener for GET:'
          + path.join(moltendb.options.uri, options.apiPath, ':table/:id'));
      moltendb.app.get(path.join(moltendb.options.uri, options.apiPath,
          ':table/:id'), getData);
      console.log('api', 'Adding listener for POST:'
          + path.join(moltendb.options.uri, options.apiPath, ':table'));
      moltendb.app.post(path.join(moltendb.options.uri, options.apiPath,
          ':table'), storeData);
      console.log('api', 'Adding listener for DELETE:'
          + path.join(moltendb.options.uri, options.apiPath, ':table/:id'));
      moltendb.app.delete(path.join(moltendb.options.uri, options.apiPath,
          ':table/:id'), deleteData);

      resolve();
    });
  }

  moltendb.server.register('api', {
    label: 'API Server Module',
    description: 'Adds the ability to interacte with MoltenDB through a CRUD '
        + 'API',
    options: {
      type: {
        apiPath: {
          type: 'string',
          default: 'api'
        },
        schemaPath: {
          type: 'string',
          default: 'schema'
        }
      }
    },
    constructor: API
  });
});
