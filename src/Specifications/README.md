# Requirements Specification
## Molten DB
Produced By: Meld Computer Engineering

# Introduction
## Project Overview
Molten DB is a web-based databasing system that can be set up with no need
for programming. It is designed to allow anyone to set up a database for
storing information quickly and allow for easy access and manipulation of the
data.

## Purpose and Scope of this Specification


### Syncronisation
- Allow data to be downloaded for offline use
	- For hierarchical data, allow download of only certain parts of the tree
		(eg just the top items or only the items under a certain item)
- Allow the ability to save data offline and add it to the database once it
	becomes online
- The ability to control who can sync what collections (and maybe what fields?)
- Need the ability to reference newly recorded and unsynced records in other
	new records. Will need a temporary id or have a reference to the object that
	can then be used to get the id once it has been commited - would use an array
	to store the new objects until they can be saved to the database.

### Views
Views that need to be included
- "Table" or data format - list, vertical/horizontal table
- Map
- Graph
- HTML
	- Must have the ability to be able to insert sub-views into arbritary
	  locations

### Database
- Ability to ensure a record is commited (in case of Mongo, written to a
	majority)

### Tables
- Must be able to store hierarchical documents
- Must be able to either use a random id, a one-up id, or specify a custom id
- Must be able to have (and view) system tables and field (eg. the user
	preferences field). Could start with a _ and/or have a system boolean key
	(only stored if true or make it so normal tables/fields can't start with a
	_)
- Must be able to set write concern for each table (not concerned, check every
	x, check every)

### Fields
- Text
	- Normal / long (textarea) / HTML
- Boolean
	- Ability to either store as set/not set or true/false/not set
- Number
	- Int or Float
- Datetime
	- Date / time / datetime / date range / time range / datetime range
- Lookup/List
	- Store either in document (eg tags in array) or as object reference (eg
		link to another document
	- Need to be able to update values that are stored in array within the
		document, for example if change the name of a tag, need to be able to
		change all references to that tag
	- Need the option to be able to create new values for the list from the
		insert of the document
- Pools Field
- Location
	- Single or multiple point(s)/line(s)/area(s) on a map
	- Be able to search for a specific place (eg address)
	- Be able to draw on a map

#### Field Options
- Must be able to declare a field to be dependant on another field (via a
	certain test)
- Must be able to specify if a field is required
- Must be able to specify field as a one-shot, i.e. a value for the field can
  only be entered once. A blank value must be considered not a value (and
	therefore a value can be entered at a later date. If the field is required,
	the field cannot be blank and therefore must be filled in on creation.
- Must be able to validate the field value, both on the server side and on the
	client side

### Queries
* Could be considered a special view? - option in view, would need to be able
  to specify an action and/or output for generated data. Might also need a
	place to store the generated data.
* Will need a modification time for each document to tell whether a query needs
  to run again.
- Have jobs and job statues for doing reports, so can do other stuff while
	waiting for a job to complete

### Users and Security
- Store the users preferences within their account so they can be accessed from
	any computer (or just on a single browser) (once have a users collection)
- Ability to track the user globally or on specific views etc

### Other Notes
- Use secondary for creating reports if they need to be generated and stored

