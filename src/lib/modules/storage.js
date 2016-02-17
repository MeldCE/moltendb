'use strict';

if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

/**
 */
define(['lib/moltendb'], function(moltendb) {
  let skemer, engineSchema;
  
  // Load Skemer and the engine schema if schemaCheck logging is enabled
  if (moltendb.log('schemaCheck')) {
    skemer = require('skemer');
    engineSchema = require('../../schema/storage.json');
  }

  /* @private
   * Stores the storage engines that are registered
   */
  let engines = {};

  let engineInfo = {};
  let engineInfoFresh = false;
  return {
    /**
     * Registers a storage engine with MoltenDB
     *
     * @param {string} id String identifier for storage engine being registered
     * @param {Object} engine Object containing storage engine definition
     * @param {boolean} overwrite Whether or not to overwrite an existing
     *        storage engine with the same identifier
     *
     * @returns {undefined}
     * @throws {Error} Throws an Error if something goes wrong
     */
    register: function registerStorageEngine(id, engine, overwrite) {
      if (moltendb.log('schemaCheck', 'Checking schema for storage engine '
          + id)) {
        skemer.validateNew({
          schema: engineSchema
          parameterName: id
        }, engine);
      }

      if (!overwrite && engines[id] !== undefined) {
        throw new Error('Storage engine with the id of `' + id + '` already '
            + 'exists. To overwrite, set `overwrite` to true');
      }

      engines[id] = engine;
      engineInfoFresh = false;
    },

    /**
     * Test for the existence of a storage engine with a given ID
     *
     * @param {string} id ID to check that a storage engine exists with that
     *        IDs
     *
     * @returns {boolean} Whether or not a storage engine with that ID exists
     */
    have: function haveStorageEngine(id) {
      return (engines[id] !== undefined);
    },

    /**
     * Create an instance of the storage engine
     *
     * @param {string} id String identifier of storage engine to create an
     *        instance of
     * @param {*} options Options to pass to the storage engine when
     *        initialising it
     *
     * @returns {Promise} The Promise given by the storage engine constructor
     *          that should resolve to the instance of the storage engine
     *
     * @name moltendb.storage.create
     */
    create: function createStorageEngineInstance(id) {
      if (engines[id] === undefined) {
        return Promise.reject(new Error('No storage engine
    },

    /**
     * Get information on the available storage engines
     *
     * @returns {Object} An Object containing information on the available
     *          storage engines
     */
    list: function listStorageEngines(id) {
      if (!engineInfoFresh) {
        engineInfo = Object.keys(engines).reduce(function(previous, current) {
          previous[current] = {
            label: engines[current],
            description: engines[current],
            options: engines[current]
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
