var permissions = require('../');


permissions.registerEngine('allowAll', {
  label: 'Allow All Permission Engine',

  description: 'Allows everyone access to everything',

  can: function(permission, user) {
    return true;
  }
});

