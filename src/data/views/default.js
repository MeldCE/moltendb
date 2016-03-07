{
  id: 'default',
  label: 'MoltenDB',
  description: 'Default template view',
  view: `
    <header>
      <navigation>{{navigation}}</navigation>
      <h1>MoltenDB</h1>
    </header>
    <main>
      {{body}}
    </main>
    <footer>
      {{footer}}
    </footer>
  `,
  views: {
    main: `
      <h1>Welcome to MoltenDB</h1>
    `,
    navigation: `
      <ul>
        {{#with moltendb/menu() as menu}}
        {{/with}}
      </ul>
    `,
    footer: `
      <div class="generator">
        Generated with MoltenDB
      </div>
      <div class="status">
        {{moltendb/status()}}
      </div>
    `
  }
}
