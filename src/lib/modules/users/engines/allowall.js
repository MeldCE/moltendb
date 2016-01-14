var users = require('../');


users.registerEngine('allowAll', {
  label: 'Allow All (No Users) Permission Engine',

  description: 'Allows everyone access to everything',

  can: function(permission, user) {
    return true;
  },

	loggedIn: function() {
		return false;
	}
});

