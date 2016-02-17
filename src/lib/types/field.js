

// include in here react templates for the field look


field type should be the molten db type, then each type will have a schema
that will detail what is actually going to be stored in the database



{
  schema: {
    multilingual: true,
    id: {
      type: 'string',
      oneOff: true
    },
    system: {
      type: 'boolean',
      system: true
   },
    type: {
      type: 'list',
      values: { '@proc': '/molten/fieldTypes' }
      require: true
    },
    options: {}
  lang: {
    en: {
      label: 'Field',
      description: 'A table field',
      schema: {
        id: {
          label: 'Field ID',
          description: 'String ID that will be used to identify and address '
              + 'the field'
        },
        system: {
          label: 'System Field',
          description: 'Whether or not the field is a system field (and '
              + 'cannot be modified'
        },
        type: {
          label: 'Field Type',
          description: 'The type of field'
        }
      }
    }
  }
}


