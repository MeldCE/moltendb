var assert = require('assert');
var users = require('./users.js');

module.exports = {};

/**
 * MoltenDB module for handling permissions.
 */
function Permissions() {
}

Permissions.prototype = {
  /**
   * Checks and returns whether a user has a specific permission.
   *
   * @param {String} permission String identifier of the permission to check
   *        for.
   * @param {users.User} user The user to check if they have the permission.
   *
   * @returns {Boolean} Whether the given user has the given permission
   */
  can: function(permission, user) {
    assert(typeof permission === 'string', 'permission identifier must be a '
        + 'string.');
  },

  /**
   * Registers a permission. Registration of permissions is required so that
   * they can be assigned to users/groups in the permissions manager.
   *
   * @param {String|[String]} permissions Permissions to register
   *
   * @returns {undefined}
   */
  registerPermissions(permissions) {
  }
};
