var assert = require('assert');

var settings = require('../../settings.js');

module.exports = {};

var 

/**
 * MoltenDB module for handling permissions.
 */
function Users() {
}

Users.prototype = {
  /**
   * Checks and returns whether a user has a specific permission.
   *
   * @param {String|[String]} permission String identifier of the permission to
   *        check for.
   * @param {users.User} user The user to check if they have the permission.
   * @param {Object} data Additional data required to check permission
   *
   * @returns {Boolean} Whether the given user has the given permission
   */
  can: function(permission, user, data) {
    assert(typeof permission === 'string', 'permission identifier must be a '
        + 'string.');
  },

  /**
   * Registers a permission. Registration of permissions is required so that
   * they can be assigned to users/groups in the permissions manager.
   *
   * @param {Object} permissions Permissions to register
   *
   * @returns {undefined}
   */
  registerPermissions(permissions) {
  }
};
