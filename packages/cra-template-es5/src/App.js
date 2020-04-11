var path = require('path'),
  bodyParser = require('body-parser'),
  express = require('express');

// Create global app object
const app = express();

// Serve images, CSS files, HTML and JavaScript files in a directory named public.
app.use('/static', express.static(path.join(__dirname, '../public')));

// parse application/json
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.redirect('/static/index.html');
});

/* @exports */
module.exports = app;
