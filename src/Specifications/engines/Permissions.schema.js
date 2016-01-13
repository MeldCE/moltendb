
modules.exports = {
  type: {
    label: {
      doc: 'Label for permission engine.',
      type: 'string',
      required: true
    },
    
     description: {
       doc: 'Description of permission engine',
       type: 'string',
       required: true
     }

    can: {
      doc: {
        description: 'Checks and returns whether a user has a specific '
            + 'permission.',
        params: {
          permission: {
            type: 'String',
            description: 'String identifier of the permission to check'
          },
          user: {
            type: 'users.User',
            description: 'The user to check if they have the permission.'
          }
        },
        returns: {
          type: 'Boolean',
          description: 'Wether the given user has the given permission'
        }
      },
      type: 'function',
      required: true
    }
  }
};
