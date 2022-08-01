//*
//* This is the main body of the application
//* all setup and config is started here
//*

// load Express
const express = require('express');

// setup for Express
const app = express();
const PORT = process.env.PORT || 3000;

// sets 'static' routes for Express here
// 'express.static(root, [options])' is a built-in middleware function in Express
// It serves static files and is based on 'serve-static'
app.use(express.static('../client/dist'));
// set up all Express built-in middleware methods here
// 'express.urlencoded([options])' is a built-in middleware function in Express
// It parses incoming requests with urlencoded payloads and is based on 'body-parser'
app.use(express.urlencoded({ extended: true }));
// 'express.json([options])' is a built-in middleware function in Express
// It parses incoming requests with JSON payloads and is based on 'body-parser'
app.use(express.json());

// more Express route setup here
require('./routes/htmlRoutes')(app);

// start up the application and open the PORT listener
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
