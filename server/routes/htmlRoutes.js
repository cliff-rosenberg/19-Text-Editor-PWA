// set up path here
// The Path module provides a way of working with directories and file paths
// see https://nodejs.org/api/path.html for more information
// used below to set up Express static paths
const path = require('path');

// export the base route, which serves up a static page for 'index.html' homepage
module.exports = (app) =>
  app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  );
