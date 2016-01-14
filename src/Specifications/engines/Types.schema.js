
module.exports = {
  type: {
    id: {
      doc: 'String identifier for type',
      types: [
        {
          type: 'string'
        },
        {
          type: 'string',
          multiple: true
        }
      ],
      required: true
    },
    label: {
      doc: 'Label for permission engine.',
      type: 'string',
      required: true
    },
    description: {
      doc: 'Description of permission engine',
      type: 'string',
      required: true
    },
    options: {
      doc: 'Additional options that the type has
      type: ,
    },
    validate: {
      doc: {
        description: 'Function used to validate a value of the type',
        parameters: {
        },
        returns: {
          type: 'Boolean',
          description: 'Whether or not the value is valid'
        }
      }
      type: 'function',
      required: true
    },
    view: {
      doc: {
        description: 'returns the html for the value',
        parameters: {
        },
        returns: {
          type: 'Boolean',
          description: 'Whether or not the value is valid'
        }
      }
      type: 'function',
      required: true
    },
    test: {
      doc: {
        description: 'Run a certain test on a value',
        parameters: {
        },
        returns: {
          type: 'Boolean',
          description: 'Whether or not the value is valid'
        }
      }
      type: 'function',
      required: true
    },
    toString: {
      doc: {
        description: 'Create a string representation of a value',
        parameters: {
        },
        returns: {
          type: 'Boolean',
          description: 'Whether or not the value is valid'
        }
      }
      type: 'function',
      required: true
    }
  }
};

