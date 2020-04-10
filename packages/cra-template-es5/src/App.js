var path = require('path'),
  express = require('express');

// Create global app object
const app = express();

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '../public/index.html'));
  //__dirname : It will resolve to your project folder.
});

var server = app.listen(process.env.PORT || 4200, function () {
  console.log('Listening on port ' + server.address().port);
});
