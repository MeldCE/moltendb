# Requirements
- Offline capability

# Client Use Cases
- Start interface
- Retrieve menu
- Views / table / item
  - Create
	- Retrieve
	- Update
	- Delete
- Login / register / logout
- Adjust own details

# Initial client flow
- Request page including HTML, Javascript and CSS.
  Retrieve will be skipped on offline version
- Molten function called from HTML and passed options
- Initiate socket
- Initiate storage engine
- Lookup/request data for default view/requested view
- Receive data for menu, view and document data
- Store data
- Go through top level views
- Create and store the view objects
  - store view objects in a separate object using `_id` as the key
	- will be destroyed on view deletion
- If view sees it needs data, requests from controller/model
- If view sees it has sub views, passes view data and DOM element back to
  controller for controller to create view object so that controller can alert
	view to any updates

# General
- Controller/model to store data (actual documents and view data) & to pass
  references to the view objects so they can print the data
- View to store DOM elements for each document and field
- Have option to pass menu builder (part of the theme) to Molten
- Need to be able to create a view single item and use that for an action
- Need to be able to create mouse over actions, for instance a popup showing
  slightly more detail/a larger photo.
- Need to be able to put actions on specific fields, on the whole row or on
  actions / buttons

# Storage Mechanisms
- Be able to set different storage mechanisms for each element down to each 
  for (could it go lower).
- Have ability to have multiple storage mechanisms
  - First could be used for retrieval
- Could have an email and other messaging storage mechanisms

# Offline
- Could send view and then request for data - will add an additional return
  trip to the server - could be set as an option (all data, partial data,
	only required data)
- View will need information on the sorting and limiting to be able to use
  cached data

# Messages
## Server to Client
- data - Will contain new / updated data for the current view
  - Send flag with data to say if it is all documents for that query (so can
	  do processing without requiring access to the server)

## Client to Server
- error - Reporting a Javascript error to the server
- query - Submitting
