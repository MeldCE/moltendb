# Views
- Content of view should be stored as text (HTML/fux HTML)
  ```html
    <header>
      <navigation>{navigation}</navigation>
      <h1> MoltenDB</h1>
    </header>
    <main>
      {main}
    </main>
  ```
- Should be able to specify data to use in the view and then reference that
  data in the view
  ```html
    {with somedata as data}
      {foreach data as item}
        <label>{item.label}: {item.value}</label>
      {/foreach}
    {/with}
  ```
- Should be able to reuse views inside of one another
  `view1` view
  ```html
    <main>
     {main}
    </main>
    <footer>
      {footer}
    </footer>
  ```
  `footer` view
  ```html
    <div class="generator">Powered by MoltenDB</div>
  ```
- Should be able to create "template" views that can then be referenced by
  other views.
- The template view should be able to contain default values/html for each of
  its sections
- The referencing (implementing) views, should be able to use the default
  values/html from the template view
- The template used should be able to be bulk changed across views in the UI
- View sections should be able to be specified as an Object.If the view only
  contains one section, it will be assumed that that is the `main` section
  `template` view
  ```javascript
    {
      id: 'template',
      label: 'Main Template',
      view:
        main: `
        <header>
          <navigation>{navigation}</navigation>
          <h1> MoltenDB</h1>
        </header>
        <main>
          {main}
        </main>
        <footer>
          {footer}
        </footer>
      `,
      footer: `
        <div class="generator">Powered by MoltenDB</div>
        <div class="status">{molten/status()}</div>
      `
    }
  ```
  `page1` view
  ```javascript
    {
      id: 'page1',
      uri: 'page',
      label: 'Some Page',
      template: 'template'
      view: {
        main: `
          <p>Some main content</p>
          <p>More main content</p>
        `,
        footer: `
          <p>Footer information</p>
          {../footer}
        `
- Should be able to store in hierarchy, so can limit view to a certain section
  etc
- Should be able to call routines in the views
  ```html
    <div class="status">{molten/status()}</div>
  ```
- Should be able to link a view to a URI, or array of URIs
