var page = require('page');
var serverMessage = require('server');

// Check we have web workers
var worker = {
  instance,
  loaded,
  errored: false
};

function workerError(err) {
  if (worker.loaded === undefined) {
    worker.loaded = false;
    if (worker.terminate) {
      worker.terminate();
    }
    delete.worker.instance;
    
    // Initialise stuff necessary to continue without a worker
    moltendb.initialise();
  } else if (worker.loaded === true) {
    // Report error
    if (worker.errored) {
      // Previous error -  need to disable/restart worker
    } else {
      worker.errored = true;
      // Send error message
    }
  }
}

function workerMessage(event) {
  if (worker.loaded === undefined) {
    // Have a good worker, so continue loading
    worker.loaded = true;
    moltendb.initialise(worker);
  }
}

/**
 * Function called by Page.js to navigate somewhere
 *
 * @param {Page.Context} context Page.js route context
 * @param {Function} next 
 *
 * @returns {undefined}
 */
function navigate(context, next) {
  getView(context.path()).then(function handleView(view) {
  }, function handleViewError(err) {
  });
}

/**
 * Initialises the client side of MoltenDB by selecting the correct messaging
 * library (based on if there is a worker)
 *
 * @param {Worker} worker Valid and alive worker to send requests to
 *
 * @returns {undefined}
 */
function initialise(worker) {
  if (worker) {
  } else {
  }

  // Set up Path.js
  page('*', navigate);

  // Set base path
  page.base();

  // Start
  page();
},

if (window.Worker) {
  worker.instance = new Worker('worker.js')
      .addEventListener('error', workerError)
      .addEventListener('message', workerMessage);
} else {
  // Do it all ourself
  workerError();
}
