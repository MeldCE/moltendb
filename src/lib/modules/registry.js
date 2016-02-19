'use strict';

if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

/**
 */
define('modules/registry', ['moltendb'], function registryModule(moltendb) {
  let skemer;
    
  // Load Skemer
  if (moltendb.log('schemaCheck')) {
    skemer = require('skemer');
  }

  return function createEngineRegistry(name, schema) {
    // Check the engine registry schema
    if (moltendb.log('schemaCheck')) {
    }

    /* @private
     * Stores the engines that are registered
     */
    let engines = {};

    let engineInfo = {};
    let engineInfoFresh = false;
    return {
      /**
       * Registers a engine with MoltenDB
       *
       * @param {string} id String identifier for engine being registered
       * @param {Object} engine Object containing engine definition
       * @param {boolean} overwrite Whether or not to overwrite an existing
       *        storage engine with the same identifier
       *
       * @returns {undefined}
       * @throws {Error} Throws an Error if something goes wrong
       */
      register: function registerEngine(id, engine, overwrite) {
        console.log('register called for ', id);
        if (moltendb.log('schemaCheck', 'Checking schema for ' + name
            + 'engine ' + id)) {
          skemer.validateNew({
            schema: engineSchema,
            parameterName: id
          }, engine);
        }

        if (!overwrite && engines[id] !== undefined) {
          throw new Error('A ' + name + ' engine with the id of `' + id
              + '` already exists. To overwrite, set `overwrite` to true');
        }

        engines[id] = engine;
        engineInfoFresh = false;
      },

      /**
       * Test for the existence of a engine with a given ID
       *
       * @param {string} id ID to check that a engine exists with that
       *        IDs
       *
       * @returns {boolean} Whether or not a engine with that ID exists
       */
      have: function haveEngine(id) {
        return (engines[id] !== undefined);
      },

      /**
       * Create an instance of the engine
       *
       * @param {string} id String identifier of engine to create an
       *        instance of
       * @param {*} options Options to pass to the engine when
       *        initialising it
       *
       * @returns {Promise} The Promise given by the engine constructor
       *          that should resolve to the instance of the engine
       *
       * @name moltendb.storage.create
       */
      create: function createEngineInstance(id, options) {
        if (engines[id] === undefined) {
          return Promise.reject(new Error('No ' + name + ' engine with the '
              + 'id of ' + id));
        }

        return engines[id].constructor(options);
      },

      /**
       * Get information on the available storage engines
       *
       * @returns {Object} An Object containing information on the available
       *          storage engines
       */
      list: function listEngines() {
        if (!engineInfoFresh) {
          engineInfo = Object.keys(engines).reduce(function(previous, current) {
            previous[current] = {
              label: engines[current].label,
              description: engines[current].description,
              options: engines[current].options
            };
            return previous;
          }, {});
          engineInfoFresh = true;

          /* Attach a listener to ensure it is marked as not fresh if something
           * changes it.
           */
          if (Object.observe) {
            Object.observe(engineInfo, function() {
              engineInfoFresh = false;
            });
          }
        }

        return engineInfo;
      }
    };
  }
});

